# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# puts 'Tworzenie użytkowników'
# 10.times do |n|
#   User.create!(uid: n.to_s, nickname: "nickname#{n}", account_type: :student)
# end
# puts 'Użytkownicy stworzeni'

Course::CourseDatum.destroy_all
Course::Lesson.destroy_all
Course::Quiz.destroy_all
Course::Exercise.destroy_all
Course::Achievement.destroy_all

course = Course::CourseDatum.new(data: { 'name' => 'sample course', 'finished' => true })

lesson = Course::Lesson.new(data: { 'name' => 'sample lesson 1' })

quizzes = []
quizzes << Course::Quiz.create!(data: {'question' => 'Test question 1', 'answer_idx' => 3})
quizzes << Course::Quiz.create!(data: {'question' => 'Test question 2', 'answer_idx' => 0})
quizzes << Course::Quiz.create!(data: {'question' => 'Test question 3', 'answer_idx' => 1})
lesson.course_quizs.concat quizzes
quizzes.each do |quiz|
  quiz.save!
end

Course::Achievement.create!(data: {'name' => 'Achievement 1' }, lesson_id: lesson.id.to_s)
course.course_lessons << lesson
lesson.save!

lesson = Course::Lesson.new(data: { 'name' => 'sample lesson 2' })

quizzes = []
quizzes << Course::Quiz.create!(data: {'question' => 'Test question 4', 'answer_idx' => 5})
quizzes << Course::Quiz.create!(data: {'question' => 'Test question 5', 'answer_idx' => 2})
quizzes << Course::Quiz.create!(data: {'question' => 'Test question 6', 'answer_idx' => 0})
lesson.course_quizs.concat quizzes
quizzes.each do |quiz|
  quiz.save!
end

exercises = []
exercises << Course::Exercise.create!(data: { 'expected_output' => '55', 'lang' => 'RUBY' })

lesson.course_exercises.concat exercises
exercises.each do |exercise|
  exercise.save!
end

Course::Achievement.create!(data: {'name' => 'Achievement 2' }, lesson_id: lesson.id.to_s)
course.course_lessons << lesson
lesson.save!


course.save!

user = User.where(uid: 'test').exists? ? User.find_by(uid: 'test') : User.create!(name: 'test', uid: 'test', account_type: :student)

Course::UserCourse.destroy_all
Course::UserCourse.create!(course_course_datum: course, user: user)

user.save!