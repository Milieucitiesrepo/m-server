class AddImageUrlToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :image_url, :string
  end
end
