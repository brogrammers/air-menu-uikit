require Rails.root + 'lib/air_menu'
require 'oauth2'
require 'json'

class LoginController < ApplicationController

  def create
    scope_parameter = AirMenu::Settings.scopes.join ' '
    access_token = client.password.get_token(params[:username], params[:password], :scope => scope_parameter)
    session[:access_token] = access_token.to_hash[:access_token]
    puts session
    render :json => { :message => 'ok' }
  rescue OAuth2::Error
    render :json => { :error => 'wrong_credentials' }, :status => :unauthorized
  end

  def index
    reset_session
    redirect_to '/'
  end

end