class UsersController < ApplicationController
  def get_current_user
    render json: current_user.as_json, status: :ok
  end
end