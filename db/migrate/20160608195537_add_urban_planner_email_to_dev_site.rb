class AddUrbanPlannerEmailToDevSite < ActiveRecord::Migration
  def change
    add_column :dev_sites, :urban_planner_email, :string
    add_column :dev_sites, :ward_councillor_email, :string
  end
end
