class ModifyOldAddress < ActiveRecord::Migration
  def up
    Address.all.each do |address|
      if address.street.include?(', Ottawa, Ontario, Canada')
        street = address.street.split(', Ottawa, Ontario, Canada').first
        address.update(street: street, city: 'Ottawa', province_state: 'Ontario', country: 'Canada')
      end
    end
  end
end
