require 'rails_helper'

RSpec.describe TasksController, type: :controller do 
  let(:user) { FactoryGirl.create(:user) }
  let(:project) { FactoryGirl.create(:project, user: user) }
  let(:task) { FactoryGirl.create(:task, project: project) }

  before do
    apply_abilities
    sign_in user
  end

  describe 'POST #create' do
    it "creates new task" do
      sign_in user
      expect { post :create, task: { title: "New task" }, project_id: project.id }.to change(Task, :count).by(1)
    end
  end

  describe 'DELETE #destroy' do
    context 'authorized user try to delete task' do 
      it "delete task" do
        task.reload
        expect { delete :destroy, id: task.id }.to change(Task, :count).by(-1)
      end
    end

    context 'unauthorized user try to delete task' do 
      before do
        @ability.cannot :destroy, Task
        delete :destroy, id: task.id
      end

      it "get 401" do
        expect(response).to have_http_status(401)
      end
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
