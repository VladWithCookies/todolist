require 'rails_helper'
require 'capybara/rspec'

feature 'auth', js: true do
  given(:user) { FactoryGirl.create(:user) }

  scenario "user can sign in by email/password" do
    sign_in user
    expect(page).to have_content("Logout")
  end

  scenario "user can sign up by email/password" do
    sign_up
    expect(page).to have_content("Logout")
  end

  scenario "user can logout" do
    sign_in user
    click_on("Logout")
    expect(page).not_to have_content("Logout")
  end

  scenario "user can sign in by FB" do
    mock_auth
    visit '/#/'
    click_on 'Sign in with FB'
    expect(page).to have_content('Logout')
  end

end