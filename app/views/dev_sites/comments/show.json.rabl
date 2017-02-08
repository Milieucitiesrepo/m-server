object @comment

attributes :id, :body, :created_at, :vote_count

node :voted_down do |comment|
  comment.voted_down(current_user)
end

node :voted_up do |comment|
  comment.voted_up(current_user)
end

child :user do
  attributes :id, :name, :anonymous_comments
end
