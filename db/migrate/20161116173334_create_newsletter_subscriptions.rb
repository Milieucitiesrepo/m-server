class CreateNewsletterSubscriptions < ActiveRecord::Migration
  def change
    create_table :newsletter_subscriptions do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
