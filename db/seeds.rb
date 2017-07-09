ottawa_municipality = Municipality.find_or_create_by(name: 'Ottawa')
guelph_municipality = Municipality.find_or_create_by(name: 'Guelph')

Ward.find_or_create_by(name: 'Orleans', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Innes', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Barrhaven', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Kanata North', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'West Carleton-March', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Stittsville', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Bay', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'College', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Knoxdale-Merivale', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Gloucester-Southgate', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Beacon Hill-Cyrville', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Rideau-Vanier', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Rideau-Rockcliffe', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Somerset', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Kitchissippi', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'River', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Capital', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Alta Vista', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Cumberland', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Osgoode', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Rideau-Goulbourn', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Gloucester-South Nepean', municipality_id: ottawa_municipality.id)
Ward.find_or_create_by(name: 'Kanata South', municipality_id: ottawa_municipality.id)

# answers = [
#   {
#     "type": "text",
#     "text": "happy times i love water springs are great and so useful!",
#     "field": {
#       "id": "42471743",
#       "type": "long_text"
#     }
#   },
#   {
#     "type": "text",
#     "text": "039475",
#     "field": {
#       "id": "42471734",
#       "type": "short_text"
#     }
#   },
#   {
#     "type": "text",
#     "text": "Sharon",
#     "field": {
#       "id": "42471732",
#       "type": "short_text"
#     }
#   },
#   {
#     "type": "choices",
#     "choices": {
#       "labels": [
#         "for my daily drinking water needs year round"
#       ]
#     },
#     "field": {
#       "id": "42471736",
#       "type": "multiple_choice"
#     }
#   },
#   {
#     "type": "text",
#     "text": "There are so many ways i can't even remember",
#     "field": {
#       "id": "42471738",
#       "type": "long_text"
#     }
#   }
# ]

# survey = CustomSurvey.find_by(typeform_id: 'HHlHgX')

# survey_response = SurveyResponse.create(response_body: answers,
#                                         custom_survey_id: 'HHlHgX')

# survey.survey_responses << survey_response if survey_response.valid?
# survey.save
