class MainController < ApplicationController
  before_action :is_logged_in, only: [:compile]

  def index
  end

  def news
    @news = News.order_by(created_at: 'desc').page params[:page]
  end

  def view_news
    @news = News.find(params[:id])
  end

  def test
  end

  def forms_test
  end

<<<<<<< HEAD
  def free_editor
=======
  def compile
    sleep rand(0.5...3.0)
    conn = Faraday.new(url: Rails.configuration.x.compile_api_host) do |faraday|
      faraday.request :url_encoded
      faraday.response :logger
      faraday.adapter Faraday.default_adapter
    end

    response = conn.post do |req|
      req.url '/compile'
      req.headers['Content-Type'] = 'application/json'
      req.body = { lang: params[:lang], code: params[:code], user_input: params[:input] }.to_json
    end

    render json: JSON.parse(response.body.to_s)
>>>>>>> 860590da78e73985b1539853493e1bf825cd42b8
  end
end
