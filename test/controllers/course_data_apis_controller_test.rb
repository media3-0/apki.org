require 'test_helper'

class CourseDataApisControllerTest < ActionController::TestCase
  setup do
    @course_data_api = course_data_apis(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:course_data_apis)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course_data_api" do
    assert_difference('CourseDataApi.count') do
      post :create, course_data_api: { description: @course_data_api.description, difficulty: @course_data_api.difficulty, image: @course_data_api.image, name: @course_data_api.name }
    end

    assert_redirected_to course_data_api_path(assigns(:course_data_api))
  end

  test "should show course_data_api" do
    get :show, id: @course_data_api
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course_data_api
    assert_response :success
  end

  test "should update course_data_api" do
    patch :update, id: @course_data_api, course_data_api: { description: @course_data_api.description, difficulty: @course_data_api.difficulty, image: @course_data_api.image, name: @course_data_api.name }
    assert_redirected_to course_data_api_path(assigns(:course_data_api))
  end

  test "should destroy course_data_api" do
    assert_difference('CourseDataApi.count', -1) do
      delete :destroy, id: @course_data_api
    end

    assert_redirected_to course_data_apis_path
  end
end
