class AddNotificationsToAllExistingUsers < ActiveRecord::Migration
  def up
    User.all.each do |user|
      user.create_notification if user.notification.nil?
    end
  end

  def down
    User.all.each do |user|
      user.notification.destroy if user.notification.present?
    end
  end
end
