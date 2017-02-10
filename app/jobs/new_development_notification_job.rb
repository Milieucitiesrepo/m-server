require 'mandrill'

class NewDevelopmentNotificationJob
  @queue = :milieu_primary_queue

  class << self
    def perform(dev_site_id)
      addresses = dev_site_addresses(dev_site_id)
      addresses.each do |address|
        next if address.lat.blank? || address.lon.blank?
        message = prepare_message(address, dev_site_id)
        send_email(message) if message.present?
      end
    end

    private

    def prepare_message(address, dev_site_id)
      user_ids = search_user_ids(address)
      return if user_ids.empty?

      recipients = convert_users_to_mandrill_recipients(user_ids)
      merge_vars = convert_users_to_mandrill_merge_fields(user_ids)
      body = email_body

      message_object(recipients, body, merge_vars, address, dev_site_id)
    end

    def send_email(message)
      mandrill = Mandrill::API.new(ENV['MANDRILL_API_KEY'])
      result = mandrill.messages.send message
    end

    def dev_site_addresses(dev_site_id)
      dev_site = DevSite.find(dev_site_id)
      dev_site.addresses
    end

    def convert_users_to_mandrill_recipients(user_ids)
      User.find(user_ids).map do |user|
        { email: user.email }
      end
    end

    def convert_users_to_mandrill_merge_fields(user_ids)
      User.find(user_ids).map do |user|
        { rcpt: user.email, vars: [{ name: 'name', content: user.name }] }
      end
    end

    def search_user_ids(address)
      Address
        .within(0.15, origin: [address.lat, address.lon])
        .where(addressable_type: 'User')
        .pluck(:addressable_id)
    end

    def email_body
      # TODO: use locale to render translated email, also need translation
      template = 'user_mailer/new_development_notification.html.erb'
      ActionController::Base.new.render_to_string(template, layout: false)
    end

    def message_object(recipients, body, merge_vars, address, dev_site_id)
      # TODO: email subject needs translation
      dev_site_url = "https://milieu.io/dev_sites/#{dev_site_id}"
      {
        from_name: 'Milieu',
        from_email: 'info@milieu.io',
        to: recipients,
        subject: 'New develpment site built near you',
        html: body,
        merge_vars: merge_vars,
        preserve_recipients: false,
        global_merge_vars: [
          { name: 'address', content: address.full_address },
          { name: 'dev_site_url', content: dev_site_url }
        ]
      }
    end
  end
end
