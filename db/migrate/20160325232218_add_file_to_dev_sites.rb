class AddFileToDevSites < ActiveRecord::Migration
  def change
    add_column :dev_sites, :file, :string
  end
end
