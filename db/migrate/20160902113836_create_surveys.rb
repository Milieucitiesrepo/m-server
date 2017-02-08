class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.references :user, index: true, foreign_key: true
      t.string :lived_in_neighborhood
      t.string :neighborhood_description
      t.string :community_involvement
      t.string :biking_infrastructure
      t.string :urban_intensification
      t.string :heritage
      t.text :interesting_neighborhood_topics

      t.timestamps null: false
    end
  end
end
