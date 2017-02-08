class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.float :lat
      t.float :lon
      t.string :street

      t.timestamps null: false
    end
  end
end
