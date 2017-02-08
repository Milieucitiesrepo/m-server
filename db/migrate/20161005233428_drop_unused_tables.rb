class DropUnusedTables < ActiveRecord::Migration
  def change
    drop_table :votes
    drop_table :rating_caches
    drop_table :rates
    drop_table :projects
    drop_table :overall_averages
    drop_table :demos
    drop_table :councillors
    drop_table :average_caches
  end
end
