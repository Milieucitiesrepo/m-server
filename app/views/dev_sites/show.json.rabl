object @dev_site

attributes :id, :devID, :featured, :application_type_name, :title, :status, :start_date, :street, :address, :images, :description, :short_description, :ward_name, :ward_num, :image_url, :updated_at, :latitude, :longitude, :municipality_id, :ward_id, :urban_planner_name, :urban_planner_email, :ward_councillor_email, :updated, :general_status, :applicant_first_name, :applicant_last_name, :on_behalf_of, :url_full_notice

node(:likes_count) { |dev_site| dev_site.likes.count  }

node(:like) { |dev_site| Like.find_by(user_id: current_user.id, dev_site_id: dev_site.id).try(:attributes) }

node(:url) { |dev_site| dev_site_url(dev_site.id) }

child(files: :files) do
  attributes :url

  node :name do |f|
    f.file.filename.split('.').first
  end

  node :extension do |f|
    f.file.extension
  end

end

child(:addresses) { attributes :id, :street, :city, :province_state, :country }

child(:city_files) { attributes :id, :link, :name }

child :statuses do
  attributes :id, :status, :start_date, :end_date
  child(:meeting) { attributes :id, :title, :date, :time, :meeting_type, :location }
  child(:notification) do
    attributes :id, :notification_type, :send_at
    child(:notice, if: lambda { |notification| notification.notice.url }) do
      attributes :url

      node :name do |f|
        f.file.filename.split('/').last
      end
    end
  end
end

child :sentiment do
  attributes :anger, :disgust, :sadness, :joy, :fear, :id
end
