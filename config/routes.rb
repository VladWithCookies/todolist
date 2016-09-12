Rails.application.routes.draw do
  devise_for :users

  root 'application#index'

  resources :projects

  resources :tasks do
    post :mark, on: :member
    post :deadline, on: :member
    post :priority_up, on: :member
    post :priority_down, on: :member
  end

  resources :comments

end
