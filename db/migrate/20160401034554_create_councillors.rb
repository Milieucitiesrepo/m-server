class CreateCouncillors < ActiveRecord::Migration
  def change
    create_table :councillors do |t|
      t.integer :ward_num
      t.string :ward_name
      t.string :office
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :link
      t.string :photo_link
      t.string :phone

      t.timestamps null: false
    end
  end
end
