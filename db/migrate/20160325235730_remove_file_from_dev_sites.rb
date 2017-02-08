class RemoveFileFromDevSites < ActiveRecord::Migration
  def change
    remove_column :dev_sites, :file, :string
    add_column :dev_sites, :files, :json
    remove_column :dev_sites, :image, :string
    add_column :dev_sites, :images, :json
    remove_column :dev_sites, :remote_image_url, :string
  end
end
