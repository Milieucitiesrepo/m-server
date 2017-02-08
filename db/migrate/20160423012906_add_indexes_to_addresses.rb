class AddIndexesToAddresses < ActiveRecord::Migration
  def change
    add_index :addresses, [:lat, :lon, :geocode_lat, :geocode_lon]
  end
end
