require 'rails_helper'

describe Course::UserCoursesController, type: :controller do

  before(:all) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = {'test' => 'data'}
  end

  before(:each) do
    Course::UserCourse.destroy_all
    Course::CourseDatum.destroy_all
    Course::Exercise.destroy_all
    Course::Lesson.destroy_all
    Course::Quiz.destroy_all
    Course::Achievement.destroy_all
    create_course_with_sample_data
  end

  after(:all) do
    User.destroy_all
  end

  it 'All quizzes and exercises done marks lesson as passed (+ achievement for lesson)' do
    session[:user_id] = @user.id.to_s
    lesson = @course.course_lessons.first
    user_course = Course::UserCourse.create!(user: @user, course_course_datum: @course)
    lesson.course_exercises.each do |exercise|
      user_course.exercises[exercise.id.to_s] = {}
    end
    user_course.save!

    # Nie zakończona lekcja
    expect(Course::CourseChecker.check_lesson lesson, user_course).to eq false

    json_request = {'ID' => lesson.id.to_s, 'quizzes' => {
        @quizzes[0].id.to_s => 3,
        @quizzes[1].id.to_s => 0,
        @quizzes[2].id.to_s => 1
    }}
    request.env['RAW_POST_DATA'] = json_request.to_json
    post :check_quizzes, format: :json

    user_course.reload

    # Rozwiązane quizy
    expect(Course::CourseChecker.check_lesson lesson, user_course).to eq true
    achievement = Course::Achievement.where(lesson_id: lesson.id.to_s).first
    expect(user_course.achievements.include? achievement.id.to_s).to eq true

    # Sprawdzenie po raz drugi. Achievement nie powinieć być ponownie przyznany!
    request.env['RAW_POST_DATA'] = json_request.to_json
    post :check_quizzes, format: :json
    expect(user_course.achievements.count).to eq 1
  end

  it 'User can participate to course' do
    session[:user_id] = @user.id.to_s
    post :new, format: :json, id: @course.id.to_s
    json_response = JSON.parse response.body
    expect(json_response['status']).to eq 'ok'
    expect(Course::UserCourse.where(id: json_response['id']).exists?).to eq true
    expect(Course::UserCourse.where(user: @user, course_course_datum: @course).exists?).to eq true

    post :new, format: :json, id: @course.id.to_s
    expect(response.status).to eq 422
    json_response = JSON.parse response.body
    expect(json_response['status']).to eq 'already exists'
  end

  describe 'User solving quizzes' do

    it 'User succesfully solve quizzes (lesson with no exercises marked as solved)' do
      session[:user_id] = @user.id.to_s
      user_course = Course::UserCourse.create!(user: @user, course_course_datum: @course)
      lesson = @course.course_lessons.first
      json_request = {'ID' => lesson.id.to_s, 'quizzes' => {
          @quizzes[0].id.to_s => 3,
          @quizzes[1].id.to_s => 0,
          @quizzes[2].id.to_s => 1
      }}
      request.env['RAW_POST_DATA'] = json_request.to_json
      post :check_quizzes, format: :json
      json_response = JSON.parse response.body
      expect(json_response['is_correct']).to eq true
      quizzes_ids = @quizzes.map { |quiz| quiz.id.to_s }
      json_response['quizzes'].each do |key, value|
        expect(quizzes_ids.include? key).to eq true
        expect(value).to eq true
      end
      user_course.reload
      expect(user_course.quizzes.include? lesson.id.to_s).to eq true
    end

    it 'User solved only 2 quizzes' do
      session[:user_id] = @user.id.to_s
      user_course = Course::UserCourse.create!(user: @user, course_course_datum: @course)
      lesson = @course.course_lessons.first
      json_request = {'ID' => lesson.id.to_s, 'quizzes' => {
          @quizzes[0].id.to_s => 3,
          @quizzes[1].id.to_s => 1,
          @quizzes[2].id.to_s => 1
      }}
      request.env['RAW_POST_DATA'] = json_request.to_json
      post :check_quizzes, format: :json
      json_response = JSON.parse response.body
      expect(json_response['is_correct']).to eq false
      quizzes_ids = @quizzes.map { |quiz| quiz.id.to_s }
      json_response['quizzes'].each do |key, value|
        expect(quizzes_ids.include? key).to eq true
        if key == @quizzes[1].id.to_s
          expect(value).to eq false
        else
          expect(value).to eq true
        end
      end
      user_course.reload
      expect(user_course.quizzes.include? lesson.id.to_s).to eq false
    end

    it 'Bad lesson ID passed by data' do
      session[:user_id] = @user.id.to_s
      json_request = {'ID' => 'bad_id', 'quizzes' => {
          @quizzes[0].id.to_s => 3,
          @quizzes[1].id.to_s => 1,
          @quizzes[2].id.to_s => 1
      }}
      request.env['RAW_POST_DATA'] = json_request.to_json
      post :check_quizzes, format: :json
      expect(response.status).to eq 404
      json_response = JSON.parse response.body
      expect(json_response['error']).to eq 'Nie znaleziono takiego zasobu'
    end

    it 'User is not participating to course' do
      session[:user_id] = @user.id.to_s
      lesson = @course.course_lessons.first
      json_request = {'ID' => lesson.id.to_s, 'quizzes' => {
          @quizzes[0].id.to_s => 3,
          @quizzes[1].id.to_s => 1,
          @quizzes[2].id.to_s => 1
      }}
      request.env['RAW_POST_DATA'] = json_request.to_json
      post :check_quizzes, format: :json
      expect(response.status).to eq 404
      json_response = JSON.parse response.body
      expect(json_response['error']).to eq 'Nie znaleziono takiego zasobu'
    end
  end

  describe 'Not logged user' do
    it 'cannot participate to course' do
      post :new, format: :json, id: @course.id.to_s
      expect(response.status).to eq 401
    end

    it 'cannot solve quizzes' do
      post :check_quizzes, format: :json
      expect(response.status). to eq 401
    end
  end

  private
  def create_course_with_sample_data
    @course = Course::CourseDatum.new(data: @data)
    lesson = Course::Lesson.new(data: @data)
    3.times do
      lesson.course_exercises << Course::Exercise.create!(data: @data)
    end

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
  end
end