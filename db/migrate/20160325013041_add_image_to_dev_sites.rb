class AddImageToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :image, :string
  end
end
