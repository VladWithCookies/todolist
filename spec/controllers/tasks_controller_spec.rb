require 'rails_helper'

RSpec.describe TasksController, type: :controller do 
  let(:user) { FactoryGirl.create(:user) }
  let(:project) { FactoryGirl.create(:project, user: user) }
  let(:task) { FactoryGirl.create(:task, project: project) }

  describe 'POST #create' do
    it "creates new task" do
      sign_in user
      expect { post :create, title: "New task", project_id: project.id }.to change(Task, :count).by(1)
    end
  end

  describe 'PUT #destroy' do
    it "delete task" do
      task.reload
      expect { delete :destroy, id: task.id }.to change(Task, :count).by(-1)
    end
  end

  describe 'POST #mark' do
    it "marks task as done" do
      post :mark, id: task.id
      task.reload
      expect(task.is_done).to eq(true)
    end
  end

  describe 'POST #deadline' do
    it "add deadline to task" do
      deadline = Date.today
      post :deadline, id: task.id, deadline: deadline
      task.reload
      expect(task.deadline).to eq(deadline)
    end
  end

  describe 'POST #priority_up' do
    let(:other_task) { FactoryGirl.create(:task, project: project) }
    
    it "inc priority of task" do
      post :priority_up, id: other_task.id, project_id: project.id
      other_task.reload
      expect(other_task.priority).to eq(task.priority - 1)
    end
  end

  describe 'POST #priority_down' do
    let(:other_task) { FactoryGirl.create(:task, project: project) }
    
    it "dec priority of task" do
      post :priority_down, id: task.id, project_id: project.id
      task.reload
      expect(task.priority).to eq(other_task.priority - 1)
    end
  end
end
