module Services
  class DevSiteSync
    class DevSiteSyncError < StandardError; end

    attr_reader :dev_site_ids

    ROOT_URL = 'http://ottwatch.ca/api/devapps/'
    WARDS = {
      '1' => 'Orleans',
      '2' => 'Innes',
      '3' => 'Barrhaven',
      '4' => 'Kanata North',
      '5' => 'West Carleton-March',
      '6' => 'Stittsville',
      '7' => 'Bay',
      '8' => 'College',
      '9' => 'Knoxdale-Merivale',
      '10' => 'Gloucester-Southgate',
      '11' => 'Beacon Hill-Cyrville',
      '12' => 'Rideau-Vanier',
      '13' => 'Rideau-Rockcliffe',
      '14' => 'Somerset',
      '15' => 'Kitchissippi',
      '16' => 'River',
      '17' => 'Capital',
      '18' => 'Alta Vista',
      '19' => 'Cumberland',
      '20' => 'Osgoode',
      '21' => 'Rideau-Goulbourn',
      '22' => 'Gloucester-South Nepean',
      '23' => 'Kanata South'
    }

    def initialize
      @counter = 0
      @dev_site_ids = get_dev_site_ids
    end

    def sync
      @dev_site_ids.each do |dev_site_id|
        dev_site = DevSite.find_by(devID: dev_site_id)
        dev_site.present? ? update_dev_site(dev_site) : create_dev_site(dev_site_id)
      end
      puts '=========================================='
      puts "Found and processed #{@counter} dev sites."
      puts '=========================================='
    end

    private

    def get_dev_site_ids
      path = 'all'
      begin
        dev_sites = retrieve_and_parse_data(path)
        dev_sites.collect { |dev_site| dev_site['devid'] }
      rescue Exception => e
        raise DevSiteSyncError, "Unable to retrieve dev sites from ottwatch: #{e.inspect}"
      end
    end

    def create_dev_site(dev_app_id)
      path = "#{dev_app_id}"
      begin
        dev_site = retrieve_and_parse_data(path)
      rescue Exception
        false
      end

      return false if dev_site.blank? || missing_address?(dev_site)

      dev_site_attributes = parse_attributes(dev_site)

      new_dev_site = DevSite.new(dev_site_attributes)

      update_associations(dev_site, new_dev_site)

      begin
        if new_dev_site.save
          puts "Saved application - #{dev_site['devid']}"
          @counter += 1
        else
          puts "Did not save - #{dev_site['devid']}"
          puts "Did not save - #{new_dev_site.errors.messages}"
        end
      rescue Exception => msg
        puts "Error retrieving new dev site: #{msg.inspect}"
      end
    end

    def update_dev_site(current_dev_site)
      path = "#{current_dev_site.devID}"
      begin
        dev_site = retrieve_and_parse_data(path)
      rescue Exception => msg
        puts "Error retrieving updated dev site: #{msg.inspect}"
      end

      return false if dev_site.blank? || missing_address?(dev_site)

      if current_dev_site.updated == dev_site['updated']
        puts "Latest application - #{dev_site['devid']}"
        @counter += 1
        return
      end

      dev_site_attributes = parse_attributes(dev_site)
      current_dev_site.update(dev_site_attributes)

      destroy_associations(current_dev_site)

      update_associations(dev_site, current_dev_site)

      begin
        if current_dev_site.save
          puts "Updated application - #{dev_site['devid']}"
          @counter += 1
        else
          puts "Did not save - #{dev_site['devid']}"
          puts "Did not save - #{new_dev_site.errors.messages}"
        end
      rescue Exception => msg
        puts msg.inspect
      end
    end

    def retrieve_and_parse_data(path)
      full_url = "#{ROOT_URL}#{path}"
      json_response = Net::HTTP.get_response URI(full_url)
      JSON.parse(json_response.body)
    end

    def missing_address?(dev_site)
      dev_site['address'].blank? ||
      dev_site['address'][0]['lat'].blank? ||
      dev_site['address'][0]['lon'].blank?
    end

    def parse_attributes(dev_site)
      {
        description: dev_site['description'],
        appID: dev_site['appid'],
        devID: dev_site['devid'],
        received_date: dev_site['receiveddate'],
        updated: dev_site['updated'],
        application_type: dev_site['apptype']
      }
    end

    def parse_address(address)
      {
        lat: address['lat'],
        lon: address['lon'],
        street: address['addr'],
        city: 'Ottawa',
        province_state: 'Ontario',
        country: 'Canada'
      }
    end

    def parse_status(status)
      {
        status_date: status['statusdate'],
        status: status['status'],
        created: status['created']
      }
    end

    def parse_file(file)
      {
        name: file['title'],
        link: file['href'],
        orig_created: file['created'],
        orig_update: file['updated']
      }
    end

    def update_associations(dev_site, app_site)
      dev_site['address'].each do |address|
        address_attrs = parse_address(address)
        app_site.addresses.build(address_attrs)
      end if dev_site['address'].present?

      dev_site['statuses'].each do |status|
        status_attrs = parse_status(status)
        app_site.statuses.build(status_attrs)
      end if dev_site['statuses'].present?

      dev_site['files'].each do |file|
        file_attrs = parse_file(file)
        app_site.city_files.build(file_attrs)
      end if dev_site['files'].present?

      ottawa_municipality_id = Municipality.find_by(name: 'Ottawa').try(:id)
      app_site.municipality_id = ottawa_municipality_id
      app_site.ward_id = Ward.find_by(name: WARDS[dev_site['ward']], municipality_id: ottawa_municipality_id).try(:id)
    end

    def destroy_associations(current_dev_site)
      current_dev_site.addresses.destroy_all
      current_dev_site.statuses.destroy_all
      current_dev_site.city_files.destroy_all
    end
  end
end
