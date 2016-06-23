module SessionsHelper

  def login(user)
    session[:user_id] = user.id
  end

  def current_user
    @user = User.find(session[:user_id]) if signed_in?
    @user ||= User.new
  end

  def signed_in?
    session[:user_id].present?
  end

end
