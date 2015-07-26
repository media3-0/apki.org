class AdminPanelController < ApplicationController
  before_action :is_logged_in
  before_action :is_admin

  def panel
  end
  def panel_list
  end
end