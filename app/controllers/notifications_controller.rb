class NotificationsController < ApplicationController
  load_and_authorize_resource :user
  load_and_authorize_resource :notification, through: :user, singleton: true

  def show; end

  def edit
    @no_header = true
  end

  def update
    if @notification.update(notification_params)
      render :show, status: :ok
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  private

  def notification_params
    params.require(:notification).permit(:newletter, :updated_dev_site_near_me)
  end
end
