require 'rails_helper'
require 'spec_helper'

describe Course::CourseDataController, type: :controller do
  before(:each) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zcv', account_type: :student)
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
    expect(response.status).to eq 302
    expect(flash[:error]).to be_present

    expect(Course::CourseDatum.count).to eq 0
  end

  it 'Admin can update course' do

  end

  it 'Admin can destroy course' do

  end

  it 'Can show single course' do

  end

  it 'Can list all courses' do

  end
end