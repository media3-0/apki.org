json.array!(@course_course_data) do |course_course_datum|
  json.extract! course_course_datum, :id, :data
  json.url course_course_datum_url(course_course_datum, format: :json)
end
