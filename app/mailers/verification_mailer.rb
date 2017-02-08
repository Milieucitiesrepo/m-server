class VerificationMailer < ApplicationMailer
  default from: MILIEU_EMAIL_ADDRESS

  def request_role_verification(user)
    @user = user
    mail(to: MILIEU_EMAIL_ADDRESS, subject: 'Request for user role verification')
  end
end
