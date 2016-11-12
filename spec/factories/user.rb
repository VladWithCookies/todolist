FactoryGirl.define do
  factory :user do
    password               "password"
    password_confirmation  "password"
    sequence(:email) { |n| "email#{n}@example.com"}
  end
end