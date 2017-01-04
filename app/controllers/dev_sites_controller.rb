class DevSitesController < ApplicationController
  DEFAULT_SITES_LIMIT = 20
  load_and_authorize_resource

  def index
    @no_header = true
    @dev_sites = DevSite.includes(:addresses, :statuses, :comments)
    @dev_sites = @dev_sites.search(search_params) if search?
    @dev_sites = @dev_sites.send(params[:sort]) if sort?
    @total = @dev_sites.count
    paginate

    respond_to do |format|
      format.html
      format.json
    end
  end

  def map
  end

  def images
    render json: { images: @dev_site.image_hash }
  end

  def show
  end

  def new
    @dev_site = DevSite.new
    @dev_site.addresses.build
    @dev_site.statuses.build
  end

  def edit
  end

  def create
    respond_to do |format|
      if @dev_site.save
        format.html { redirect_to @dev_site, notice: t('dev-sites.create.created') }
        format.json { render :show, status: :created, location: @dev_site }
      else
        # TODO: alert needs translation
        format.html { render :new, alert: 'Failed to create development site' }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @dev_site.update(dev_site_params)
        format.html { redirect_to @dev_site, notice: t('dev_sites.update.updateS') }
        format.json { render :show, status: :accepted, location: @dev_site }
      else
        format.html { render :edit }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @dev_site.destroy
    respond_to do |format|
      format.html { redirect_to dev_sites_path, notice: t('dev_sites.destroy.destroyS') }
      format.json { head :no_content }
    end
  end

  private

  def paginate
    return if params[:page].blank? || params[:limit].blank?
    limit = sites_limit
    page = page_number
    @dev_sites.limit!(limit).offset!(limit * page)
  end

  def sites_limit
    params[:limit].present? ? params[:limit].to_i : DEFAULT_SITES_LIMIT
  end

  def page_number
    params[:page].present? ? params[:page].to_i : 0
  end

  def sort?
    params[:sort].present?
  end

  def search?
    location_search_present? || search_term_present?
  end

  def search_term_present?
    search_terms = [:year, :status, :ward]
    search_terms.any? { |query| params[query].present? }
  end

  def location_search_present?
    params[:latitude].present? && params[:longitude].present?
  end

  def search_params
    params.permit(:latitude, :longitude, :year, :ward, :status)
  end

  # rubocop:disable Metrics/MethodLength
  def dev_site_params
    params.require(:dev_site)
      .permit(:devID,
              :application_type,
              :title,
              :images_cache,
              :files_cache,
              :build_type,
              :description,
              :ward_councillor_email,
              :urban_planner_email,
              :ward_name,
              :ward_num,
              :image_url,
              :hearts,
              images: [],
              files: [],
              likes_attributes: [:id, :user_id, :dev_site_id, :_destroy],
              addresses_attributes: [:id, :lat, :lon, :street, :_destroy],
              statuses_attributes: [:id, :status, :status_date, :_destroy])
  end
end
