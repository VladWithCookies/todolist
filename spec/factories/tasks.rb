FactoryGirl.define do
  factory :task do
    title FFaker::Lorem.phrase
    project
  end
end