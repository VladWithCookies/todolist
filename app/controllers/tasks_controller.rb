class TasksController < ApplicationController
  respond_to :html, :json
  before_action :get_task, except: :create
  load_and_authorize_resource except: [:create]

  def show 
    respond_with(@task.as_json(include: { comments: { include: :comment_files } }))
  end

  def create  
    @task = Task.new(task_params)
    @task.project_id = params[:project_id]
    @task.priority = Project.find_by(id: params[:project_id]).tasks.count
    
    if @task.save 
      render json: @task.as_json, status: :ok
    else 
      render json: { errors: @task.errors, status: :no_content }
    end
  end

  def update 
    if @task.update(task_params)
      render json: @task.as_json, status: :ok
    else 
      render json: { task: @task.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    if @task.destroy   
      render json: { status: :ok }
    else 
      render json: { task: @task.errors }
    end
  end

  def mark
    if @task.update(is_done: !@task.is_done)
      render json: { status: :ok }
    else
      render json: { task: @task.errors }
    end
  end

  def deadline 
    if @task.update(deadline: params[:deadline])
      render json: { status: :ok }
    else 
      render json: { task: @task.errors }
    end
  end
  
  def priority_up 
    @next_task = Task.where(project_id: @task.project_id, priority: @task.priority - 1).first
    render json: { status: :ok } and return unless @next_task
    @next_task.update(priority: @task.priority)

    if @task.update(priority: @task.priority - 1)
      render json: { status: :ok }
    else 
      render json: { task: @task.errors }
    end
  end

  def priority_down
    @prev_task = Task.where(project_id: @task.project_id, priority: @task.priority + 1).first
    render json: { status: :ok } and return unless @prev_task
    @prev_task.update(priority: @task.priority)

    if @task.update(priority: @task.priority + 1)
      render json: { status: :ok }
    else 
      render json: { task: @task.errors }
    end
  end

  private 
    def task_params 
      params.require(:task).permit(:deadline, :title, :project_id)
    end

    def get_task
      @task = Task.find_by(id: params[:id])
    end
end
