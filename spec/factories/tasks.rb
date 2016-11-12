FactoryGirl.define do
  factory :task do
    title FFaker::Lorem.phrase
    sequence(:priority)
    project
  end
end