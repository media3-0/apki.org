Rails.application.routes.draw do

  get 'projects/mine'
  post 'main/compile'
  post 'projects/repo/:id', to: 'projects#repo'
  resources :projects
  namespace :course do
    resources :course_data
    resources :lessons
    resources :exercises
    resources :quizzes
    resources :achievements
    controller :user_courses do
      match '/user_courses/:action/:id', :via => 'post'
      match '/user_courses/:action', :via => 'post'
    end
  end
  controller :static do
    match 'static/:action', :via => 'get'
  end
  get 'school/profile/:id', to: 'school#profile', as: 'school_profile_view'
  get 'school/edit_profile'
  post 'school/edit_profile'
  get 'school/educator_news'
  post 'school/educator_news'
  get 'school/educator_news_list'
  post 'school/accept_application'

  get 'user/profile/:id', to: 'user#profile', as: 'profile_view'
  get 'user/edit_profile'
  post 'user/edit_profile'

  get 'admin_panel', to: 'admin_panel#panel', as: 'admin_panel'
  get 'admin_panel_list', to: 'admin_panel#list', as: 'admin_panel_list'

  mount Ckeditor::Engine => '/ckeditor'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get 'main/test'
  root 'course_front#list'
  get 'news', to: 'main#news'
  get 'news/:id', to: 'main#view_news', as: 'view_news'
  get 'main/forms_test'
  get 'main/free_editor'
  get 'course_front/index'
  get 'course_front/list'

  get 'articles', to: 'articles#article'
  get 'articles/all', to: 'articles#all_articles'
  get 'articles/categories', to: 'article_categories#list', as: 'articles_categories_list'
  get 'articles/category/:id', to: 'article_categories#index', as: 'articles_categories'
  get 'articles/:id', to: 'articles#view_article', as: 'view_article'
  get '/auth/:provider/callback' => 'sessions#create'
  get '/signout' => 'sessions#destroy', :as => :signout

  unless Rails.env.production?
    get 'test_login/:user_id', to: 'sessions#test_login', as: :test_login
    get 'test_login', to: 'sessions#test_login'
  end
end
