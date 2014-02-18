require 'oauth2'
require 'json'
require 'openssl'

class LoginController < ApplicationController

  def create
    scope_parameter = AirMenu::Settings.scopes.join ' '
    access_token = client.password.get_token(params[:username], params[:password], :scope => scope_parameter)
    session[:access_token] = access_token.to_hash[:access_token]
    render :json => { :message => 'ok' }
  rescue OAuth2::Error
    render :json => { :error => 'wrong_credentials' }, :status => :unauthorized
  rescue Faraday::SSLError
    render :json => { :error => 'invalid_cert' }, :status => :unauthorized
  end

  def index
    reset_session
    redirect_to '/'
  end

end