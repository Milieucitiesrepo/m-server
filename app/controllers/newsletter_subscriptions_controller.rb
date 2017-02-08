class NewsletterSubscriptionsController < ApplicationController
  load_and_authorize_resource :newsletter_subscription

  def create
    if @newsletter_subscription.save
      render json: @newsletter_subscription, status: :ok
    else
      render json: @newsletter_subscription.errors, status: :unprocessable_entity
    end
  end

  private

  def newsletter_subscription_params
    params.require(:newsletter_subscription).permit(:email)
  end
end
