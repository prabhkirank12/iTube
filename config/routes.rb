Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:show, :index, :destroy, :create, :update] do 
        post :like, to: 'videos#like', as: 'like'
        post :unlike, to: 'videos#unlike', as: 'unlike'
        post :dislike, to: 'videos#dislike', as: 'dislike'
        post :undislike, to: 'videos#undislike', as: 'undislike'
        post :changelike, to: 'videos#change_like', as: 'changelike'

        resources :comments, only: [:index, :create]
    end

  resources :comments, only: [:destroy, :show, :update] do
     post :like, to: 'comments#like', as: 'like'
    post :unlike, to: 'comments#unlike', as: 'unlike'
    post :dislike, to: 'comments#dislike', as: 'dislike'
    post :undislike, to: 'comments#undislike', as: 'undislike'
    post :changelike, to: 'comments#change_like', as: 'changelike'

    resources :comments, only: [:index, :create]
  end
  end
end
