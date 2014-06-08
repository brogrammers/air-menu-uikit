require 'oauth2'
require 'json'
require 'openssl'

class LoginController < ApplicationController

  def create
    create_session
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