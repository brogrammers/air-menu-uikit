require Rails.root + 'lib/air_menu'

class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :check_phone_auth

  rescue_from ActionController::InvalidAuthenticityToken do
    render :json => { :error => 'missing_csrf' }, :status => :bad_request
  end

  def check_phone_auth
    if valid_phone_auth?
      @access_token = begin
        OAuth2::AccessToken.from_hash client, access_token_hash
      end
      session[:access_token] = @access_token.to_hash.to_s if @access_token
      puts session
    end
  end

  def access_token_hash
    {
        :token => params[:token],
        :access_token => params[:token],
        :refresh_token => params[:refresh_token],
        :token_type => params[:token_type],
        :expires_in_seconds => params[:expires_in_seconds],
        :scopes => params[:scopes].split(' ')
    }
  end

  def valid_phone_auth?
    params[:client_id] && params[:client_secret] && params[:token] && params[:refresh_token] && params[:token_type] && params[:expires_in_seconds] && params[:scopes]
  end

  def handle_unverified_request
    super
    raise ActionController::InvalidAuthenticityToken
  end

  def handle_missing_session
    render :json => { :error => 'no_session' }, :status => :unauthorized
  end

  def client
    @client ||= OAuth2::Client.new((params[:client_id] || AirMenu::Settings.client_id), (params[:client_secret] || AirMenu::Settings.client_secret), :site => AirMenu::Settings.backend_url, :token_url => '/api/oauth2/access_tokens')
  end

  def create_session
    scope_parameter = AirMenu::Settings.scopes.join ' '
    access_token = client.password.get_token(params[:username], params[:password], :scope => scope_parameter)
    session[:access_token] = access_token.to_hash[:access_token]
  end
end
