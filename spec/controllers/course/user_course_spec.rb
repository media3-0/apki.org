require 'rails_helper'
require 'spec_helper'

describe Course::UserCoursesController, type: :controller do

  before(:all) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = { 'test' => 'data'}
  end

  before(:each) do
    Course::UserCourse.destroy_all
    Course::CourseDatum.destroy_all
    Course::Exercise.destroy_all
    Course::Lesson.destroy_all
    Course::Quiz.destroy_all
    Course::Achievement.destroy_all
  end

  after(:all) do
    User.destroy_all
  end

  it 'All quizzes and exercises done marks lesson as passed' do
    session[:user_id] = @user.id.to_s
    course = create_course_with_sample_data
    lesson = course.course_lessons.first
    user_course = Course::UserCourse.create!(user: @user, course_course_datum: course)
    expect(Course::CourseChecker.check_lesson lesson, user_course).to eq false
    lesson.course_exercises.each do |exercise|
      user_course.exercises[exercise.id.to_s] = {}
    end
    lesson.course_quizs.each do |quiz|
      user_course.quizzes << quiz.id.to_s
    end
    user_course.save!
    expect(Course::CourseChecker.check_lesson lesson, user_course).to eq true
    achievement = Course::Achievement.where(lesson_id: lesson.id.to_s).first
    expect(user_course.achievements.include? achievement.id.to_s)
  end

  it 'User can participate to course' do
    session[:user_id] = @user.id.to_s
    course = create_course_with_sample_data
    post :new, format: :json, id: course.id.to_s
    json_response = JSON.parse response.body
    expect(json_response['status']).to eq 'ok'
    expect(Course::UserCourse.where(id: json_response['id']).exists?).to eq true
    expect(Course::UserCourse.where(user: @user, course_course_datum: course).exists?).to eq true

    post :new, format: :json, id: course.id.to_s
    expect(response.status).to eq 422
    json_response = JSON.parse response.body
    expect(json_response['status']).to eq 'already exists'
  end

  it 'Not logged user cannot participate to course' do
    course = create_course_with_sample_data
    post :new, format: :json, id: course.id.to_s
    expect(response.status).to eq 401
  end

  private
  def create_course_with_sample_data
    course = Course::CourseDatum.new(data: @data)
    lesson = Course::Lesson.new(data: @data)
    3.times do
      lesson.course_exercises << Course::Exercise.create!(data: @data)
    end
    2.times do
      lesson.course_quizs << Course::Quiz.create!(data: @data)
    end
    Course::Achievement.create!(data: @data, lesson_id: lesson.id.to_s)
    lesson.save!
    course.course_lessons << lesson
    course.save!
    return course
  end
end