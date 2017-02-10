class Organization < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_and_belongs_to_many :municipalities
  has_many :dev_sites, through: :municipalities
  validates :name, presence: true
end
