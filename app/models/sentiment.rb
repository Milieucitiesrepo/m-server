class Sentiment < ActiveRecord::Base
  belongs_to :sentimentable, polymorphic: true

  NAMES = [:anger, :joy, :fear, :sadness, :disgust].freeze

  def update_sentiment(text)
    params = { outputMode: 'json', text: text }.to_param
    base_uri = 'https://gateway-a.watsonplatform.net/calls/text/TextGetEmotion'
    uri = URI("#{base_uri}?apikey=#{ENV['WATSON_ALCHEMY_KEY']}&#{params}")
    req = Net::HTTP::Post.new(uri)
    req['Accept-Encoding'] = 'deflate'

    res = Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
      http.request(req)
    end

    sentiment_params = JSON.parse(res.body)['docEmotions']
    update(sentiment_params) if sentiment_params

    self
  end
end
