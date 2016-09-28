require 'rails_helper'

feature 'task', js: true do 
  given(:user) { FactoryGirl.create(:user) }
  given!(:project) { FactoryGirl.create(:project, user: user) }
  given!(:task) { FactoryGirl.create(:task, project: project) }

  before { sign_in user }

  scenario "user can update task" do
    find('.task-update').click
    fill_in 'task[title]', with: "updated"
    click_button("Submit")
    expect(page).to have_content("updated")
  end

  scenario "user can delete task" do
    find('.task-delete').click
    expect(page).not_to have_content(task.title)
  end
end