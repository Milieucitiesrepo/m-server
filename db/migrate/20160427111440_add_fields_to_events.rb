class AddFieldsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :date, :date
    add_column :events, :location, :string
    add_column :events, :images, :json
    add_column :events, :contact_tel, :string
    add_column :events, :contact_email, :string
  end
end
