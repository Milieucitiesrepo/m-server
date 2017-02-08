class Api::V1::AuthenticationController < Api::V1::ApiController
  skip_before_action :authentication_request
  skip_before_action :verify_authenticity_token

  def authenticate
    command = AuthenticateUser.call(params[:token], params[:provider])

    if command.success?
      render json: command.result
    else
      render json: command.errors[:user_authentication].first, status: :unauthorized
    end
  end
end
