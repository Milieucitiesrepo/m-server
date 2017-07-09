object false

node(:total) { |_| @total }

child(@dev_sites) {

  attributes :id, :devID, :featured, :application_type_name, :title, :status, :start_date, :street, :address, :images, :description, :ward_name, :ward_num, :image_url, :hearts, :updated_at, :latitude, :longitude, :general_status

  child(:addresses) { attributes :id, :street }

  child(:statuses) { attributes :id, :status, :start_date, :end_date }

  child(:comments) { attributes :id, :body }

  child(:meetings) { attributes :id, :title, :date, :time, :meeting_type, :location }
}
