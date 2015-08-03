require 'rails_helper'

describe Course::AchievementsController, type: :controller do
  render_views

  before(:all) do
    @admin = User.create!(nickname: 'test_admin', uid: 'asdf', account_type: :admin)
    @user = User.create!(nickname: 'test_student', uid: 'zxcv', account_type: :student)
    @teacher = User.create!(nickname: 'test_teacher', uid: 'zxcv', account_type: :teacher)

    @data = { 'test' => 'data' }
  end

  after(:each) do
    Course::Lesson.destroy_all
    Course::Achievement.destroy_all
    Course::Quiz.destroy_all
    Course::Exercise.destroy_all
  end

  after(:all) do
    User.destroy_all
  end

  it 'Admin can create new achievement' do
    session[:user_id] = @admin.id.to_s

    lesson = Course::Lesson.create!

    post :create, format: :json, lesson_id: lesson.id.to_s
    expect(response).to be_success
    expect(Course::Achievement.count).to be > 0

    achievement = Course::Achievement.all.first
    expect(achievement).to be_valid
    Course::Achievement.destroy_all

    exercise = Course::Exercise.create!

    post :create, format: :json, exercise_id: exercise.id.to_s
    expect(response).to be_success
    expect(Course::Achievement.count).to be > 0

    achievement = Course::Achievement.all.first
    expect(achievement).to be_valid
    Course::Achievement.destroy_all
  end

  it 'User or teacher cannot create new achievement' do
    session[:user_id] = @user.id.to_s

    lesson = Course::Lesson.create!

    post :create, format: :json, lesson_id: lesson.id.to_s
    expect(response.status).to eq 401
    expect(Course::Achievement.count).to eq 0

    session[:user_id] = @teacher.id.to_s

    post :create, format: :json, lesson_id: lesson.id.to_s
    expect(response.status).to eq 401
    expect(Course::Achievement.count).to eq 0
  end

  it 'New achievement cannot be created without any id (or bad one)' do
    session[:user_id] = @admin.id.to_s

    post :create, format: :json
    expect(response.status).to eq 404
    expect(Course::Achievement.count).to eq 0

    post :create, format: :json, lesson_id: 'bad_id'
    expect(response.status).to eq 404
    expect(Course::Achievement.count).to eq 0

    post :create, format: :json, exercise_id: 'bad_id'
    expect(response.status).to eq 404
    expect(Course::Achievement.count).to eq 0
  end

  it 'Admin can update achievement' do
    session[:user_id] = @admin.id.to_s

    achievement = Course::Achievement.create!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, format: :json, id: achievement.id.to_s
    expect(response).to be_success

    achievement.reload

    expect(achievement.data).to eq @data
  end

  it 'User or teacher cannot update achievement' do
    session[:user_id] = @user.id.to_s

    achievement = Course::Achievement.create!

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, format: :json, id: achievement.id.to_s
    expect(response.status).to eq 401

    session[:user_id] = @teacher.id.to_s

    request.env['RAW_POST_DATA'] = @data.to_json

    patch :update, format: :json, id: achievement.id.to_s
    expect(response.status).to eq 401
  end

  it 'Admin can destroy achievement' do
    session[:user_id] = @admin.id.to_s

    achievement = Course::Achievement.create!

    delete :destroy, format: :json, id: achievement.id.to_s
    expect(response).to be_success
    expect(Course::Achievement.where(id: achievement.id.to_s).exists?).to eq false
  end

  it 'User or Teacher cannot destroy achievement' do
    session[:user_id] = @user.id.to_s

    achievement = Course::Achievement.create!

    delete :destroy, format: :json, id: achievement.id.to_s
    expect(response.status).to eq 401
    expect(Course::Achievement.where(id: achievement.id.to_s).exists?).to eq true

    session[:user_id] = @teacher.id.to_s
    delete :destroy, format: :json, id: achievement.id.to_s
    expect(response.status).to eq 401
    expect(Course::Achievement.where(id: achievement.id.to_s).exists?).to eq true
  end

  it 'Everybody can show single achievement' do
    achievement = Course::Achievement.create!(data: @data)

    get :show, format: :json, id: achievement.id.to_s
    expect(response).to be_success
    json_response = JSON.parse response.body
    expect(json_response['id']['$oid']).to eq achievement.id.to_s
    expect(json_response['data']).to eq @data
  end

  it 'Everybody can list all achievements' do
    # TODO : List achievements tests
  end

  it 'Not logged user cannot access to POST achievements' do
    post :create, format: :json
    expect(response.status).to eq 401
    patch :update, format: :json, id: 'asdf'
    expect(response.status).to eq 401
    delete :destroy, format: :json, id: 'asdf'
    expect(response.status).to eq 401
  end
end
