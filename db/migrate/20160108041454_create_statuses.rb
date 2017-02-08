class CreateStatuses < ActiveRecord::Migration
  def change
    create_table :statuses do |t|
      t.datetime :status_date
      t.string :status
      t.datetime :created

      t.timestamps null: false
    end
  end
end
