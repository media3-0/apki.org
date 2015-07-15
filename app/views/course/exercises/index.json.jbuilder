json.array!(@course_exercises) do |course_exercise|
  json.extract! course_exercise, :id, :data, :parent_id
  json.url course_exercise_url(course_exercise, format: :json)
end
