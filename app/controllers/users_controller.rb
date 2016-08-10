class UsersController < ApplicationController
  load_and_authorize_resource except: :login

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render json: @users.to_json }
    end
  end

  def login
    user_info, access_token = Omniauth::Facebook.authenticate(params['code'])
    if user_info['email'].blank?
      Omniauth::Facebook.deauthorize(access_token)  
    end
  end

  def new
    @user.build_profile
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Welcome to Milieu"
    else
      flash[:alert] = "You must accept terms of service" unless @user.profile.accepted_terms
      render :new
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      flash[:notice] = "Successfully deleted the user"
    else
      flash[:notice] = "Could not delete the user, try again!"
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation,
    profile_attributes: [:name, :neighbourhood, :postal_code, :accepted_terms])
  end

end
