FactoryGirl.define do
  factory :user do
    profile
    email { FFaker::Internet.email }
    password '12345678'
    password_confirmation '12345678'

    factory :admin_user do
      after(:build) do |user|
        user.add_role :admin
      end
    end

    factory :organization_admin_user do
      after(:build) do |user|
        user.add_role :organization_admin
      end
    end
  end
end
