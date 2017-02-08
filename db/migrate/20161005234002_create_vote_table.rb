class CreateVoteTable < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :comment, index: true, foreign_key: true
      t.boolean :up
    end
  end
end
