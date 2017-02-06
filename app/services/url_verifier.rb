module Services
  class UrlVerifier
    def self.verify_response(url, expected_code = 200)
      response = HTTParty.get(url)
      response.code == expected_code
    end
  end
end
