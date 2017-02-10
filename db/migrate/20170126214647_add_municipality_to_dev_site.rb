class AddMunicipalityToDevSite < ActiveRecord::Migration
  def change
    add_column :dev_sites, :municipality_id, :integer
  end
end
