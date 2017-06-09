require 'mandrill'

class FlaggedCommentNotificationJob
  @queue = :milieu_primary_queue

  class << self
    def perform(users, comment, dev_site)
      message = prepare_message(users, comment, dev_site)
      send_email(message) if message.present?
    end

    private

    def prepare_message(users, comment, dev_site)
      recipients = convert_users_to_mandrill_recipients(users)
      merge_vars = generate_merge_vars(users, comment, dev_site)
      body = email_body

      generate_message_object(recipients, body, merge_vars, comment, dev_site)
    end

    def send_email(message)
      mandrill = Mandrill::API.new(ENV['MANDRILL_API_KEY'])
      mandrill.messages.send message
    rescue Mandrill::Error => e
      Rails.logger.info "A mandrill error occurred: #{e.class} - #{e.message}"
      raise StandardError
    end

    def convert_users_to_mandrill_recipients(users)
      users.map do |user|
        { email: user.email }
      end
    end

    def generate_merge_vars(users, comment, dev_site)
      users.collect do |user|
        url_opts = {
          dev_site_id: dev_site.id,
          comment_id: comment.id,
          email: user.email,
          token: user.generate_auth_token.token
        }

        approve_comment_url = Services::UrlGenerator.generate_approve_comment_url(url_opts)
        reject_comment_url = Services::UrlGenerator.generate_reject_comment_url(url_opts)
        name = user.name_from_profile || 'Milieu admin'

        {
          rcpt: user.email,
          vars: [
            { name: 'name', content: name },
            { name: 'approve_comment_url', content: approve_comment_url },
            { name: 'reject_comment_url', content: reject_comment_url }
          ]
        }
      end
    end

    def email_body
      # TODO: email translation
      template = 'comment_notification_mailer/flagged_comment_notification.html.erb'
      ActionController::Base.new.render_to_string(template, layout: false)
    end

    def generate_message_object(recipients, body, merge_vars, comment, dev_site)
      {
        from_name: 'Milieu',
        from_email: 'info@milieu.io',
        to: recipients,
        subject: 'Comment flagged as offensive',
        html: body,
        merge_vars: merge_vars,
        preserve_recipients: false,
        global_merge_vars: [
          { name: 'dev_site_id', content: dev_site.id },
          { name: 'comment_body', content: comment.body }
        ]
      }
    end
  end
end
