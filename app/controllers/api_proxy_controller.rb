require Rails.root + 'lib/air_menu'
require 'net/http'
require 'oauth2'
require 'json'
require 'pp'

class ApiProxyController < ApplicationController

  def proxy
    create_user and return if path == '/api/v1/users'
    response = access_token.send request_method.downcase.to_sym, path, :params => params
    self.response.headers = response.headers
    render :json => response.body, :status => response.status
  rescue OAuth2::Error => error
    response = error.response
    self.response.headers = response.headers
    render :json => response.body, :status => response.status
  rescue Faraday::ConnectionFailed
    render :json => {:error => 'service_unavailable'}, :status => 502
  end

  def create_user
    uri = URI(AirMenu::Settings.backend_url + path)
    response = Net::HTTP.post_form(uri, params)
    create_session
    render :json => response.body, :status => response.code
  end

  protected

  def check_session
    handle_missing_session unless access_token
  end

  def access_token
    @access_token ||= if session[:access_token]
      accepted_access_token = eval(session[:access_token])
      accepted_access_token['access_token'] = accepted_access_token['token']
      access_token_hash = accepted_access_token
      OAuth2::AccessToken.from_hash client, access_token_hash
    else
      nil
    end
  end

  def path
    request.env["PATH_INFO"]
  end

  def request_method
    request.env["REQUEST_METHOD"]
  end

end