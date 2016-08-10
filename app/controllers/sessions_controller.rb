class SessionsController < ApplicationController
  before_action :update_activity_time
  before_action :session_expiry, except: [:create]
  
  def create
    begin
    #@user = User.find_by(email: params[:session][:email].downcase)
      @user = User.from_omniauth(request.env['omniauth.auth'])
      session[:user_id] = @user.id      
      flash[:success] = "Welcome, #{@user.name}!"
    rescue 
      flash[:warning] = "There was an error while trying to authenticate you, please try again"
    end
    redirect_to root_path
  end
   # if @user && @user.authenticate(params[:session][:password])
    #  session[:user_id] = @user.id
    #  redirect_to root_path, notice: "Welcome to Milieu"
    #else
    #  redirect_to new_session_path, alert: "Could not sign in, try again"
    #end
  #end

  def destroy
    session.delete(:user_id) if signed_in?
    redirect_to root_path, notice: "Logged out"
  end

  private

  def update_activity_time
    session[:expires_at] = 24.hours.from_now
  end

  def session_expiry
    get_session_time_left
    log_out if @session_time_left <= 0
  end

  def get_session_time_left
    expire_time = session[:expires_at] || Time.now
    @session_time_left = (expire_time.to_time - Time.now).to_i
  end

end

