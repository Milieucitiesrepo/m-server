FactoryGirl.define do
  factory :address do
    lat 45.418032
    lon(-75.694835)
    street { FFaker::AddressCA.street_address }
    city { FFaker::AddressCA.city.rstrip }
    province_state { FFaker::AddressCA.province }
    country 'Canada'
    association :addressable, factory: :dev_site
  end
end
