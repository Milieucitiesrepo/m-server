module DevSites
  class CommentsController < ApplicationController
    load_and_authorize_resource :comment

    def index
      @comments =  @comments.includes(:votes, :user)
      @total = @comments.count
      @comments = paginate(@comments, 5)
    end

    def show; end

    def create
      respond_to do |format|
        if @comment.save
          format.json { render :show, status: :ok }
        else
          format.json { render json: @comment.errors, status: 406 }
        end
      end
    end

    def update
      respond_to do |format|
        if @comment.update(comment_params)
          format.json { render json: @comment, status: 200 }
        else
          format.json do
            render json: {
              notice: 'Your comment was not updated. Please try again.'
            }, status: 500
          end
        end
      end
    end

    def destroy
      respond_to do |format|
        if @comment.destroy
          format.json { head :no_content, status: 204 }
        else
          format.json do
            render json: {
              notice: 'Your comment was not deleted. Please try again.'
            }, status: 500
          end
        end
      end
    end

    private

    def comment_params
      params.require(:comment).permit(:body, :commentable_id, :commentable_type, :user_id)
    end
  end
end
