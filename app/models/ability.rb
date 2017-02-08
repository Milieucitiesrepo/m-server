class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)]

    default_abilities

    if user.has_role? :admin
      admin_abilities
    elsif !user.new_record?
      regular_user_abilities(user)
    end
  end

  private

  def default_abilities
    can :read, DevSite
    can :read, Event
    can :read, Profile
    can [:new, :create], User
    can :read, Comment
    can :read, Conversation
    can :create, NewsletterSubscription
    can :create, CityRequest
  end

  def admin_abilities
    can :manage, :all
  end

  def regular_user_abilities(user)
    can :read, DevSite
    can :read, Event
    can [:new, :create, :update, :edit, :destroy, :show], User, id: user.id
    can :manage, Profile, user_id: user.id
    can :manage, Notification, user_id: user.id
    can :manage, Comment, user_id: user.id
    can :read, Comment
    can :manage, Vote, user_id: user.id
    can :manage, Conversation, user_id: user.id
  end
end
