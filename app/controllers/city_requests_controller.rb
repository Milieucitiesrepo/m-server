class CityRequestsController < ApplicationController
  load_and_authorize_resource :city_request

  def create
    if @city_request.save
      render json: @city_request, status: :ok
    else
      render json: @city_request.errors, status: :unprocessable_entity
    end
  end

  private

  def city_request_params
    params.require(:city_request).permit(:city)
  end
end
