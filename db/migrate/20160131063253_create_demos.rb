class CreateDemos < ActiveRecord::Migration
  def change
    create_table :demos do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
