Rails.application.routes.draw do

  get 'projects/mine'
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
  get 'school/profile/:id', to: 'school#profile', as: 'school_profile_view'
  get 'school/edit_profile'
  post 'school/edit_profile'
  get 'school/educator_news'
  post 'school/educator_news'
  get 'school/all_news'
  get 'school/news/:id', to: 'school#view_news', as: 'school_view_news'

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
  get 'course_front/index'
  get 'course_front/list'
  get '/auth/:provider/callback' => 'sessions#create'
  get '/signout' => 'sessions#destroy', :as => :signout

  unless Rails.env.production?
    get 'test_login/:user_id', to: 'sessions#test_login', as: :test_login
    get 'test_login', to: 'sessions#test_login'
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
