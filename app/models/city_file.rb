class CityFile < ActiveRecord::Base
  belongs_to :dev_site

  def destroy_if_dead_link
    valid = Services::UrlVerifier.verify_response(link, 200)
    destroy unless valid
  end
end
