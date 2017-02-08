class CityRequest < ActiveRecord::Base
  validates :city, presence: { message: I18n.t('validates.alert.cityIsRequired') }
end
