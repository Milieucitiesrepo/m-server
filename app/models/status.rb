class Status < ActiveRecord::Base
  scope :current, -> { order(start_date: :desc).first }
  default_scope { order(start_date: :desc) }
  belongs_to :dev_site, foreign_key: 'dev_site_id'
  belongs_to :municipality, foreign_key: 'municipality_id'
  has_one :meeting, dependent: :destroy
  has_one :notification, as: :notifiable, dependent: :destroy

  validates :status, presence: { message: 'Status is required' }
  validates :start_date, presence: { message: 'Status date is required' }

  accepts_nested_attributes_for :meeting, allow_destroy: true

  APPLICATION_RECEIVED_STATUS = 'Application Received'.freeze
  APPLICATION_COMPLETE_STATUS = 'Application Complete, Comment Period Open'.freeze
  PLANNING_REVIEW_STATUS = 'Planning Review Stage'.freeze
  REVISION_STATUS = 'Revision'.freeze
  DECISION_STATUS = 'Decision'.freeze

  OTTAWA_STATUSES = [
    'Unknown',
    'Application File Pending',
    'Application Reactivated',
    'Application Approved',
    'Application Approved by Committee',
    'Application Recommended to Council',
    'Draft Report sent to Councillor and Applicant for Response',
    'In Appeal Period',
    'Comment Period in Progress',
    'Community Information and Comment Session Held',
    'Comment Period has Ended/Issue Resolution',
    'Community Information and Comment Session Open'
  ].freeze

  GENERAL_STATUS = {
    'Active Development' => [
      'Application File Pending',
      'Application Reactivated'
    ],
    'Comment Period' => [
      'Comment Period in Progress',
      'Community \'Heads Up\' - Completed',
      'Community Information and Comment Session Held',
      'Notice of Public Meeting Sent'
    ],
    'Comment Period Closed' => [
      'Agreement Package Received from Owner',
      'Agreement Signed',
      'Amendment Initiated',
      'Amendment Recommended to Council for Approval',
      'Appealed to OMB',
      'Applicant Concurs',
      'Applicant Does Not Concur',
      'Application Approved',
      'Application Approved - No Agreement/Letter of Undertaking Required',
      'Application Approved by Committee',
      'Application Approved by Council',
      'Application Approved by OMB',
      'Application Approved by OMB - Agreement Pending',
      'Application Approved by Staff',
      'Application Approved in part by OMB',
      'Application Draft Approved',
      'Application Recommended to Council for Approval',
      'Application Recommended to Council for Refusal',
      'Application Refused by OMB',
      'Application on Hold',
      'By-law Passed - Appeal Period Pending',
      'By-law Passed - In Appeal Period',
      'Comment Period has Ended/Issue Resolution',
      'Councillor Concurs',
      'Deferred by Committee',
      'Delegated Authority Reinstated',
      'Draft Approval Revised/Extended',
      'Draft Approved',
      'Draft Report Sent to Councillor and Applicant for Response',
      'In Appeal Period',
      'No Appeal',
      'No Appeal - Official Plan Amendment Adopted',
      'OMB Appeal Withdrawn - Application Approved',
      'OMB Hearing Held',
      'OMB Package Sent',
      'OMB Pre-Hearing Held',
      'Public Meeting Held',
      'Receipt of Agreement from Owner Pending',
      'Receipt of Letter of Undertaking from Owner Pending',
      'Referred to Staff by Committee',
      'Request for Agreement Received',
      'Revision Request Received',
      'Unknown',
      'Zoning By-law in Effect'
    ]
  }.freeze

  GUELPH_STATUSES = [
    APPLICATION_RECEIVED_STATUS,
    APPLICATION_COMPLETE_STATUS,
    PLANNING_REVIEW_STATUS,
    REVISION_STATUS,
    DECISION_STATUS
  ].freeze

  def general_status
    GENERAL_STATUS.each do |key, array|
      return key.to_s if array.include? status
    end

    'Comment Period Closed'
  end

  def friendly_status_date
    start_date.strftime('%B %e, %Y') if start_date.present?
  end
end
