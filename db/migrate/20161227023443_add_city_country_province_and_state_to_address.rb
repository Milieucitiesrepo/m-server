class AddCityCountryProvinceAndStateToAddress < ActiveRecord::Migration
  def change
    add_column :addresses, :city, :string
    add_column :addresses, :province_state, :string
    add_column :addresses, :country, :string
  end
end
