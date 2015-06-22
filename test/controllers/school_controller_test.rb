require 'test_helper'

class SchoolControllerTest < ActionController::TestCase
  test "should get profile" do
    get :profile
    assert_response :success
  end

  test "should get edit_profile" do
    get :edit_profile
    assert_response :success
  end

end
