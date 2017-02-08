class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_locale

  include SessionsHelper

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.html { redirect_to root_url, alert: exception.message }
      format.json { render json: {}, status: 403 }
    end
  end

  def default_url_options(options = {})
    { locale: I18n.locale }.merge options
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end


  def paginate(collection, limit = 20)
    limit = item_limit(limit)
    page = page_number
    collection = collection.limit(limit).offset(limit * page)
  end

  private

  def page_number
    params[:page].present? ? params[:page].to_i : 0
  end

  def item_limit(limit)
    params[:limit].present? ? params[:limit].to_i : limit
  end
end
