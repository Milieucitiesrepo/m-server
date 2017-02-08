require 'spec_helper'
require 'rake'

describe 'sync dev sites rake task' do
  before :all do
    Rake.application.rake_require 'tasks/sync_devsites'
    Rake::Task.define_task(:environment)
  end

  describe 'sync_devsites' do
    before do
      @mock_service = class_double('Services::DevSiteSync').as_stubbed_const
      @http_stub = class_double('Net::HTTP').as_stubbed_const
      @response_stub = instance_double('response')
      allow(@http_stub).to receive(:get_response).and_return(@response_stub)
      allow(@response_stub).to receive(:body).and_return({}.to_json)
    end

    let :run_rake_task do
      Rake::Task['sync_devsites'].reenable
      Rake::Task['sync_devsites'].invoke
    end

    it 'should call sync' do
      mock_service_instance = instance_double('sync service')
      expect(@mock_service).to receive(:new).and_return(mock_service_instance)
      expect(mock_service_instance).to receive(:sync)
      run_rake_task
    end
  end
end
