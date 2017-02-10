class AddFeaturedFlagToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :featured, :boolean, default: false
  end
end
