class AddFieldsToDevSite < ActiveRecord::Migration
  def change
    add_column :dev_sites, :appID, :string
    add_column :dev_sites, :received_date, :datetime
    add_column :dev_sites, :updated, :datetime
  end
end
