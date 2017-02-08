class ContactMailer < ApplicationMailer
  def contact_citizencity(name, email, message)
    @name = name
    @email = email
    @message = message
    mail(to: MILIEU_EMAIL_ADDRESS, subject: 'Citizen City contact form')
  end

  def contact_milieu(message)
    @name, @email, @message = message.values
    mail(to: MILIEU_EMAIL_ADDRESS, subject: 'Milieu contact form')
  end

  def contact_file_lead(message)
    @name, @email, @message, @dev_site_id = message.values
    email_to = DevSite.find(@dev_site_id).urban_planner_email
    subject = 'Message for File Lead from Milieu.io'

    mail(to: [email_to], subject: subject)
  end

  def contact_councillor(message)
    @name, @email, @message, @dev_site_id = message.values
    email_to = DevSite.find(@dev_site_id).ward_councillor_email
    subject = 'Message for Councillor from Milieu.io'

    mail(to: [email_to], subject: subject)
  end
end
