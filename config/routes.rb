AirMenuUikit::Application.routes.draw do

  get '/' => 'home#index', :as => 'root'
  post '/login' => 'login#create'
  match '/*a', :to => 'api_proxy#proxy'

end
