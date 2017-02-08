class DataMigrationAddress < ActiveRecord::Migration
  def up
    Address.all.each do |address|
      address.update(addressable_type: 'DevSite', addressable_id: address.dev_site_id)  if address.dev_site_id.present?
    end
  end
end
