class CreateSentiments < ActiveRecord::Migration
  def change
    create_table :sentiments do |t|
      t.float :anger, default: 0.0
      t.float :joy, default: 0.0
      t.float :disgust, default: 0.0
      t.float :fear, default: 0.0
      t.float :sadness, default: 0.0
      t.references :sentimentable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
