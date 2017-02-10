class DevSitesController < ApplicationController
  DEFAULT_SITES_LIMIT = 20
  load_and_authorize_resource

  def index
    @no_header = true
    @dev_sites = retrieve_dev_sites
    @total = @dev_sites.count
    paginate

    respond_to do |format|
      format.html
      format.json
    end
  end

  def show
    @no_header = true
    @dev_site = DevSite.includes(:addresses, :statuses, :likes).find(params[:id])
  end

  def new
    @no_header = true
  end

  def edit; end

  def create
    respond_to do |format|
      if @dev_site.save
        format.html { redirect_to @dev_site, notice: 'Development successfully created.' }
        format.json { render :show, status: :created, location: @dev_site }
      else
        format.html { render :new, alert: 'Failed to create development.' }
        format.json { render json: @dev_site.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @dev_site.update(dev_site_params)
        format.html { redirect_to @dev_site, notice: 'Development successfully updated.' }
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
      format.html { redirect_to dev_sites_path, notice: 'Development successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private

  def paginate
    limit = dev_sites_limit
    page = page_number
    @dev_sites.limit!(limit).offset!(limit * page)
  end

  def dev_sites_limit
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
    search_terms = [:year, :status, :ward, :municipality, :featured]
    search_terms.any? { |query| params[query].present? }
  end

  def location_search_present?
    params[:latitude].present? && params[:longitude].present?
  end

  def search_params
    params.permit(:latitude, :longitude, :year, :ward, :status, :municipality, :featured)
  end

  def retrieve_dev_sites
    dev_sites = DevSite.joins(:ward, :municipality).includes(:addresses, :statuses, :comments)
    dev_sites = dev_sites.search(search_params) if search?
    dev_sites = dev_sites.send(params[:sort]) if sort?
    dev_sites
  end

  # rubocop:disable Metrics/MethodLength
  def dev_site_params
    params
      .require(:dev_site)
      .permit(
        :devID,
        :application_type,
        :municipality_id,
        :ward_id,
        :description,
        :ward_councillor_email,
        :urban_planner_email,
        :featured,
        images: [],
        files: [],
        likes_attributes: [:id, :user_id, :dev_site_id, :_destroy],
        addresses_attributes: [:id, :street, :city, :province_state, :country, :_destroy],
        statuses_attributes: [:id, :status, :status_date, :_destroy]
      )
  end
end
