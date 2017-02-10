class Municipality < ActiveRecord::Base
  has_many :wards, dependent: :destroy
  has_many :dev_sites
  has_and_belongs_to_many :organizations

  validates :name,
            presence: { message: 'Name is required.' },
            uniqueness: { message: 'Name must be unique.' }
end
