class UpdateCommentSentimentJob
  @queue = :primary_queue

  def self.perform(comment_id)
    comment = Comment.find_by(id: comment_id)
    comment.set_sentiment if comment.present?
  end
end
