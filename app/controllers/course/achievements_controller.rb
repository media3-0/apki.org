class Course::AchievementsController < ApplicationController
  before_action :set_course_achievement, only: [:show, :edit, :update, :destroy]

  # GET /course/achievements
  # GET /course/achievements.json
  def index
    @course_achievements = Course::Achievement.all
  end

  # GET /course/achievements/1
  # GET /course/achievements/1.json
  def show
  end

  # GET /course/achievements/new
  def new
    @course_achievement = Course::Achievement.new
  end

  # GET /course/achievements/1/edit
  def edit
  end

  # POST /course/achievements
  # POST /course/achievements.json
  def create
    @course_achievement = Course::Achievement.new(course_achievement_params)

    respond_to do |format|
      if @course_achievement.save
        format.html { redirect_to @course_achievement, notice: 'Achievement was successfully created.' }
        format.json { render :show, status: :created, location: @course_achievement }
      else
        format.html { render :new }
        format.json { render json: @course_achievement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course/achievements/1
  # PATCH/PUT /course/achievements/1.json
  def update
    respond_to do |format|
      if @course_achievement.update(course_achievement_params)
        format.html { redirect_to @course_achievement, notice: 'Achievement was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_achievement }
      else
        format.html { render :edit }
        format.json { render json: @course_achievement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course/achievements/1
  # DELETE /course/achievements/1.json
  def destroy
    @course_achievement.destroy
    respond_to do |format|
      format.html { redirect_to course_achievements_url, notice: 'Achievement was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course_achievement
      @course_achievement = Course::Achievement.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_achievement_params
      params.require(:course_achievement).permit(:data)
    end
end
