class EventsController < ApplicationController
  load_and_authorize_resource

  def index
    @events = Event.all
    @dev_sites = paginate(@dev_sites)

    respond_to do |format|
      format.html
      format.json
    end
  end

  def show; end

  def new
    @event = Event.new
  end

  def edit; end

  def create
    @event = Event.new(event_params)

    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: t('events.create.createS') }
        format.json { render :show, status: :created, location: @event }
      else
        flash.now[:alert] = t('events.alert.mustFillReqired')
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: t('events.update.updateS') }
        format.json { render :show, status: :ok, location: @event }
      else
        flash.now[:alert] = t('events.alert.mustFillReqired')
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to map_url, notice: t('events.destroy.destroyS') }
      format.json { head :no_content }
    end
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(
      :title,
      :description,
      :time,
      :date,
      :images_cache,
      :location,
      :contact_email,
      :contact_tel,
      images: []
    )
  end
end
