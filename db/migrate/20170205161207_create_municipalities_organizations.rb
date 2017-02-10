class CreateMunicipalitiesOrganizations < ActiveRecord::Migration
  def change
    create_table :municipalities_organizations do |t|
      t.belongs_to :municipality, index: true
      t.belongs_to :organization, index: true
    end
  end
end
