require 'data_analysis'

class PagesController < ApplicationController
  include Services::DataAnalysis

  def home
    @no_header = true
  end

  def utilisation
    @no_header = true
  end

  def participez
    @no_header = true
  end

  def survey
    @no_header = true
  end

  def submit_survey
    comment = params['comment']
    comments_json = File.read('public/comment.json')
    File.open("public/comment.json","w") do |f|
      f.puts JSON.pretty_generate(JSON.parse(comments_json) << comment)
    end
    render json: {}
  end

  # def wakefield
  #   typeform_id = 'HHlHgX'
  #   @dev_site = DevSite.find_by(devID: 'wakefield-1')
  #   @survey_sentiment = generate_survey_sentiment(typeform_id).to_json
  #   @no_header = true
  # end
  #
  # def contact_file_lead
  #   message = contact_form_params
  #   raise ArgumentError, 'No DevSite id provided' unless message[:dev_site_id].present?
  #
  #   ContactMailer.contact_file_lead(message).deliver_now
  #   render json: {}
  # end
  #
  # def contact_councillor
  #   message = contact_form_params
  #   raise ArgumentError, 'No DevSite id provided' unless message[:dev_site_id].present?
  #
  #   ContactMailer.contact_councillor(message).deliver_now
  #   render json: {}
  # end
  #
  # def about; end
  #
  # private
  #
  # def contact_form_params
  #   params.permit(:name, :email, :message, :dev_site_id)
  # end
  #
  # def generate_survey_sentiment(typeform_id)
  #   survey = CustomSurvey.find_by(typeform_id: typeform_id)
  #
  #   return unless survey.present? && survey.survey_responses.count > 5
  #
  #   survey_responses_ids = survey.survey_responses.map(&:id)
  #   comments = Comment.includes(:sentiment).where(commentable_id: survey_responses_ids)
  #   results = overall_sentiments(comments)
  #
  #   Sentiment.create(results[:averages])
  # end
end
