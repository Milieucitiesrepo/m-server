class Api::V1::VotesController < Api::V1::ApiController
  before_action :authenticate_request
  load_and_authorize_resource :vote, through: :current_user

  def create
    if @vote.save
      render json: @vote, status: :ok
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @vote.destroy
    render json: {}, status: 204
  end

  private

  def vote_params
    params.require(:vote).permit(:comment_id, :up)
  end
end
