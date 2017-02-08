class AddFieldsToProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :street, :string
    add_column :profiles, :avatar, :string
    add_column :profiles, :city, :string
    add_column :profiles, :age_range, :string
    add_column :profiles, :field_of_occupation, :string
    add_column :profiles, :receive_newletter, :boolean
  end
end
