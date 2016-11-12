FactoryGirl.define do
  factory :comment do
    text FFaker::Lorem.phrase
    task
  end
end