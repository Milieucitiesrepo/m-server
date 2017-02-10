class AddWardToDevSite < ActiveRecord::Migration
  def change
    add_column :dev_sites, :ward_id, :integer
  end
end
