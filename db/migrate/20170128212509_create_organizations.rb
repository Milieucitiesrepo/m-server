class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name

      t.timestamps null: false
    end

    create_table :memberships do |t|
      t.integer :user_id
      t.integer :organization_id
      t.boolean :admin
    end
  end
end
