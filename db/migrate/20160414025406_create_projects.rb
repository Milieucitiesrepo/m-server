class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.integer :funding_goal
      t.integer :funds_raised

      t.timestamps null: false
    end
  end
end
