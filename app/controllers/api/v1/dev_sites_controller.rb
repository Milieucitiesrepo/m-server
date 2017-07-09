class Api::V1::DevSitesController < Api::V1::ApiController
  before_action :authenticate_request

  def index
    @dev_sites = DevSite.includes(:addresses, :statuses, :comments)
    @dev_sites = @dev_sites.search(search_params) if search?
    @dev_sites = @dev_sites.send(params[:sort]) if sort?
    @total = @dev_sites.count
    paginate

    render json: @dev_sites
  end

  def show; end

  def create
    @dev_site = DevSite.new(dev_site_params)
    if @dev_site.save
      render :show, status: :created, location: @dev_site
    else
      render json: @dev_site.errors, status: :unprocessable_entity
    end
  end

  def update
    if @dev_site.update(dev_site_params)
      render :show, status: :accepted, location: @dev_site
    else
      render json: @dev_site.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @dev_site.destroy
    head :no_content
  end

  def sync
    command = UpdateDevSiteFromJson.call(sync_params[:dev_sites])

    if command.success?
      render json: { results: command.result }, status: :ok
    else
      render json: { errors: command.errors[:sync] }, status: :unprocessable_entity
    end
  end

  private

  def set_dev_site
    @dev_site = DevSite.find(params[:id])
  end

  def paginate
    return unless params[:page].present? || params[:limit].present?

    limit = params[:limit].present? ? params[:limit].to_i : 20
    page = params[:page].present? ? params[:page].to_i : 0
    @dev_sites.limit!(limit).offset!(limit * page)
  end

  def sort?
    params[:sort].present?
  end

  def search?
    ((params[:latitude].present? && params[:longitude].present?) ||
    params[:year].present? ||
    params[:ward].present? ||
    params[:status].present?)
  end

  def search_params
    params.permit(:latitude, :longitude, :year, :ward, :status)
  end

  # rubocop:disable Metrics/MethodLength
  def dev_site_params
    params.require(:dev_site).permit(:devID,
                                     :application_type,
                                     :title,
                                     :images_cache,
                                     :files_cache,
                                     :build_type,
                                     :description,
                                     :ward_councillor_email,
                                     :urban_planner_email,
                                     :urban_planner_name,
                                     :ward_name,
                                     :ward_num,
                                     :image_url,
                                     :hearts,
                                     { images: [] },
                                     { files: [] },
                                     likes_attributes: [:id, :user_id, :dev_site_id, :_destroy],
                                     addresses_attributes: [:id, :lat, :lon, :street, :_destroy],
                                     statuses_attributes: [:id, :status, :start_date, :_destroy])
  end

  def sync_params
    params.permit(dev_sites: [:dev_site_id,
                              :title,
                              :address,
                              :build_type,
                              :description,
                              :urban_planner_name,
                              :urban_planner_email,
                              :ward_councillor_email,
                              :applicant_first_name,
                              :applicant_last_name,
                              :on_behalf_of,
                              :ward,
                              :municipality,
                              :received_date,
                              :active_at,
                              :url_full_notice,
                              application_types_attributes: [
                                :name
                              ],
                              meetings_attributes:
                              [
                                :meeting_type,
                                :time,
                                :date,
                                :title,
                                :location
                              ],
                              statuses_attributes: [
                                :status,
                                :start_date,
                                :end_date
                              ],
                              addresses_attributes: [
                                :street,
                                :city,
                                :province_state,
                                :country
                              ]
                            ])
  end
end
