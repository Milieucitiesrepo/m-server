class DataMigrationAddAllOttawaAndGuelphWards < ActiveRecord::Migration
  def up
    ottawa_municipality = Municipality.find_or_create_by(name: 'Ottawa')
    guelph_municipality = Municipality.find_or_create_by(name: 'Guelph')

    # Ottawa Wards
    Ward.find_or_create_by(name: 'Orleans', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Innes', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Barrhaven', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Kanata North', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'West Carleton-March', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Stittsville', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Bay', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'College', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Knoxdale-Merivale', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Gloucester-Southgate', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Beacon Hill-Cyrville', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Rideau-Vanier', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Rideau-Rockcliffe', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Somerset', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Kitchissippi', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'River', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Capital', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Alta Vista', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Cumberland', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Osgoode', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Rideau-Goulbourn', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Gloucester-South Nepean', municipality_id: ottawa_municipality.id)
    Ward.find_or_create_by(name: 'Kanata South', municipality_id: ottawa_municipality.id)

    # Guelph Wards
    Ward.find_or_create_by(name: 'Ward 1', municipality_id: guelph_municipality.id)
    Ward.find_or_create_by(name: 'Ward 2', municipality_id: guelph_municipality.id)
    Ward.find_or_create_by(name: 'Ward 3', municipality_id: guelph_municipality.id)
    Ward.find_or_create_by(name: 'Ward 4', municipality_id: guelph_municipality.id)
    Ward.find_or_create_by(name: 'Ward 5', municipality_id: guelph_municipality.id)
    Ward.find_or_create_by(name: 'Ward 6', municipality_id: guelph_municipality.id)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
