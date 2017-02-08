class ApplicationMailer < ActionMailer::Base
  MILIEU_EMAIL_ADDRESS = 'info@milieu.io'.freeze
  default from: MILIEU_EMAIL_ADDRESS
  layout 'mailer'
end
