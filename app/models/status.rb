class Status < ActiveRecord::Base
  scope :current, -> { order(status_date: :desc).first }
  belongs_to :dev_site, foreign_key: 'dev_site_id'
  scope :current, -> { order(status_date: :desc).first }

  validates :status, presence: { message: 'Status is required' }
  validates :status_date, presence: { message: 'Status date is required' }

  VALID_STATUS_TYPES = [
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
    'Active Development': [
      'Application File Pending',
      'Application Reactivated'
    ],
    'Comment Period': [
      'Comment Period in Progress',
      'Community \'Heads Up\' - Completed',
      'Community Information and Comment Session Held',
      'Notice of Public Meeting Sent'
    ],
    'Comment Period Closed': [
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

  def general_status
    GENERAL_STATUS.each do |key, array|
      return key.to_s if GENERAL_STATUS[key].include? status
    end
    return 'Comment Period Closed'
  end

  def friendly_status_date
    status_date.strftime('%B %e, %Y') if status_date.present?
  end
end
