class AddPolymorphismToAddress < ActiveRecord::Migration
  def change
    add_column :addresses, :addressable_type, :string
    add_column :addresses, :addressable_id, :integer
  end
end
