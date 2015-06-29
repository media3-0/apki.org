require 'test_helper'

class Course::CourseDataControllerTest < ActionController::TestCase
  setup do
    @course_course_datum = course_course_data(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:course_course_data)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course_course_datum" do
    assert_difference('Course::CourseDatum.count') do
      post :create, course_course_datum: { data: @course_course_datum.data }
    end

    assert_redirected_to course_course_datum_path(assigns(:course_course_datum))
  end

  test "should show course_course_datum" do
    get :show, id: @course_course_datum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course_course_datum
    assert_response :success
  end

  test "should update course_course_datum" do
    patch :update, id: @course_course_datum, course_course_datum: { data: @course_course_datum.data }
    assert_redirected_to course_course_datum_path(assigns(:course_course_datum))
  end

  test "should destroy course_course_datum" do
    assert_difference('Course::CourseDatum.count', -1) do
      delete :destroy, id: @course_course_datum
    end

    assert_redirected_to course_course_data_path
  end
end
