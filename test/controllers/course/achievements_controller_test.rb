require 'test_helper'

class Course::AchievementsControllerTest < ActionController::TestCase
  setup do
    @course_achievement = course_achievements(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:course_achievements)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course_achievement" do
    assert_difference('Course::Achievement.count') do
      post :create, course_achievement: { data: @course_achievement.data }
    end

    assert_redirected_to course_achievement_path(assigns(:course_achievement))
  end

  test "should show course_achievement" do
    get :show, id: @course_achievement
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course_achievement
    assert_response :success
  end

  test "should update course_achievement" do
    patch :update, id: @course_achievement, course_achievement: { data: @course_achievement.data }
    assert_redirected_to course_achievement_path(assigns(:course_achievement))
  end

  test "should destroy course_achievement" do
    assert_difference('Course::Achievement.count', -1) do
      delete :destroy, id: @course_achievement
    end

    assert_redirected_to course_achievements_path
  end
end
