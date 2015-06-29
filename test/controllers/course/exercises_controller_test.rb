require 'test_helper'

class Course::ExercisesControllerTest < ActionController::TestCase
  setup do
    @course_exercise = course_exercises(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:course_exercises)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course_exercise" do
    assert_difference('Course::Exercise.count') do
      post :create, course_exercise: { data: @course_exercise.data }
    end

    assert_redirected_to course_exercise_path(assigns(:course_exercise))
  end

  test "should show course_exercise" do
    get :show, id: @course_exercise
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course_exercise
    assert_response :success
  end

  test "should update course_exercise" do
    patch :update, id: @course_exercise, course_exercise: { data: @course_exercise.data }
    assert_redirected_to course_exercise_path(assigns(:course_exercise))
  end

  test "should destroy course_exercise" do
    assert_difference('Course::Exercise.count', -1) do
      delete :destroy, id: @course_exercise
    end

    assert_redirected_to course_exercises_path
  end
end
