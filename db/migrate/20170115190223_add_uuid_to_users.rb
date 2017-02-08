class AddUuidToUsers < ActiveRecord::Migration
  def change
    add_column :users, :uuid, :uuid, default: 'uuid_generate_v4()'
  end
end
