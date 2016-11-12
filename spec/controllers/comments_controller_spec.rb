require 'rails_helper'

RSpec.describe CommentsController, type: :controller do 
  let(:user) { FactoryGirl.create(:user) }
  let(:project) { FactoryGirl.create(:project, user: user) }
  let(:task) { FactoryGirl.create(:task, project: project) }
  let(:comment) { FactoryGirl.create(:comment, task: task) }

  before do
    apply_abilities
    sign_in user
  end

  describe "DELETE #destroy" do

    before { Comment.stub(:find).and_return(comment) }

    context 'authorized user try to delete project' do
      it "deletes comment" do
        task.reload
        expect { delete :destroy, id: comment.id }.to change(Comment, :count).by(-1)
      end
    end

    context 'unauthorized user try to delete comment' do
      before do
        @ability.cannot :destroy, Comment
        delete :destroy, id: comment.id
      end

      it "get 401" do
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "POST #create" do
    it "create new comment" do
      comment.reload
      expect { post :create, comment: { text: "some text", task_id: task.id } }.to change(Comment, :count).by(1)
    end
  end

end