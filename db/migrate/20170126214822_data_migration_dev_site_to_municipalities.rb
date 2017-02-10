class DataMigrationDevSiteToMunicipalities < ActiveRecord::Migration
  def up
    ottawa_municipality = Municipality.find_or_create_by(name: 'Ottawa')
    guelph_municipality = Municipality.find_or_create_by(name: 'Guelph')

    DevSite.includes(:addresses).each do |dev_site|
      if dev_site.addresses.present?
        if dev_site.addresses.first.city.eql? 'Guelph'
          dev_site.update(municipality_id: guelph_municipality.id)
        else
          dev_site.update(municipality_id: ottawa_municipality.id)
        end
      else
        dev_site.update(municipality_id: ottawa_municipality.id)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
