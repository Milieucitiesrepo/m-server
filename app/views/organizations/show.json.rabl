object @organization

attributes :id, :name

child :municipalities do
  attributes :id, :name
end

child :users => :members do
  attributes :id, :email

  node :admin do |user|
    user.admin?
  end
end
