class AddCommentableTypeAndIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :commentable_type, :string
    add_column :comments, :commentable_id, :integer
  end
end
