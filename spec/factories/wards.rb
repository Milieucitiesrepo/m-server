# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :ward do
    name { FFaker::Name.name }
    municipality
  end
end
