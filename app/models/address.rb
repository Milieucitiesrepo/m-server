class Address < ActiveRecord::Base
  include Geokit::Geocoders
  belongs_to :addressable, polymorphic: true

  acts_as_mappable default_units: :kms,
                   distance_field_name: :distance,
                   lat_column_name: :lat,
                   lng_column_name: :lon
  after_validation :geocoded, if: :new_street?
  validates :street, presence: { message: 'Street of address is required.' }

  def new_street?
    street.present? && street_changed?
  end

  def geocoded
    lat_and_lng = Geokit::Geocoders::GoogleGeocoder.geocode(full_address)
    return unless lat_and_lng.success
    self.lat = lat_and_lng.lat
    self.lon = lat_and_lng.lng

  rescue # what is this doing?
  end

  def full_address(with_country: true)
    address_attributes = [street, city, province_state]
    address_attributes << country if with_country
    address_attributes.delete_if(&:blank?).map(&:strip).join(', ')
  end
end
