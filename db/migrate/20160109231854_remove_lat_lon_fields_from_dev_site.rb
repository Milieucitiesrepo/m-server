class RemoveLatLonFieldsFromDevSite < ActiveRecord::Migration
  def change
    remove_column :dev_sites, :lat, :float
    remove_column :dev_sites, :long, :float
  end
end
