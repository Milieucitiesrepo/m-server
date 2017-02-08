class ChangeTimeToStringEvent < ActiveRecord::Migration
  def change
    remove_column :events, :time, :datetime
    add_column :events, :time, :string
  end
end
