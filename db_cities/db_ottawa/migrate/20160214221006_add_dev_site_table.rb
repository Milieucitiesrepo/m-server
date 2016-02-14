class AddDevSiteTable < ActiveRecord::Migration
  def change
    create_table :dev_sites do |t|
      t.string :devID
      t.string :application_type
      t.string :title
      t.text :description
      t.string :ward_name
      t.integer :ward_num

      t.timestamps null: false
    end
  end
end
