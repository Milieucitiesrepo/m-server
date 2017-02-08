class CommentsController < ApplicationController
  load_and_authorize_resource

  def index
    @comments = Comment.all
    respond_to do |format|
      format.html
      format.json
    end
  end

  def show; end
end
