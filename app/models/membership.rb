class Membership < ActiveRecord::Base
  belongs_to :user, inverse_of: :memberships
  belongs_to :organization, inverse_of: :memberships
end
