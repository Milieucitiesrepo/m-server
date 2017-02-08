class LegalController < ApplicationController
  def privacy
    @no_header = true
  end

  def terms_of_use
    @no_header = true
  end
end
