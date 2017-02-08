require "uri"
require "net/http"
require "json"

class AuthenticateUser
  prepend SimpleCommand

  def initialize(access_token, provider)
    @access_token = access_token
    @provider = provider
  end

  def call
    if user
      exp = Time.now.to_i + 24 * 3600
      payload = { :user_id => user.uuid, :exp => exp }
      jwt = JsonWebToken.encode(payload)
      result = {:token => jwt, :expireTime => exp}
      return JSON.generate(result)
    end
    nil
  end

  private

  attr_accessor :access_token, :provider

  def user
    response = HTTParty.get(ENV.fetch("FACEBOOK_GRAPH_URL"),
    {query: {access_token: access_token, fields: "id,email,name"}, format: :json})
    errMsg = response.has_key?("error") ? response['error'] : nil
    if errMsg
      errors.add :user_authentication, errMsg
    else
      user = User.find_by(uid: response['id'])
      unless user.present?
        user = User.create(uid: response['id'],
                            email: response['email'],
                            provider: provider)
        user.build_profile(name: response['name'])
        user.save
      end
      user.update(email: response['email']) if user.email.nil?
      return user
    end
  end

end
