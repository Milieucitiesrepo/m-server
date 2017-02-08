class MoveFieldsToProfile < ActiveRecord::Migration
  def change
    remove_column :users, :verification_status
    remove_column :users, :community_role
    remove_column :users, :organization
    add_column :profiles, :verification_status, :string, default: 'notVerified'
    add_column :profiles, :community_role, :string
    add_column :profiles, :organization, :string
  end
end
