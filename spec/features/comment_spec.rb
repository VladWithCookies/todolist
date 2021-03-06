require 'rails_helper'

feature 'comment', js: true do 
  given(:user) { FactoryGirl.create(:user) }
  given!(:project) { FactoryGirl.create(:project, user: user) }
  given!(:task) { FactoryGirl.create(:task, project: project) }

  before do
    sign_in user
    expect(page).to have_content("ADD TODO")
    visit("/#/tasks/#{task.id}")
  end

  scenario "user can add comments to task" do
    create_comment("some text")
    expect(page).to have_content('some text')
  end

  scenario "user can delete comments" do 
    create_comment("some text")
    find('.delete-comment').click
    expect(page).not_to have_content('some text')
  end
  
end