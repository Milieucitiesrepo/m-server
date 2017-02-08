class Event < ActiveRecord::Base
  include Geokit::Geocoders
  mount_uploaders :images, ImagesUploader

  has_many :comments, as: :commentable, dependent: :destroy

  validates :title, presence: { message: 'Title is required' }
  validates :location, presence: { message: 'Location is required' }
  validates :images, presence: { message: 'An image is required' }
  validates :time, presence: { message: 'Time is required' }
  validates :description, presence: { message: 'Description is required' }
  validates :date, presence: { message: 'Date is required' }

  def geocoded
    lat_and_lng = Geokit::Geocoders::GoogleGeocoder.geocode location
    return if lat_and_lng.success
    self.geocode_lat = lat_and_lng.lat
    self.geocode_lon = lat_and_lng.lng
  end

  def image_url
    return images.first.web.url if images.present?
    ActionController::Base.helpers.image_path('mainbg.jpg')
  end

  def longitude
    geocode_lon
  end

  def latitude
    geocode_lat
  end
end
