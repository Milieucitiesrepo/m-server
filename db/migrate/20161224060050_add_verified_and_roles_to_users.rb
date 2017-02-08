class AddVerifiedAndRolesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :verification_status, :string, default: 'notVerified'
    add_column :users, :community_role, :string
  end
end
