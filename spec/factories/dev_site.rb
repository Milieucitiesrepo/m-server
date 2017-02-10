FactoryGirl.define do
  factory :dev_site do
    devID { FFaker::Identification.drivers_license }
    application_type 'Site Plan Control'
    description { FFaker::DizzleIpsum.sentence }
    municipality_id 1
    ward_id 1
    ward
    municipality
  end
end
