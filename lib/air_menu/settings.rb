require 'pp'
require 'rack'

module AirMenu
  class Settings
    class << self
      def client_id
        ENV['CLIENT_ID']
      end

      def client_secret
        ENV['CLIENT_SECRET']
      end

      def backend_url
        ENV['BACKEND_URL']
      end

      def scopes
        ['basic', 'user', 'developer', 'owner', 'get_menus', 'add_menus', 'add_active_menus']
      end
    end
  end
end