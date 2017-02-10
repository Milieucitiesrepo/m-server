module Organizations
  class MunicipalitiesController < ApplicationController
    load_resource :organization
    load_and_authorize_resource :municipality

    def update
      @organization.municipalities << @municipality
      render 'organizations/show'
    end

    def destroy
      @organization.municipalities.delete @municipality
      render 'organizations/show'
    end
  end
end
