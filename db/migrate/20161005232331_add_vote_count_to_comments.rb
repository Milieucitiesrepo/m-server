class AddVoteCountToComments < ActiveRecord::Migration
  def change
    add_column :comments, :vote_count, :integer
  end
end
