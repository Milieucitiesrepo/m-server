class RemoveUnusedAttributes < ActiveRecord::Migration
  def change
    remove_column :addresses, :geocode_lat, :float
    remove_column :addresses, :geocode_lon, :float
    remove_column :events, :geocode_lat, :float
    remove_column :events, :geocode_lon, :float
    remove_column :addresses, :dev_site_id, :integer
    remove_column :comments, :dev_site_id, :integer
    remove_column :comments, :event_id, :integer
    remove_column :profiles, :street, :string
    remove_column :profiles, :city, :string
    remove_column :profiles, :age_range, :string
    remove_column :profiles, :field_of_occupation, :string
    remove_column :profiles, :receive_newletter, :boolean
    remove_column :users, :first_name, :string
    remove_column :users, :last_name, :string
    remove_column :users, :bio, :string
    remove_column :users, :api_key, :string
    remove_column :users, :address, :string
    remove_column :users, :neighbourhood, :string
    remove_column :users, :organization, :string
    remove_column :users, :remember_digest, :string
    drop_table :surveys
  end
end
