class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  rescue_from CanCan::AccessDenied do |exception|
    render status: 401, json: { error: exception.message }
  end

  def index
    render layout: layout_name
  end 

  private
    def layout_name
      if params[:layout] == 0
        false
      else
        'application'
      end
    end
end
