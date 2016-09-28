class CommentsController < ApplicationController
  respond_to :html, :json
  before_action :get_comment, except: [:create]

  def show
    respond_with(@comment.as_json(include: :comment_files))
  end
    
  def create
    @comment = Comment.new(comment_params)
    @comment.task_id = params[:task_id]
    
    if @comment.save 
      render json: @comment.as_json, status: :ok
    else 
      render json: { errors: @comment.errors, status: :no_content }
    end
  end

  def destroy
    if @comment.destroy
      render json: { status: :ok }
    else
      render json: { comment: @comment.errors }
    end
  end

  def add_file
    @file = CommentFile.new()

    @file.comment_id = @comment.id
    @file.comment_file = params[:file]

    if @file.save
      render json: { success: true }
    else 
      render json: @file.errors
    end
  end

  private 
    def comment_params 
      params.permit(:text, :task_id)
    end

    def get_comment
      @comment = Comment.find_by(id: params[:id])
    end
end
