require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do 
  let(:user) { FactoryGirl.create(:user) }
  let(:project) { FactoryGirl.create(:project, user: user) }

  describe 'GET #index' do

    context 'unauthorized user try to access index' do
      it "get 401" do
        get :index
        expect(response).to have_http_status(401)
      end
    end

    context 'authorized user try to get access index' do
      before do
        sign_in user
        get :index
      end

      it "get 200" do
        expect(response).to have_http_status(200)
      end

      it "assigns @projects" do
        expect(assigns(:projects)).not_to be_nil
      end
    end
  end
  
  describe 'POST #create' do
    context 'unauthorized user try to create project' do
      it "get 401" do
        post :create, project: { title: "New project" }
        expect(response).to have_http_status(401)
      end
    end

    context 'authorized user try to create project' do
      before { sign_in user }

      it "creates new project" do
        expect { post :create, project: { title: "New project" } }.to change(Project, :count).by(1)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'unauthorized user try to delete project' do
      it "get 401" do
        delete :destroy, id: project.id
        expect(response).to have_http_status(401)
      end
    end

    context 'authorized user try to delete project' do
      before { sign_in user }

      it "deletes project" do
        project.reload
        expect { delete :destroy, id: project.id }.to change(Project, :count).by(-1)
      end
    end
  end

  describe 'PUT #update' do
    context 'unauthorized user try to update project' do
      it "get 401" do
        put :update, id: project.id, title: 'some new title'
        expect(response).to have_http_status(401)
      end
    end

    context 'authorized user try to update project' do
      before do 
        sign_in user
        put :update, id: project.id, project: { title: 'some new title' }
      end

      it "updates project" do 
        project.reload
        expect(project.title).to eq('some new title')
      end
    end
  end

end
