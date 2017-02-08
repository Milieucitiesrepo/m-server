class AddSentimentTotalsToDevSite < ActiveRecord::Migration
  def change
    add_column :dev_sites, :anger_total, :float, default: 0.0
    add_column :dev_sites, :joy_total, :float, default: 0.0
    add_column :dev_sites, :disgust_total, :float, default: 0.0
    add_column :dev_sites, :fear_total, :float, default: 0.0
    add_column :dev_sites, :sadness_total, :float, default: 0.0
  end
end
