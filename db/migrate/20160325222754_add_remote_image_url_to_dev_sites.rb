class AddRemoteImageUrlToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :remote_image_url, :string
  end
end
