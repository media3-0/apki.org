# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts 'Tworzenie użytkowników'
10.times do |n|
  User.create!(uid: n.to_s, nickname: "nickname#{n}", account_type: :student)
end
puts 'Użytkownicy stworzeni'

@course = Course::CourseDatum.new(data: @data)
lesson = Course::Lesson.new(data: @data)

@quizzes = []
@quizzes << Course::Quiz.create!(data: {'question' => 'Test question 1', 'answer_idx' => 3})
@quizzes << Course::Quiz.create!(data: {'question' => 'Test question 2', 'answer_idx' => 0})
@quizzes << Course::Quiz.create!(data: {'question' => 'Test question 3', 'answer_idx' => 1})
lesson.course_quizs.concat @quizzes
@quizzes.each do |quiz|
	quiz.save!
end

Course::Achievement.create!(data: @data, lesson_id: lesson.id.to_s)
@course.course_lessons << lesson
lesson.save!
@course.save!