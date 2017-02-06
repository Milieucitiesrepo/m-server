FactoryGirl.define do
  factory :city_file do
    link { FFaker::Internet.http_url }
    name { FFaker::Internet.domain_name }
  end
end
