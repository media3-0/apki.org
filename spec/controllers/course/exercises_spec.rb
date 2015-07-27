require 'rails_helper'

describe Course::ExercisesController, type: :controller do
  render_views

  before(:all) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = { 'test' => 'data'}
  end

  before(:each) do
    @course = Course::CourseDatum.create!
    @lesson = Course::Lesson.create!(course_course_datum: @course)
  end

  after(:each) do
    Course::Lesson.destroy_all
    Course::Exercise.destroy_all
  end

  after(:all) do
    User.destroy_all
  end

  it 'Admin can create new exercise' do
    session[:user_id] = @admin.id.to_s

    post :create, { format: :json, lesson_id: @lesson.id.to_s }
    expect(response).to be_success

    expect(Course::Exercise.count).to be > 0

    exercise = Course::Exercise.all.first
    expect(exercise).to be_valid
  end

  it 'User or teacher cannot create new exercise' do
    session[:user_id] = @user.id.to_s

    post :create, { format: :json, lesson_id: @lesson.id.to_s }
    expect(response.status).to eq 401

    expect(Course::Exercise.count).to eq 0

    session[:user_id] = @teacher.id.to_s

    post :create, { format: :json, lesson_id: @lesson.id.to_s }
    expect(response.status).to eq 401

    expect(Course::Exercise.count).to eq 0
  end

  it 'New exercise cannot be created without lesson_id (or bad one)' do
    session[:user_id] = @admin.id.to_s

    post :create, { format: :json }
    expect(response.status).to eq 404

    expect(Course::Exercise.count).to eq 0

    post :create, { format: :json, lesson_id: 'bad_id' }
    expect(response.status).to eq 404

    expect(Course::Exercise.count).to eq 0
  end

  it 'Admin can update exercise' do
    session[:user_id] = @admin.id.to_s

    exercise = Course::Exercise.create!(course_lesson: @lesson)

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: exercise.id.to_s }
    expect(response).to be_success

    exercise.reload

    expect(exercise.data).to eq @data
  end

  it 'User or teacher cannot update exercise' do
    session[:user_id] = @user.id.to_s

    exercise = Course::Exercise.create!(course_lesson: @lesson)

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: exercise.id.to_s }
    expect(response.status).to eq 401

    session[:user_id] = @teacher.id.to_s

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: exercise.id.to_s }
    expect(response.status).to eq 401
  end

  it 'Admin can destroy exercise' do
    session[:user_id] = @admin.id.to_s

    exercise = Course::Exercise.create!(course_lesson: @lesson)

    delete :destroy, { format: :json, id: exercise.id.to_s }
    expect(response).to be_success
    expect(Course::Exercise.where(id: exercise.id.to_s).exists?).to eq false
  end

  it 'User or Teacher cannot destroy exercise' do
    session[:user_id] = @user.id.to_s

    exercise = Course::Exercise.create!(course_lesson: @lesson)

    delete :destroy, { format: :json, id: exercise.id.to_s }
    expect(response.status).to eq 401
    expect(Course::Exercise.where(id: exercise.id.to_s).exists?).to eq true

    session[:user_id] = @teacher.id.to_s
    delete :destroy, { format: :json, id: exercise.id.to_s }
    expect(response.status).to eq 401
    expect(Course::Exercise.where(id: exercise.id.to_s).exists?).to eq true
  end

  it 'Everybody can show single exercise' do
    exercise = Course::Exercise.create!(data: @data, course_lesson: @lesson)

    get :show, { format: :json, id: exercise.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq exercise.id.to_s
    expect(json_response['data']).to eq @data
  end

  it 'Everybody can list all exercises' do
    lesson = Course::Lesson.create!(data: @data, course_course_datum: @course)
    3.times do
      Course::Exercise.create!(data: @data, course_lesson: lesson)
    end

    get :index, { format: :json, lesson_id: lesson.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3

    session[:user_id] = @user.id.to_s
    get :index, { format: :json, lesson_id: lesson.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3

    session[:user_id] = @teacher.id.to_s
    get :index, { format: :json, lesson_id: lesson.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3
  end

  it 'Cannot list all exercises without lesson_id (or with bad one)' do
    lesson = Course::Lesson.create!(data: @data, course_course_datum: @course)
    3.times do
      Course::Exercise.create!(data: @data, course_lesson: lesson)
    end

    get :index, { format: :json }
    expect(response.status).to eq 404

    get :index, { format: :json, lesson_id: 'bad_id' }
    expect(response.status).to eq 404
  end

  it 'Not logged user cannot access to POST exercises' do
    post :create, { format: :json }
    expect(response.status).to eq 401
    patch :update, { format: :json, id: 'asdf' }
    expect(response.status).to eq 401
    delete :destroy, { format: :json, id: 'asdf' }
    expect(response.status).to eq 401
  end
end