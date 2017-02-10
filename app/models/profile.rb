class Profile < ActiveRecord::Base
  belongs_to :user
  # THIS ARRAY MUST BE IN ORDER BY EACH WARDS, WARD NUMBER

  VALID_NEIGHBOURHOOD_TYPES = [
    'Orleans',
    'Innes',
    'Barrhaven',
    'Kanata North',
    'West Carleton-March',
    'Stittsville',
    'Bay',
    'College',
    'Knoxdale-Merivale',
    'Gloucester-Southgate',
    'Beacon Hill-Cyrville',
    'Rideau-Vanier',
    'Rideau-Rockcliffe',
    'Somerset',
    'Kitchissippi',
    'River',
    'Capital',
    'Alta Vista',
    'Cumberland',
    'Osgoode',
    'Rideau-Goulbourn',
    'Gloucester-South Nepean',
    'Kanata South',
    'Ward 1',
    'Ward 2',
    'Ward 3',
    'Ward 4',
    'Ward 5',
    'Ward 6'
  ].freeze

  validates :name, presence: { message: 'Name is required' }
  validates :organization, presence: { message: 'Organization is required' }, if: :verification_requested?
  validates :community_role, presence: { message: 'Community role is required' }, if: :verification_requested?
  validates :bio, presence: { message: 'Bio is required' }, if: :verification_requested?
  validates :accepted_terms, acceptance: { accept: true, message: 'Terms of use must be accepted' }

  after_save :send_verification_mailer, if: :verification_requested?, on: [:update]

  mount_uploader :avatar, ImagesUploader

  def verification_requested?
    verification_status == 'pendingVerification'
  end

  def send_verification_mailer
    VerificationMailer.request_role_verification(user).deliver_now if verification_status_changed?
  end
end
