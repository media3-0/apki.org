json.array!(@course_data_apis) do |course_data_api|
  json.extract! course_data_api, :id, :name, :difficulty, :description, :image
  json.url course_data_api_url(course_data_api, format: :json)
end
