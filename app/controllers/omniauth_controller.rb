class OmniauthController < ApplicationController
  def create
    @user_auth = request.env['omniauth.auth']
    @user = find_user_by_uid || create_user

    update_user_email if @user.email.nil?

    session[:user_id] = @user.id
    redirect_to previous_url, notice: t('sessions.notice.welcome')
  end

  private

  def previous_url
    request.env['omniauth.origin'] || root_path
  end

  def find_user_by_uid
    User.find_by(uid: @user_auth['uid'])
  end

  def create_user
    new_user = User.create(
      uid: @user_auth['uid'],
      email: @user_auth['info']['email'],
      provider: @user_auth['provider']
    )
    build_user_profile(new_user)
    new_user.save
    new_user
  end

  def build_user_profile(new_user)
    new_user.build_profile(name: @user_auth['info']['name'])
  end

  def update_user_email
    @user.update(email: @user_auth['info']['email'])
  end
end
