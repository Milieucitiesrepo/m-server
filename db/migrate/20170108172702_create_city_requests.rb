class CreateCityRequests < ActiveRecord::Migration
  def change
    create_table :city_requests do |t|
      t.string :city

      t.timestamps null: false
    end
  end
end
