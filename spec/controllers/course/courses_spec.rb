require 'rails_helper'

describe Course::CourseDataController, type: :controller do
  render_views

  before(:all) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = { 'test' => 'data' }
  end

  after(:each) do
    Course::CourseDatum.destroy_all
  end

  after(:all) do
    User.destroy_all
  end

  it 'Admin can create new course' do
    session[:user_id] = @admin.id.to_s

    post :create, format: :json
    expect(response).to be_success

    expect(Course::CourseDatum.count).to be > 0

    course = Course::CourseDatum.all.first
    expect(course).to be_valid
  end

  it 'User or teacher cannot create new course' do
    session[:user_id] = @user.id.to_s

    post :create, format: :json
    expect(response.status).to eq 401

    expect(Course::CourseDatum.count).to eq 0

    session[:user_id] = @teacher.id.to_s

    post :create, format: :json
    expect(response.status).to eq 401

    expect(Course::CourseDatum.count).to eq 0
  end

  it 'Admin can update course' do
    session[:user_id] = @admin.id.to_s

    course = Course::CourseDatum.create!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, format: :json, id: course.id.to_s
    expect(response).to be_success

    course.reload

    expect(course.data).to eq @data
  end

  it 'User or teacher cannot update course' do
    session[:user_id] = @user.id.to_s

    course = Course::CourseDatum.create!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, format: :json, id: course.id.to_s
    expect(response.status).to eq 401

    session[:user_id] = @teacher.id.to_s
    patch :update, format: :json, id: course.id.to_s
    expect(response.status).to eq 401
  end

  it 'Admin can destroy course' do
    session[:user_id] = @admin.id.to_s

    course = Course::CourseDatum.create!(data: @data)

    delete :destroy, format: :json, id: course.id.to_s
    expect(response).to be_success
    expect(Course::CourseDatum.where(id: course.id.to_s).exists?).to eq false
  end

  it 'User or teacher cannot destroy course' do
    session[:user_id] = @user.id.to_s

    course = Course::CourseDatum.create!(data: @data)

    delete :destroy, format: :json, id: course.id.to_s
    expect(response.status).to eq 401
    expect(Course::CourseDatum.where(id: course.id.to_s).exists?).to eq true

    session[:user_id] = @teacher.id.to_s
    delete :destroy, format: :json, id: course.id.to_s
    expect(response.status).to eq 401
    expect(Course::CourseDatum.where(id: course.id.to_s).exists?).to eq true
  end

  it 'Everybody can show single finished course' do
    course = Course::CourseDatum.create!(data: { finished: true })

    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq course.id.to_s
  end

  it 'Only admin can show single unfinished course' do
    course = Course::CourseDatum.create!(data: { finished: false })

    get :show, format: :json, id: course.id.to_s
    expect(response.status).to eq 401

    bypass_rescue
    expect { get :show, format: :json, id: course.id.to_s }.to raise_error(Exceptions::AccessDenied)

    session[:user_id] = @admin.id.to_s
    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq course.id.to_s
  end

  it 'Admin can list all courses' do
    session[:user_id] = @admin.id.to_s

    3.times do
      course = Course::CourseDatum.create!(data: @data)
    end

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3
  end

  it 'Everybody can list only finished courses' do
    3.times do
      Course::CourseDatum.create!(data: @data)
    end

    Course::CourseDatum.create!(data: { finished: false })
    Course::CourseDatum.create!(data: { finished: true })

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 1

    session[:user_id] = @user.id.to_s
    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 1

    session[:user_id] = @teacher.id.to_s
    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 1
  end

  it 'Not logged user cannot access to POST courses' do
    post :create, format: :json
    expect(response.status).to eq 401
    patch :update, format: :json, id: 'asdf'
    expect(response.status).to eq 401
    delete :destroy, format: :json, id: 'asdf'
    expect(response.status).to eq 401
  end

  it 'Cascade delete tests' do
    course = Course::CourseDatum.create!

    lessons = []
    exercises = []
    quizzes = []
    3.times do |i|
      lessons << course.course_lessons.create!

      3.times do
        exercises << lessons[i].course_exercises.create!
      end

      3.times do
        quizzes << lessons[i].course_quizs.create!
      end
    end

    course.destroy

    lessons.each do |lesson|
      expect(Course::Lesson.where(id: lesson.id.to_s).exists?).to eq false
    end

    exercises.each do |exercise|
      expect(Course::Exercise.where(id: exercise.id.to_s).exists?).to eq false
    end

    quizzes.each do |quiz|
      expect(Course::Quiz.where(id: quiz.id.to_s).exists?).to eq false
    end
  end

  it 'User metadata is correctly attached to course data' do
    #dane
    course = Course::CourseDatum.create!(data: { finished: true })
    lessons = []
    3.times do
      lessons << Course::Lesson.create!(course_course_datum: course)
    end

    user_course = Course::UserCourse.create(course_course_datum: course, user: @user)

    # Niezalogowany
    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['data']['lessonCurrent']).to eq ''
    expect(json_response['data']['lessonsPassed'].count).to eq 0
    expect(json_response['data']['userInside']).to eq false
    expect(json_response['data']['userFinished']).to eq false

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    json_response.each do |course_temp|
      expect(course_temp['data']['lessonCurrent']).to eq ''
      expect(course_temp['data']['lessonsPassed'].count).to eq 0
      expect(course_temp['data']['userInside']).to eq false
      expect(course_temp['data']['userFinished']).to eq false
    end

    # Użytkownik
    session[:user_id] = @user.id.to_s
    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['data']['lessonCurrent']).to eq lessons[0].id.to_s
    expect(json_response['data']['lessonsPassed'].count).to eq 0
    expect(json_response['data']['userInside']).to eq true
    expect(json_response['data']['userFinished']).to eq false

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    json_response.each do |course_temp|
      expect(course_temp['data']['lessonCurrent']).to eq lessons[0].id.to_s
      expect(course_temp['data']['lessonsPassed'].count).to eq 0
      expect(course_temp['data']['userInside']).to eq true
      expect(course_temp['data']['userFinished']).to eq false
    end

    # Użytkownik z zaliczonymi lekcjami
    user_course.lessons << lessons[0].id.to_s
    user_course.save!

    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['data']['lessonCurrent']).to eq lessons[1].id.to_s
    expect(json_response['data']['lessonsPassed'].count).to eq 1
    expect(json_response['data']['userInside']).to eq true
    expect(json_response['data']['userFinished']).to eq false

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    json_response.each do |course_temp|
      expect(course_temp['data']['lessonCurrent']).to eq lessons[1].id.to_s
      expect(course_temp['data']['lessonsPassed'].count).to eq 1
      expect(course_temp['data']['userInside']).to eq true
      expect(course_temp['data']['userFinished']).to eq false
    end

    user_course.lessons << lessons[1].id.to_s
    user_course.save!

    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['data']['lessonCurrent']).to eq lessons[2].id.to_s
    expect(json_response['data']['lessonsPassed'].count).to eq 2
    expect(json_response['data']['userInside']).to eq true
    expect(json_response['data']['userFinished']).to eq false

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    json_response.each do |course_temp|
      expect(course_temp['data']['lessonCurrent']).to eq lessons[2].id.to_s
      expect(course_temp['data']['lessonsPassed'].count).to eq 2
      expect(course_temp['data']['userInside']).to eq true
      expect(course_temp['data']['userFinished']).to eq false
    end

    user_course.lessons << lessons[2].id.to_s
    user_course.save!

    get :show, format: :json, id: course.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['data']['lessonCurrent']).to eq lessons[2].id.to_s
    expect(json_response['data']['lessonsPassed'].count).to eq 3
    expect(json_response['data']['userInside']).to eq true
    expect(json_response['data']['userFinished']).to eq true

    get :index, format: :json
    expect(response).to be_success
    json_response = JSON.parse response.body
    json_response.each do |course_temp|
      expect(course_temp['data']['lessonCurrent']).to eq lessons[2].id.to_s
      expect(course_temp['data']['lessonsPassed'].count).to eq 3
      expect(course_temp['data']['userInside']).to eq true
      expect(course_temp['data']['userFinished']).to eq true
    end
  end
end
