require 'rails_helper'

describe Course::LessonsController, type: :controller do
  render_views

  before(:all) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = { 'test' => 'data'}
  end

  after(:each) do
    Course::CourseDatum.destroy_all
    Course::Lesson.destroy_all
  end

  after(:all) do
    User.destroy_all
  end

  it 'Admin can create new lesson' do
    session[:user_id] = @admin.id.to_s

    course = Course::CourseDatum.create!

    post :create, { format: :json, course_id: course.id.to_s }
    expect(response).to be_success

    expect(Course::Lesson.count).to be > 0

    lesson = Course::Lesson.all.first
    expect(lesson).to be_valid
  end

  it 'User or teacher cannot create new lesson' do
    session[:user_id] = @user.id.to_s

    course = Course::CourseDatum.create!

    post :create, { format: :json, course_id: course.id.to_s }
    expect(response.status).to eq 401

    expect(Course::Lesson.count).to eq 0

    session[:user_id] = @teacher.id.to_s

    post :create, { format: :json, course_id: course.id.to_s }
    expect(response.status).to eq 401

    expect(Course::Lesson.count).to eq 0
  end

  it 'New lesson cannot be created without course_id (or bad one)' do
    session[:user_id] = @admin.id.to_s

    post :create, { format: :json }
    expect(response.status).to eq 404

    expect(Course::Lesson.count).to eq 0

    post :create, { format: :json, course_id: 'bad_id' }
    expect(response.status).to eq 404

    expect(Course::Lesson.count).to eq 0
  end

  it 'Admin can update lesson' do
    session[:user_id] = @admin.id.to_s

    lesson = Course::Lesson.create!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: lesson.id.to_s }
    expect(response).to be_success

    lesson.reload

    expect(lesson.data).to eq @data
  end

  it 'User or teacher cannot update lesson' do
    session[:user_id] = @user.id.to_s

    lesson = Course::Lesson.create!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: lesson.id.to_s }
    expect(response.status).to eq 401

    session[:user_id] = @teacher.id.to_s

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: lesson.id.to_s }
    expect(response.status).to eq 401
  end

  it 'Admin can destroy lesson' do
    session[:user_id] = @admin.id.to_s

    lesson = Course::Lesson.create!

    delete :destroy, { format: :json, id: lesson.id.to_s }
    expect(response).to be_success
    expect(Course::Lesson.where(id: lesson.id.to_s).exists?).to eq false
  end

  it 'User or Teacher cannot destroy lesson' do
    session[:user_id] = @user.id.to_s

    lesson = Course::Lesson.create!

    delete :destroy, { format: :json, id: lesson.id.to_s }
    expect(response.status).to eq 401
    expect(Course::Lesson.where(id: lesson.id.to_s).exists?).to eq true

    session[:user_id] = @teacher.id.to_s
    delete :destroy, { format: :json, id: lesson.id.to_s }
    expect(response.status).to eq 401
    expect(Course::Lesson.where(id: lesson.id.to_s).exists?).to eq true
  end

  it 'Everybody can show single lesson' do
    lesson = Course::Lesson.create!(data: @data)

    get :show, { format: :json, id: lesson.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq lesson.id.to_s
    expect(json_response['data']).to eq @data
  end

  it 'Everybody can list all lessons' do
    course = Course::CourseDatum.create!(data: @data)
    3.times do
      Course::Lesson.create!(data: @data, course_course_datum: course)
    end

    get :index, { format: :json, course_id: course.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3

    session[:user_id] = @user.id.to_s
    get :index, { format: :json, course_id: course.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3

    session[:user_id] = @teacher.id.to_s
    get :index, { format: :json, course_id: course.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3
  end

  it 'Cannot list all lessons without course_id (or with bad one)' do
    course = Course::CourseDatum.create!(data: @data)
    3.times do
      Course::Lesson.create!(data: @data, course_course_datum: course)
    end

    get :index, { format: :json }
    expect(response.status).to eq 404

    get :index, { format: :json, course_id: 'bad_id' }
    expect(response.status).to eq 404
  end

  it 'Not logged user cannot access to POST lessons' do
    post :create, { format: :json }
    expect(response.status).to eq 401
    patch :update, { format: :json, id: 'asdf' }
    expect(response.status).to eq 401
    delete :destroy, { format: :json, id: 'asdf' }
    expect(response.status).to eq 401
  end
end