require 'singleton'

class Discourse
  include Singleton

  def initialize
    @client = DiscourseApi::Client.new('http://forum.apki.org')
    @client.api_key = ENV['API_DISCOURSE']
    @client.api_username = 'Administrator'
  end

  def get_user(username)
    @client.user username
  end
end
