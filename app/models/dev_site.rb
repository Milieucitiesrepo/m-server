require 'data_analysis'

class DevSite < ActiveRecord::Base
  include Services::DataAnalysis

  scope :latest, -> { joins(:statuses).order('statuses.start_date DESC') }

  mount_uploaders :images, ImagesUploader
  mount_uploaders :files, FilesUploader

  VALID_BUILDING_TYPES = [
    'Not Applicable',
    'Derelict',
    'Demolition',
    'Residential Apartment',
    'Low-rise Residential',
    'Mid-rise Residential',
    'Hi-rise Residential',
    'Mixed-use Residential/Community',
    'Commercial',
    'Commercial/Hotel',
    'Mixed-use',
    'Additions'
  ].freeze

  VALID_FILTERS = [
    'year',
    'municipality',
    'ward',
    'status',
    'featured'
  ].freeze

  belongs_to :municipality, foreign_key: 'municipality_id'
  belongs_to :ward
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :addresses, as: :addressable, dependent: :destroy
  has_one  :sentiment, as: :sentimentable, dependent: :destroy
  has_many :statuses, dependent: :destroy
  has_many :city_files, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :meetings, dependent: :destroy
  has_and_belongs_to_many :application_types

  accepts_nested_attributes_for :addresses, allow_destroy: true
  accepts_nested_attributes_for :statuses, allow_destroy: true
  accepts_nested_attributes_for :likes, allow_destroy: true
  accepts_nested_attributes_for :application_types, allow_destroy: true
  accepts_nested_attributes_for :meetings, allow_destroy: true

  validates :devID,
            uniqueness: { message: 'Development Id must be unique' },
            presence: { message: 'Development Id is required' }
  validates :description, presence: { message: 'Description is required' }
  validates :municipality_id, presence: { message: 'Municipality is required' }
  validates :ward_id, presence: { message: 'Ward is required' }

  after_create do
    Resque.enqueue(NewDevelopmentNotificationJob, id) unless Rails.env.test?
  end

  after_save do
    Resque.enqueue(PruneDeadLinksJob, id) unless Rails.env.test?
  end

  def self.search(search_params)
    result = DevSite.joins(:ward, :municipality, :addresses).includes(:statuses, :comments)

    result = location_search(result, search_params)
    result = filter(result, search_params)
    result
  end

  def self.search_by_query(collection, value)
    return collection unless value
    collection.fuzzy_search(value)
  end

  def general_status
    return if statuses.empty?
    statuses.current.general_status
  end

  def current_status
    current = statuses.select do |status|
      today = DateTime.current
      (status.end_date.nil? && status.start_date < today) ||
      (status.start_date < today && status.end_date > today)
    end

    current.first
  end

  def status
    current_status ? current_status.status : 'No status'
  end

  def status_date
    current_status ? current_status.start_date.strftime('%B %e, %Y') : ''
  end

  def valid_statuses
    return Status::GUELPH_STATUSES unless municipality

    city = municipality.name
    status_set = "#{city.upcase}_STATUSES"
    Status.const_get(status_set)
  end

  def street
    return if addresses.empty?
    addresses.first.street
  end

  def address
    return if addresses.empty?
    addresses.first.full_address(with_country: false)
  end

  def latitude
    return if addresses.empty?
    addresses.first.lat
  end

  def longitude
    return if addresses.empty?
    addresses.first.lon
  end

  def ward_name
    ward.name if ward.present?
  end

  def image_url
    return images.first.web.url if images.present?
    return streetview_image unless addresses.empty?
    ActionController::Base.helpers.image_path('mainbg.jpg')
  end

  def update_sentiment
    return unless comments.present?

    results = overall_sentiments(comments.includes(:sentiment))

    create_sentiment if sentiment.blank?

    update(add_total_suffix(results[:totals]))
    sentiment.update(results[:averages])
  end

  def self.find_ordered(ids)
    return where(id: ids) if ids.empty?
    order_clause = 'CASE dev_sites.id '
    ids.each_with_index do |id, index|
      order_clause << "WHEN #{id} THEN #{index} "
    end
    order_clause << "ELSE #{ids.length} END"
    where(id: ids).order(order_clause)
  end

  def application_type_name
    application_types.last.name if application_types.any?
  end

  private

  def add_total_suffix(totals)
    new_totals = {}
    totals.map do |key, value|
      new_key = "#{key}_total".to_sym
      new_totals[new_key] = value
    end
    new_totals
  end

  def streetview_image
    root_url = 'https://maps.googleapis.com/maps/api/streetview'
    image_size = '600x600'
    api_key = 'AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw'

    "#{root_url}?size=#{image_size}&location=#{address}&key=#{api_key}"
  end

  class << self
    def location_search(collection, search_params)
      lat = search_params[:latitude]
      lon = search_params[:longitude]

      return collection unless lat && lon

      dev_site_ids = []
      dev_site_ids
        .push(Address.within(5, origin: [lat, lon])
        .closest(origin: [lat, lon])
        .limit(150)
        .pluck(:addressable_id))
      collection.find_ordered(dev_site_ids.flatten.uniq)
    end

    def filter(result, search_params)
      VALID_FILTERS.map do |filter|
        value = search_params[:filter]
        return result unless value

        result = send("filter_by_#{filter}", result, value)
      end
      result
    end

    def filter_by_year(collection, value)
      collection.where('extract(year from updated) = ?', value)
    end

    def filter_by_municipality(collection, value)
      collection.where(municipalities: { name: value })
    end

    def filter_by_ward(collection, value)
      collection.where(wards: { name: value })
    end

    def filter_by_status(collection, value)
      collection
        .where("statuses.start_date = (select max(statuses.start_date) \
                 from statuses where statuses.dev_site_id = dev_sites.id)")
        .where(statuses: { status: value })
    end

    def filter_by_featured(collection, value)
      collection.where(featured: value)
    end
  end
end
