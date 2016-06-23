class AddOmniAuthToUsers < ActiveRecord::Migration
  def change
    add_column :users, :uid, :string
    add_index :users, :uid
    add_column :users, :provider, :string
  end
end
