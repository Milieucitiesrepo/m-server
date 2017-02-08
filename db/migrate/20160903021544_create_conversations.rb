class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.references :user, index: true, foreign_key: true
      t.string :address
      t.string :city
      t.string :postal_code
      t.string :topic
      t.string :body
      t.string :conversation_type
      t.string :image

      t.timestamps null: false
    end
  end
end
