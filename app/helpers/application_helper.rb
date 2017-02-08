module ApplicationHelper
  def title(page_title)
    content_for(:title) { page_title }
  end

  def avatar(user, options = {})
    if user.profile.blank? || user.profile.avatar.blank?
      image_tag 'default-avatar.png', class: options[:html_class].to_s
    else
      image_tag user.profile.avatar.web.thumb, class: options[:html_class].to_s
    end
  end
end
