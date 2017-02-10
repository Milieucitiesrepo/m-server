module Organizations
  class MembershipsController < ApplicationController
    load_and_authorize_resource :organization

    def create
      member_email = membership_params[:user][:email]
      member = User.find_by(email: member_email)

      if !member
        message = 'There is no user with this email address'
        render json: { message: message, status: :unprocessable_entity }
      else
        @organization.users << member

        if @organization.save
          render json: { status: :ok }
        else
          render json: { message: @organization.errors, status: :unprocessable_entity }
        end
      end
    end

    def membership_params
      params.require(:membership).permit(user: [:email])
    end
  end
end
