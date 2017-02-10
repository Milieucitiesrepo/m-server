module Users
  class VotesController < ApplicationController
    load_and_authorize_resource :user
    load_and_authorize_resource :vote, through: :user

    def create
      if @vote.save
        render json: @vote, status: :ok
      else
        render json: @vote.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @vote.destroy
      render json: {}, status: 200
    end

    private

    def vote_params
      params.require(:vote).permit(:comment_id, :up)
    end
  end
end
