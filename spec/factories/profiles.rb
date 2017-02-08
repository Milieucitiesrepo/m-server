FactoryGirl.define do
  factory :profile do
    name { FFaker::Name.name }
    postal_code { FFaker::AddressCA.postal_code }
    bio { FFaker::DizzleIpsum.sentence }
  end
end
