class User < ActiveRecord::Base
  extend FriendlyId

  rolify
  has_secure_password validations: false

  has_many :likes, dependent: :destroy
  has_many :conversations, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_one :notification, dependent: :destroy
  has_one :profile, dependent: :destroy
  has_one :address, as: :addressable, dependent: :destroy
  has_many :comments
  accepts_nested_attributes_for :profile
  accepts_nested_attributes_for :address

  validates :email,
            presence: { message: I18n.t('validates.alert.emailIsRequired') },
            uniqueness: { message: I18n.t('validates.alert.emailAlreadyInUse') },
            unless: 'provider.present?'
  validates :password,
            presence: { message: I18n.t('validates.alert.passwordIsRequired'), on: :create },
            confirmation: { message: I18n.t('validates.alert.passwordNotMatch') },
            length: { in: 6..20, message: I18n.t('validates.alert.passwordLimitation') },
            allow_blank: true,
            unless: 'provider.present?'
  delegate :name, :bio, :web_presence, :anonymous_comments, to: :profile, allow_nil: true
  friendly_id :slug_candidates, use: :slugged

  after_create :create_notification

  def slug_candidates
    [
      :name_from_profile,
      :email_mailbox,
      :name_and_id,
      :id
    ]
  end

  def email_mailbox
    email.split('@')[0].to_s if email.present?
  end

  def name_from_profile
    profile && profile.name
  end

  def name_and_id
    "#{profile.name}-#{id}" if profile && profile.name
  end
end
