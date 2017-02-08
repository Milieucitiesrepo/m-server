class AddAnonymousCommentsToProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :anonymous_comments, :boolean, default: false
  end
end
