class AddUpdatedDevSiteNearMeToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :updated_dev_site_near_me, :boolean
  end
end
