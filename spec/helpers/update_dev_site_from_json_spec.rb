require 'spec_helper'

describe UpdateDevSiteFromJson, type: :class do
  before do
    create(:ward, name: 'Ward 1')
    create(:municipality, name: 'Guelph')
  end

  context 'with one valid dev site' do
    it 'should return results object with dev site in success array' do
      context = UpdateDevSiteFromJson.call([valid_dev_site_json])

      expect(context).to be_success
      expect(context.result[:success].count).to eq(1)
    end
  end

  context 'with one valid and one invalid dev site' do
    it 'should return result with valid site in success array and invalid site in failed array' do
      invalid_dev_site_json = valid_dev_site_json.dup
      invalid_dev_site_json[:dev_site_id] = 'test-id-2'
      invalid_dev_site_json[:municipality] = 'Not a real city'

      context = UpdateDevSiteFromJson.call([valid_dev_site_json, invalid_dev_site_json])

      expect(context).to be_success
      expect(context.result[:success][0][:dev_site_id]).to eq(valid_dev_site_json[:dev_site_id])
      expect(context.result[:failed][0][:dev_site_id]).to eq(invalid_dev_site_json[:dev_site_id])
    end
  end

  context 'with missing required fields' do
    it 'should return results object with dev site in error array' do
      UpdateDevSiteFromJson::REQUIRED_FIELDS.each do |field|

        context = UpdateDevSiteFromJson.call([valid_dev_site_json.except(field)])

        expect(context).to be_success
        expect(context.result[:failed].count).to eq(1)
        expect(context.result[:failed][0][:message]).to eq("#{field} is a required field")
      end
    end
  end

  # rubocop:disable Metrics/MethodLength
  def valid_dev_site_json
    {
      dev_site_id: 'test-id',
      ward: 'Ward 1',
      municipality: 'Guelph',
      build_type: 'Derelict',
      title: 'this is a test',
      description: 'blah blah blah',
      ward_councillor_email: 'wardcouncillor@mailinator.com',
      urban_planner_email: 'urbanplanner@mailinator.com',
      urban_planner_name: 'Jane Planner',
      applicant: 'Awesome Applicant',
      on_behalf_of: 'Buildings & Co',
      received_date: 'June 1, 2017',
      active_at: 'June 8, 2017',
      url_full_notice: 'www.example.com',
      application_types_attributes: [
        { name: 'Site Plan Approval' },
        { name: 'Plan of Subdivision' }
      ],
      meetings_attributes: [
        {
          meeting_type: 'public',
          time: 'Tue, 27 Jun 20171915:54 +0000',
          location: '123 Fake St.'
        },
        {
          meeting_type: 'council',
          time: 'Tue, 27 Jun 20171915:54 +0000',
          location: '123 Fake St.'
        }
      ],
      statuses_attributes: [
        {
          status: 'Application File Pending',
          start_date: 'June 7, 2017'
        }
      ],
      addresses_attributes: [
        {
          street: '987 Fake St',
          city: 'Guelph',
          province_state: 'Ontario',
          country: 'Canada'
        }
      ]
    }
  end
end
