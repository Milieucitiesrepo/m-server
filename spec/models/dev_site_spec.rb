require 'spec_helper'

describe DevSite do
  before { @dev_site = build(:dev_site) }

  subject { @dev_site }

  it { should respond_to(:devID) }
  it { should respond_to(:application_type) }
  it { should respond_to(:description) }
  it { should respond_to(:ward_name) }
  it { should respond_to(:ward_num) }

  it { should respond_to(:comments) }
  it { should respond_to(:addresses) }
  it { should respond_to(:statuses) }
  it { should respond_to(:city_files) }

  it { should respond_to(:files) }
  it { should respond_to(:images) }

  it { should be_valid }

  describe '#update_sentiment' do
    let(:sentiment1) { create(:sentiment) }
    let(:sentiment2) { create(:sentiment) }
    let(:comment1) { create(:comment, sentiment: sentiment1) }
    let(:comment2) { create(:comment, sentiment: sentiment2) }
    let(:dev_site_with_comments) { create(:dev_site) }

    before do
      dev_site_with_comments.comments << comment1
      dev_site_with_comments.comments << comment2
    end

    context 'dev site does not have a sentiment associated' do
      it 'should create a sentiment on the dev site' do
        expect(dev_site_with_comments.sentiment).to be_nil

        dev_site_with_comments.update_sentiment

        expect(dev_site_with_comments.sentiment).to_not be_nil
      end
    end

    context 'dev site has a sentiment associated' do
      before :each do
        dev_site_with_comments.update_sentiment
      end

      it 'should update sentiment totals' do
        Sentiment::NAMES.each do |s_name|
          sentiment_total_method = "#{s_name}_total".to_sym
          dev_site_total = dev_site_with_comments.send(sentiment_total_method)
          expected_total = [sentiment1.send(s_name), sentiment2.send(s_name)].sum

          expect(dev_site_total).to eq(expected_total)
        end
      end

      it 'should create a sentiment and update its averages' do
        Sentiment::NAMES.each do |s_name|
          sentiments = [sentiment1, sentiment2]
          sum = sentiments.map { |s| s.send(s_name) }.sum
          count = sentiments.length
          expected_average = sum / count
          average = dev_site_with_comments.sentiment.send(s_name)

          expect(average).to eq(expected_average)
        end
      end
    end
  end

  describe '#search' do
    before :each do
      @ward = create(:ward, name: 'Orleans')
      @guelph = create(:municipality, name: 'Guelph')
      @ottawa = create(:municipality, name: 'Ottawa')
      @dev_site1 = create(:dev_site)
      @dev_site2 = create(:dev_site, updated: DateTime.new(2012, 12, 1).utc)
      @dev_site3 = create(:dev_site, ward: @ward)
      @dev_site4 = create(:dev_site, municipality: @guelph)
      @dev_site5 = create(:dev_site, municipality: @ottawa, updated: DateTime.new(2013, 12, 1).utc)
      @dev_site6 = create(:dev_site)

      @dev_site1.addresses << create(:address)
      @dev_site4.statuses << create(:status)
      @dev_site4.statuses << create(:status,
                                    start_date: DateTime.current - 1.day,
                                    status: 'Comment Period in Progress')
      @dev_site6.addresses << create(:address)
      @dev_site6.statuses << create(:status, status: 'Comment Period in Progress')
    end

    context 'no params passed' do
      it 'should retrieve all DevSites' do
        search_params = {}

        result = DevSite.search(search_params)

        expect(result.count).to eq(6)
        expect(result).to include(@dev_site1)
        expect(result).to include(@dev_site2)
        expect(result).to include(@dev_site3)
        expect(result).to include(@dev_site4)
        expect(result).to include(@dev_site5)
        expect(result).to include(@dev_site6)
      end
    end

    context 'location search params passed' do
      it 'should retrieve DevSites within 5km of origin' do
        search_params = { latitude: 45.430863, longitude: -75.712344 }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site1, @dev_site6])
      end

      it 'should not return DevSites over 5km from origin' do
        search_params = { latitude: 42.430863, longitude: -75.712344 }

        result = DevSite.search(search_params)

        expect(result).to eq([])
      end
    end

    context 'year provided as search query' do
      it 'should retrieve only DevSites matching the year given' do
        search_params = { year: '2012' }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site2])
      end
    end

    context 'ward provided as search query' do
      it 'should retrieve only DevSites matching the ward given' do
        search_params = { ward: 'Orleans' }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site3])
      end
    end

    context 'municipality provided as search query' do
      it 'should retrieve only DevSites matching the municipality given' do
        search_params = { municipality: 'Guelph' }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site4])
      end
    end

    context 'status provided as search query' do
      it 'should retrieve only DevSites with active status matching the status given' do
        search_params = { status: 'Application File Pending' }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site4])
      end
    end

    context 'multiple search params provided' do
      it 'should retrieve only the DevSites that match the query params' do
        search_params = { municipality: 'Ottawa', year: '2013' }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site5])
      end
    end

    context 'location and search params provided' do
      it 'should retrieve only the DevSites that match the location and query params' do
        search_params = {
          latitude: 45.430863,
          longitude: -75.712344,
          status: 'Comment Period in Progress'
        }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site6])
      end
    end
  end

  describe '#status_date' do
    let(:dev_site) { create(:dev_site) }
    let(:test_status_with_date) { create(:status) }

    it 'should return nil if dev site has no status' do
      expect(dev_site.status_date).to be_nil
    end

    it 'should return the status date of the current status' do
      dev_site.statuses << test_status_with_date
      expected_date = test_status_with_date.status_date.strftime('%B %e, %Y')
      expect(dev_site.status_date).to eq(expected_date)
    end
  end

  describe 'address methods' do
    let(:dev_site) { create(:dev_site) }
    let(:address1) { create(:address) }
    let(:address2) { create(:address) }

    context 'dev site has no addresses' do
      it 'should return nil' do
        methods_to_test = [:address, :latitude, :longitude]
        methods_to_test.each do |method_name|
          expect(dev_site.send(method_name)).to be_nil
        end
      end
    end

    context 'dev site has addresses' do
      before :each do
        dev_site.addresses << address1
        dev_site.addresses << address2
      end

      it '#address returns street, city, and province_state of the first address' do
        expected_address = "#{address1.street}, #{address1.city}, #{address1.province_state}"
        expect(dev_site.address).to eq(expected_address)
      end

      it '#latitude should return the latitude of the first address' do
        expect(dev_site.latitude).to eq(address1.lat)
      end

      it '#latitude should return the longitude of the first address' do
        expect(dev_site.longitude).to eq(address1.lon)
      end
    end
  end

  describe '#find_ordered' do
    it 'should return an empty ActiveRecord::Relation if ids is empty' do
      result = DevSite.find_ordered []

      expect(result).to be_a(ActiveRecord::Relation)
      expect(result.empty?).to be true
    end

    it 'should return dev sites in order of ids in array' do
      dev_site1 = create(:dev_site)
      dev_site2 = create(:dev_site)
      dev_site3 = create(:dev_site)
      ids = [dev_site2.id, dev_site3.id, dev_site1.id]

      result = DevSite.find_ordered ids

      expect(result[0]).to eq(dev_site2)
      expect(result[1]).to eq(dev_site3)
      expect(result[2]).to eq(dev_site1)
    end
  end

  describe '#status' do
    context 'dev site has no statuses' do
      it 'should return nil' do
        dev_site = create(:dev_site)

        current = dev_site.status

        expect(current).to be_nil
      end
    end
    context 'all statuses are in the past' do
      it 'should return nil' do
        dev_site = create(:dev_site)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 3.days,
                                    end_date: DateTime.current - 2.days,
                                    status: Status::APPLICATION_COMPLETE_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 4.days,
                                    end_date: DateTime.current - 3.days,
                                    status: Status::APPLICATION_RECEIVED_STATUS)

        current = dev_site.status

        expect(current).to be_nil
      end
    end

    context 'all statuses are in the future' do
      it 'should return nil' do
        dev_site = create(:dev_site)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current + 3.days,
                                    end_date: DateTime.current + 2.days,
                                    status: Status::APPLICATION_RECEIVED_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current + 4.days,
                                    end_date: DateTime.current + 3.days,
                                    status: Status::APPLICATION_COMPLETE_STATUS)

        current = dev_site.status

        expect(current).to be_nil
      end
    end

    context 'has current and non-current statuses' do
      it 'should return the status active on current date' do
        dev_site = create(:dev_site)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 3.days,
                                    end_date: DateTime.current - 2.days,
                                    status: Status::APPLICATION_RECEIVED_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current + 4.days,
                                    end_date: DateTime.current + 3.days,
                                    status: Status::APPLICATION_COMPLETE_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 2.days,
                                    end_date: DateTime.current + 3.days,
                                    status: Status::PLANNING_REVIEW_STATUS)

        current = dev_site.status

        expect(current.status).to eq(Status::PLANNING_REVIEW_STATUS)
      end
    end

    context 'has several statuses with no end dates' do
      it 'should return the status with the start date closest to but before today' do
        dev_site = create(:dev_site)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 3.days,
                                    status: Status::APPLICATION_RECEIVED_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current + 4.days,
                                    status: Status::APPLICATION_COMPLETE_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 2.days,
                                    status: Status::PLANNING_REVIEW_STATUS)

        current = dev_site.status

        expect(current.status).to eq(Status::PLANNING_REVIEW_STATUS)
      end
    end

    context 'has more than one current status' do
      it 'should return the current status with the latest start date' do
        dev_site = create(:dev_site)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 3.days,
                                    end_date: DateTime.current + 2.days,
                                    status: Status::APPLICATION_RECEIVED_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 4.days,
                                    end_date: DateTime.current + 3.days,
                                    status: Status::APPLICATION_COMPLETE_STATUS)

        current = dev_site.status

        expect(current.status).to eq(Status::APPLICATION_RECEIVED_STATUS)
      end
    end

    context 'has past and future statuses but no current status' do
      it 'should return nil' do
        dev_site = create(:dev_site)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current - 3.days,
                                    end_date: DateTime.current - 2.days,
                                    status: Status::APPLICATION_RECEIVED_STATUS)
        dev_site.statuses << create(:status,
                                    start_date: DateTime.current + 2.days,
                                    end_date: DateTime.current + 3.days,
                                    status: Status::APPLICATION_COMPLETE_STATUS)

        current = dev_site.status

        expect(current).to be_nil
      end
    end
  end
end
