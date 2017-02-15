class CustomSurveysController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def typeform
    Rails.logger.info params
    typeform_id = params['form_response']['form_id']
    survey = CustomSurvey.find_by(typeform_id: typeform_id)

    render(json: {}, status: 500) && return unless survey

    responses = params['form_response']['answers']
    submitted_at = params['form_response']['submitted_at']
    token = params['form_response']['token']

    survey_response = SurveyResponse.create(response_body: responses,
                                            custom_survey_id: typeform_id,
                                            submitted_at: submitted_at,
                                            token: token)

    survey.survey_responses << survey_response if survey_response.valid?

    render json: {}, status: 200
  end
end
