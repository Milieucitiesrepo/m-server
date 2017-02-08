class AddGeoCodeLatLonToAddress < ActiveRecord::Migration
  def change
    add_column :addresses, :geocode_lat, :float
    add_column :addresses, :geocode_lon, :float
  end
end
