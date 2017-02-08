FactoryGirl.define do
  factory :address do
    lat 45.418032
    lon(-75.694835)
    street { FFaker::AddressCA.street_address }
    city { FFaker::AddressCA.city }
    province_state { FFaker::AddressCA.province }
    country 'Canada'
  end
end
