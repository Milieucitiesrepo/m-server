require "#{Rails.root}/app/services/url_verifier.rb"

desc 'Check all DevSites for dead CityFile links'
task prune_all_city_file_links: :environment do |task, args|
  dev_sites_to_prune = DevSite.includes(:city_files)

  puts "Pruning dead links for #{dev_sites_to_prune.count} DevSites"
  dev_sites_to_prune.each(&:prune_dead_links)
end

desc 'Check DevSites not updated in past week for dead CityFile links'
task prune_recent_city_file_links: :environment do |task, args|
  dev_sites_to_prune = DevSite.includes(:city_files)
                              .where('updated_at < ?', DateTime.now - 1.week)

  puts "Pruning dead links for #{dev_sites_to_prune.count} DevSites"
  dev_sites_to_prune.each(&:prune_dead_links)
end