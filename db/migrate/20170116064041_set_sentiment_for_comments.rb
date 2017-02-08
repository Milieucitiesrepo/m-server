class SetSentimentForComments < ActiveRecord::Migration
  def up
    Comment.all.each do |comment|
      comment.set_sentiment
    end
  end
end
