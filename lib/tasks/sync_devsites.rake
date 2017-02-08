require "#{Rails.root}/app/services/dev_site_sync.rb"

desc 'Sync dev sites from ottwatch.ca'
task sync_devsites: :environment do
  sync_service = Services::DevSiteSync.new
  sync_service.sync
end
