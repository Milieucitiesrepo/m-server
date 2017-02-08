class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :user, index: true, foreign_key: true
      t.boolean :newletter, default: true

      t.timestamps null: false
    end
  end
end
