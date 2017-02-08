class AddToAddress < ActiveRecord::Migration
  def change
    add_column :addresses, :dev_site_id, :integer
  end
end
