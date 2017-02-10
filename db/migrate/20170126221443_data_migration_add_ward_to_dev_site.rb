class DataMigrationAddWardToDevSite < ActiveRecord::Migration
  def up
    Ward.all.each do |ward|
      DevSite.where("lower(ward_name) like lower('%#{ward.name}%')").each do |dev_site|
        dev_site.update(ward_id: ward.id)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
