class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :comment

  after_create do
    if up
      comment.increment!(:vote_count)
    else
      comment.decrement!(:vote_count)
    end
  end

  after_destroy do
    if up
      comment.decrement!(:vote_count)
    else
      comment.increment!(:vote_count)
    end
  end
end
