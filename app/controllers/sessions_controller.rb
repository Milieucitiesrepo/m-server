class SessionsController < ApplicationController
  before_action :update_activity_time
  before_action :session_expiry, except: [:create]

  def create
    user = find_user_by_email
    if user && user.authenticate(params[:session][:password])
      reset_session
      session[:user_id] = user.id
      redirect_to request.referrer, notice: t('sessions.notice.welcome')
    else
      redirect_to new_session_path, alert: t('sessions.alert.could_not_signin')
    end
  end

  def destroy
    session.delete(:user_id) if signed_in?
    reset_session
    redirect_to root_path
  end

  private

  def update_activity_time
    session[:expires_at] = 24.hours.from_now
  end

  def session_expiry
    log_out if session_time_left <= 0
  end

  def session_time_left
    expire_time = session[:expires_at] || Time.now.to_f
    (expire_time.to_f - Time.now.to_f).to_i
  end

  def find_user_by_email
    email = params[:session][:email].downcase
    User.find_by(email: email, provider: nil)
  end
end
