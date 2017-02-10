# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :municipality do
    name { FFaker::Name.name }
  end
end
