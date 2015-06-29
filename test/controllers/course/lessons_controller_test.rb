require 'test_helper'

class Course::LessonsControllerTest < ActionController::TestCase
  setup do
    @course_lesson = course_lessons(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:course_lessons)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course_lesson" do
    assert_difference('Course::Lesson.count') do
      post :create, course_lesson: { data: @course_lesson.data }
    end

    assert_redirected_to course_lesson_path(assigns(:course_lesson))
  end

  test "should show course_lesson" do
    get :show, id: @course_lesson
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course_lesson
    assert_response :success
  end

  test "should update course_lesson" do
    patch :update, id: @course_lesson, course_lesson: { data: @course_lesson.data }
    assert_redirected_to course_lesson_path(assigns(:course_lesson))
  end

  test "should destroy course_lesson" do
    assert_difference('Course::Lesson.count', -1) do
      delete :destroy, id: @course_lesson
    end

    assert_redirected_to course_lessons_path
  end
end
