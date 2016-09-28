require 'rails_helper'

RSpec.describe CommentsController, type: :controller do 
  let(:user) { FactoryGirl.create(:user) }
  let(:project) { FactoryGirl.create(:project, user: user) }
  let(:task) { FactoryGirl.create(:task, project: project) }
  let(:comment) { FactoryGirl.create(:comment, task: task) }

  before { sign_in user }

  describe "DELETE #destroy" do
    it "deletes comment" do
      comment.reload
      expect { delete :destroy, id: comment.id }.to change(Comment, :count).by(-1)
    end
  end

  describe "POST #create" do
    it "create new comment" do
      expect { post :create, text: "some text", task_id: task.id }.to change(Comment, :count).by(1)
    end
  end
end