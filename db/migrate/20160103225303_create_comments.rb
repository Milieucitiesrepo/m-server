class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body
      t.belongs_to :dev_site, index: true, foreign_key: true
      t.string :title

      t.timestamps null: false
    end
  end
end
