FactoryGirl.define do
  factory :status do
    status_date { DateTime.current }
    status 'Application File Pending'
    created { DateTime.current }
  end
end
