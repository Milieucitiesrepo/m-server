FactoryGirl.define do
  factory :sentiment do
    anger { rand.round(3) }
    joy { rand.round(3) }
    fear { rand.round(3) }
    sadness { rand.round(3) }
    disgust { rand.round(3) }
  end
end
