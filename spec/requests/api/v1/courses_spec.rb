require 'rails_helper'
require 'spec_helper'

describe Course::CourseDataController, type: :controller do
  render_views

  before(:each) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = { 'YOLO' => 'SWAG'}
  end

  after(:each) do
    @admin.destroy!
    @user.destroy!

    Course::CourseDatum.destroy_all
  end

  it 'Admin can create new course' do
    session[:user_id] = @admin.id.to_s

    post :create, format: :json
    expect(response).to be_success

    expect(Course::CourseDatum.count).to be > 0

    course = Course::CourseDatum.all.first
    expect(course).to be_valid
  end

  it 'User cannot create new course' do
    session[:user_id] = @user.id.to_s

    post :create, format: :json
    expect(response.status).to eq 401

    expect(Course::CourseDatum.count).to eq 0
  end

  it 'Teacher cannot create new course' do
    session[:user_id] = @teacher.id.to_s

    post :create, format: :json
    expect(response.status).to eq 401

    expect(Course::CourseDatum.count).to eq 0
  end

  it 'Admin can update course' do
    session[:user_id] = @admin.id.to_s

    @course = Course::CourseDatum.new
    @course.data = {}
    @course.save!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: @course.id.to_s }
    expect(response).to be_success

    @course.reload

    expect(@course.data).to eq @data
  end

  it 'User cannot update course' do
    session[:user_id] = @user.id.to_s

    @course = Course::CourseDatum.new
    @course.data = {}
    @course.save!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: @course.id.to_s }
    expect(response.status).to eq 401
  end

  it 'Teacher cannot update course' do
    session[:user_id] = @teacher.id.to_s

    @course = Course::CourseDatum.new
    @course.data = {}
    @course.save!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, { format: :json, id: @course.id.to_s }
    expect(response.status).to eq 401
  end

  it 'Admin can destroy course' do
    session[:user_id] = @admin.id.to_s

    @course = Course::CourseDatum.new
    @course.data = @data
    @course.save!

    delete :destroy, { format: :json, id: @course.id.to_s }
    expect(response).to be_success
    expect(Course::CourseDatum.where(id: @course.id.to_s).exists?).to eq false
  end

  it 'User cannot destroy course' do
    session[:user_id] = @user.id.to_s

    @course = Course::CourseDatum.new
    @course.data = @data
    @course.save!

    delete :destroy, { format: :json, id: @course.id.to_s }
    expect(response.status).to eq 401
    expect(Course::CourseDatum.where(id: @course.id.to_s).exists?).to eq true
  end

  it 'Teacher cannot destroy course' do
    session[:user_id] = @teacher.id.to_s

    @course = Course::CourseDatum.new
    @course.data = @data
    @course.save!

    delete :destroy, { format: :json, id: @course.id.to_s }
    expect(response.status).to eq 401
    expect(Course::CourseDatum.where(id: @course.id.to_s).exists?).to eq true
  end

  it 'Everybody can show single finished course' do
    @course = Course::CourseDatum.new
    @course.data = { 'finished' => true }
    @course.save!

    get :show, { format: :json, id: @course.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq @course.id.to_s
  end

  it 'Only admin can show single unfinished course' do
    @course = Course::CourseDatum.new
    @course.data = { 'finished' => false }
    @course.save!

    get :show, { format: :json, id: @course.id.to_s }
    expect(response.status).to eq 401

    session[:user_id] = @admin.id.to_s
    get :show, { format: :json, id: @course.id.to_s }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq @course.id.to_s
  end

  it 'Admin can list all courses' do
    session[:user_id] = @admin.id.to_s

    3.times do
      @course = Course::CourseDatum.new
      @course.data = @data
      @course.save!
    end

    get :index, { format: :json }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 3
  end

  it 'Everybody can list only finished courses' do

    3.times do
      @course = Course::CourseDatum.new
      @course.data = @data
      @course.save!
    end

    @course = Course::CourseDatum.new
    @course.data = { 'finished' => false }
    @course.save!
    @course = Course::CourseDatum.new
    @course.data = { 'finished' => true }
    @course.save!

    get :index, { format: :json }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 1
  end

  it 'Teacher can list only finished courses' do
    session[:user_id] = @teacher.id.to_s

    3.times do
      @course = Course::CourseDatum.new
      @course.data = @data
      @course.save!
    end

    @course = Course::CourseDatum.new
    @course.data = { 'finished' => false }
    @course.save!
    @course = Course::CourseDatum.new
    @course.data = { 'finished' => true }
    @course.save!

    get :index, { format: :json }
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response.count).to eq 1
  end

  it 'Not logged user cannot access to POST courses' do
    post :create, { format: :json }
    expect(response.status).to eq 401
    patch :update, { format: :json, id: 'asdf' }
    expect(response.status).to eq 401
    delete :destroy, { format: :json, id: 'asdf' }
    expect(response.status).to eq 401
  end
end