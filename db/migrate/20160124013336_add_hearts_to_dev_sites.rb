class AddHeartsToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :hearts, :integer
  end
end
