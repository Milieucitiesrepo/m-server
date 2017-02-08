class PagesController < ApplicationController
  def home
    @no_header = true
  end

  def contact_milieu
    message = contact_milieu_params
    ContactMailer.contact_milieu(message).deliver_now
    render nothing: true
  end

  def contact_file_lead
    message = contact_planner_params
    ContactMailer.contact_file_lead(message).deliver_now
    render json: {}
  end

  def contact_councillor
    message = contact_planner_params
    ContactMailer.contact_councillor(message).deliver_now
    render json: {}
  end

  def about; end

  private

  def contact_milieu_params
    params.required(:contact_milieu).permit(:name, :email, :message)
  end

  def contact_planner_params
    params.permit(:name, :email, :message, :dev_site_id)
  end
end
