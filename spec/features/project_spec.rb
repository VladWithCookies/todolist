require 'rails_helper'

feature 'project', js: true do
  given(:user) { FactoryGirl.create(:user) }
  given!(:project) { FactoryGirl.create(:project, user: user) }

  before { sign_in user }

  scenario "user can create projects" do 
    create_project("New Project")  
    expect(page).to have_content("New Project")
  end

  scenario "user can update projects" do
    find('.glyphicon-pencil').click
    fill_in 'project[title]', with: "updated"
    click_button('Submit')
    expect(page).to have_content("updated")
  end

  scenario "user can delete projects" do
    find(".glyphicon-trash").click
    expect(page).not_to have_content(project.title)
  end

  scenario "user can add task to project" do
    create_task("New task")
    expect(page).to have_content("New task")
  end

end