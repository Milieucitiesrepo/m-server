class CreateCityFiles < ActiveRecord::Migration
  def change
    create_table :city_files do |t|
      t.string :name
      t.string :link
      t.datetime :orig_created
      t.datetime :orig_update

      t.timestamps null: false
    end
  end
end
