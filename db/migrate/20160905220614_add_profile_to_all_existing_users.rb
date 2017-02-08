class AddProfileToAllExistingUsers < ActiveRecord::Migration
  def up
    User.all.each do |user|
      user.create_profile if user.profile.nil?
    end
  end

  def down
    User.all.each do |user|
      user.profile.destroy if user.profile.present?
    end
  end
end
