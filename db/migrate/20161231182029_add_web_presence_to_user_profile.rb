class AddWebPresenceToUserProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :web_presence, :string
  end
end
