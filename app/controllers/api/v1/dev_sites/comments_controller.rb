class Api::V1::DevSites::CommentsController < Api::V1::ApiController
  before_action :authenticate_request
  load_resource :dev_site
  load_and_authorize_resource :comment, through: :dev_site

  def index
  end

  def show
  end

  def create
    @comment = @dev_site.comments.build(user_id: current_user.id, body: params[:comment][:body])
    if @comment.save
      render :show, status: :ok
    else
      render json: @comment.errors, status: 406
    end
  end

  def update
    if @comment.update(comment_params)
      render :show, status: :ok
    else
      render json: @comment.errors, status: 406
    end
  end

  def destroy
    if @comment.destroy
      head :no_content, status: 204
    else
      render json: { notice: 'Your comment was not deleted. Please try again.' }, status: 500
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
