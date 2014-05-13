require Rails.root + 'lib/air_menu'
require 'oauth2'
require 'json'
require 'pp'

class ApiProxyController < ApplicationController

  before_filter :check_session

  def proxy
    response = access_token.send request_method.downcase.to_sym, path, :params => params[:api_proxy]
    self.response.headers = response.headers
    render :json => response.body, :status => response.status
  rescue OAuth2::Error => error
    response = error.response
    self.response.headers = response.headers
    render :json => response.body, :status => response.status
  rescue Faraday::ConnectionFailed
    render :json => {:error => 'service_unavailable'}, :status => 502
  end

  protected

  def check_session
    handle_missing_session unless access_token
  end

  def access_token
    @access_token ||= if session[:access_token]
                        puts session[:access_token]
                        puts session[:access_token].class
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