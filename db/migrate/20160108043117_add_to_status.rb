class AddToStatus < ActiveRecord::Migration
  def change
    add_column :statuses, :dev_site_id, :integer
  end
end
