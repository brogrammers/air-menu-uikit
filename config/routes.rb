AirMenuUikit::Application.routes.draw do

  get '/' => 'home#index', :as => 'root'
  post '/login' => 'login#create'
  get '/logout' => 'login#index'
  match '/*a', :to => 'api_proxy#proxy'

end
