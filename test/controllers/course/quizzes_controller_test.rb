require 'test_helper'

class Course::QuizzesControllerTest < ActionController::TestCase
  setup do
    @course_quiz = course_quizzes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:course_quizzes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course_quiz" do
    assert_difference('Course::Quiz.count') do
      post :create, course_quiz: { data: @course_quiz.data }
    end

    assert_redirected_to course_quiz_path(assigns(:course_quiz))
  end

  test "should show course_quiz" do
    get :show, id: @course_quiz
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course_quiz
    assert_response :success
  end

  test "should update course_quiz" do
    patch :update, id: @course_quiz, course_quiz: { data: @course_quiz.data }
    assert_redirected_to course_quiz_path(assigns(:course_quiz))
  end

  test "should destroy course_quiz" do
    assert_difference('Course::Quiz.count', -1) do
      delete :destroy, id: @course_quiz
    end

    assert_redirected_to course_quizzes_path
  end
end
