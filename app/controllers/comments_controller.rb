class CommentsController < ApplicationController
  
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
    @comment = Comment.find_by(id: params[:id])
    if @comment.destroy
      render json: { status: :ok }
    else
      render json: { comment: @comment.errors }
    end
  end

  private 
    def comment_params 
      params.require(:comment).permit(:text, :task_id)
    end
end
