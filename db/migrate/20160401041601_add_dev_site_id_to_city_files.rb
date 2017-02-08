class AddDevSiteIdToCityFiles < ActiveRecord::Migration
  def change
    add_column :city_files, :dev_site_id, :integer
  end
end
