class AddAddressToUser < ActiveRecord::Migration
  def change
    add_column :users, :address, :string
    add_column :users, :neighbourhood, :string
    add_column :users, :organization, :string
  end
end
