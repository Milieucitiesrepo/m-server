class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.references :user, index: true, foreign_key: true
      t.string :name
      t.string :neighbourhood
      t.string :postal_code
      t.boolean :accepted_terms
      
      t.timestamps null: false
    end
  end
end
