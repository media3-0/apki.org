json.array!(@course_achievements) do |course_achievement|
  json.extract! course_achievement, :id, :data
  json.url course_achievement_url(course_achievement, format: :json)
end
