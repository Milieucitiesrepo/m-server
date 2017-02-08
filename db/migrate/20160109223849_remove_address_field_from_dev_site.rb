class RemoveAddressFieldFromDevSite < ActiveRecord::Migration
  def change
    remove_column :dev_sites, :address, :string
  end
end
