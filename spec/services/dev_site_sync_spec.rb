require 'spec_helper'
require "#{Rails.root}/app/services/dev_site_sync.rb"

module Services
  class DevSiteSync

    describe '#DevSiteSync' do
      context 'API returns valid results' do
        before(:each) do
          @mock_response = [
            {
              'devid': 'dev_id_1'
            },
            {
              'devid': 'dev_id_2'
            },
            {
              'devid': 'dev_id_3'
            }
          ]
          @mock_dev_site = {}

          @http_stub = class_double('Net::HTTP').as_stubbed_const
          @response_stub = instance_double('response')

          allow(@http_stub).to receive(:get_response).and_return(@response_stub)
        end

        it '#initialize should retrieve all site ids from ottwatch' do
          url = URI('http://ottwatch.ca/api/devapps/all')
          expect(@http_stub).to receive(:get_response).with(url)

          allow(@response_stub).to receive(:body).and_return(@mock_response.to_json)

          result = Services::DevSiteSync.new

          expect(result.dev_site_ids.count).to eq(@mock_response.count)
        end

        it 'should search for the DevSites by DevID' do
          allow(@response_stub).to receive(:body).and_return(@mock_response.to_json, @mock_dev_site.to_json)

          dev_site_double = class_double('DevSite').as_stubbed_const

          @mock_response.each do |dev_site|
            expect(dev_site_double).to receive(:find_by).with(devID: dev_site[:devid])
          end

          result = Services::DevSiteSync.new
          result.sync
        end

        it 'should create new DevSite if none exists' do
          existing_dev_site_response = [{ 'devid': 'dev_id_1' }]
          dev_site = {
            'address': [{ 'lat': 1, 'lon': 2, 'addr': 'hey' }],
            'updated': 'yup'
          }
          mock_site = FactoryGirl.build(:dev_site, devID: 'dev_id_1')
          dev_site_double = class_double('DevSite').as_stubbed_const

          allow(@response_stub).to receive(:body).and_return(existing_dev_site_response.to_json, dev_site.to_json)

          expect(dev_site_double).to receive(:find_by).with(devID: 'dev_id_1').and_return(nil)
          expect(dev_site_double).to receive(:new).and_return(FactoryGirl.create(:dev_site))

          result = Services::DevSiteSync.new
          result.sync
        end

        it 'should update existing DevSite if found' do
          existing_dev_site_response = [{ 'devid': 'dev_id_1' }]
          dev_site = {
            'address': [{ 'lat': 1, 'lon': 2, 'addr': 'hey' }],
            'updated': 'yup'
          }
          mock_site = FactoryGirl.build(:dev_site, devID: 'dev_id_1')
          dev_site_double = class_double('DevSite').as_stubbed_const

          allow(@response_stub).to receive(:body).and_return(existing_dev_site_response.to_json, dev_site.to_json)

          expect(dev_site_double).to receive(:find_by).with(devID: 'dev_id_1').and_return(mock_site)
          expect(mock_site).to receive(:update)

          result = Services::DevSiteSync.new
          result.sync
        end
      end

      context 'error in API call' do
        before do
          @http_stub = class_double('Net::HTTP').as_stubbed_const
          allow(@http_stub).to receive(:get_response).and_raise('error')
        end

        it '#initialize should rescue error and raise custom exception' do
          expect {Services::DevSiteSync.new}.to raise_error(DevSiteSyncError)
        end
      end
    end
  end
end
