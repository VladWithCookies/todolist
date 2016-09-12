FactoryGirl.define do
  factory :project do
    title FFaker::Lorem.phrase
    user
  end
end