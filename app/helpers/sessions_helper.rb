module SessionsHelper
  def current_user
    @user = User.find(session[:user_id]) if signed_in?
    @user ||= User.new
  end

  def signed_in?
    session[:user_id].present?
  end

  def sign_in(user)
    reset_session
    session[:user_id] = user.id
  end

  def sign_out
    reset_session
  end
end
