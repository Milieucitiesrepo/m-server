object false

node(:total) { |_| @total }

child(@dev_sites) {

  attributes :id, :devID, :application_type, :title, :status, :status_date, :street, :address, :images,
    :description, :ward_name, :ward_num, :image_url, :hearts, :updated_at, :latitude, :longitude

  child(:addresses) { attributes :id, :street }

  child(:statuses) { attributes :id, :status, :status_date }

  child(:comments) { attributes :id, :body }

}
