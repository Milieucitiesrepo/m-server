class ConversationsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: @conversations, status: :ok
  end

  def show
    render json: @conversation, status: :ok
  end

  def create
    if @conversation.save
      render json: @conversation, status: :created, location: @conversation
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end

  def update
    if @conversation.update(conversation_params)
      render :show, status: :accepted, location: @conversation
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @conversation.destroy
    head :no_content
  end

  private

  def conversation_params
    params.require(:conversation).permit(
      :address,
      :city,
      :postal_code,
      :topic,
      :body,
      :conversation_type,
      :image
    )
  end
end
