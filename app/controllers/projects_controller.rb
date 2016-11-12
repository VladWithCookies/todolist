class ProjectsController < ApplicationController
  respond_to :html, :json
  before_action :get_project, except: [:index, :create]
  load_and_authorize_resource

  def index 
    @projects = Project.where(user: current_user)
    render json: @projects.to_json(include: :tasks ) 
  end

  def show 
    respond_with(@project.as_json)
  end

  def create 
    @project = Project.new(project_params)
    @project.user = current_user

    if @project.save
      render json: @project.as_json, status: :ok
    else
      render json: { project: @project.errors, status: :no_content }
    end
  end

  def destroy
    if @project.destroy
      render json: { status: :ok }
    else
      render json: { project: @project.errors }
    end
  end

  def update 
    if @project.update(project_params)
      render json: @project.as_json, status: :ok
    else 
      render json: { project: @project.errors, status: :unprocessable_entity }  
    end
  end

  private 
    def project_params
      params.require(:project).permit(:title)
    end

    def get_project
      @project = Project.find_by(id: params[:id])
    end

end