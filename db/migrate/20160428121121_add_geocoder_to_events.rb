class AddGeocoderToEvents < ActiveRecord::Migration
  def change
    add_column :events, :geocode_lat, :float
    add_column :events, :geocode_lon, :float
  end
end
