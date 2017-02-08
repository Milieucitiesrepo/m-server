FactoryGirl.define do
  factory :comment do
    sentiment
    user
    association :commentable, factory: :dev_site
    body { FFaker::DizzleIpsum.sentence }
    vote_count 0
  end
end
