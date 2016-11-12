Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "callbacks" }
  root 'application#index'

  resources :projects
  
  resources :tasks do
    post :mark, on: :member
    post :deadline, on: :member
    post :priority_up, on: :member
    post :priority_down, on: :member
  end

  resources :comments do
    post :add_file, on: :member
  end

  post '/users/get_current_user' => 'users#get_current_user'
end
