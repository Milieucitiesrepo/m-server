class AddSlugToExistingUsers < ActiveRecord::Migration
  def up
    User.find_each(&:save)
  end
end
