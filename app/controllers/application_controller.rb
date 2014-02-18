class ApplicationController < ActionController::Base
  protect_from_forgery

  rescue_from ActionController::InvalidAuthenticityToken do
    render :json => { :error => 'missing_csrf' }, :status => :bad_request
  end

  def handle_unverified_request
    super
    #raise ActionController::InvalidAuthenticityToken
  end

  def handle_missing_session
    render :json => { :error => 'no_session' }, :status => :unauthorized
  end

  def client
    @client ||= OAuth2::Client.new(AirMenu::Settings.client_id, AirMenu::Settings.client_secret, :site => AirMenu::Settings.backend_url, :token_url => '/api/oauth2/access_tokens')
  end
end
