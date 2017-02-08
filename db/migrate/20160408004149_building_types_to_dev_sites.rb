class BuildingTypesToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :build_type, :string
  end
end
