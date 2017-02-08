class AddSurveyToUsersDataChange < ActiveRecord::Migration
  def up
    User.all.each do |user|
      user.create_survey
    end
  end

  def down
    User.all.each do |user|
      user.survey.destroy
    end
  end
end
