json.array!(@course_lessons) do |course_lesson|
  json.extract! course_lesson, :id, :data
  json.url course_lesson_url(course_lesson, format: :json)
end
