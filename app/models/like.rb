class Like < ActiveRecord::Base
  belongs_to :dev_site
  belongs_to :user
end
