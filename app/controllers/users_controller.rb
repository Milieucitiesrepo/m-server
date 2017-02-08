class UsersController < ApplicationController
  load_and_authorize_resource :user
  before_action :load_user, only: [:show, :edit, :destroy, :update]

  def index
    @users = User.includes(:profile, :notification)
    respond_to do |format|
      format.html
      format.json { render json: @users.to_json }
    end
  end

  def new
    @user.build_profile
  end

  def show
    @no_header = true
  end

  def edit
    @no_header = true
  end

  def create
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: t('sessions.notice.welcome')
    else
      flash[:alert] = @user.errors.messages.values.join(', ')
      render :new
    end
  end

  def update
    if @user.update(user_params)
      render :show, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    session.delete(:user_id)
    render json: {}, status: :ok
  end

  private

  def load_user
    @user = User.find_by(slug: params[:slug])
  end

  # rubocop:disable Metrics/MethodLength
  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      address_attributes: [
        :id,
        :street,
        :city
      ],
      profile_attributes: [
        :id,
        :name,
        :bio,
        :web_presence,
        :anonymous_comments,
        :neighbourhood,
        :postal_code,
        :accepted_terms,
        :organization,
        :community_role,
        :verification_status
      ]
    )
  end
end
