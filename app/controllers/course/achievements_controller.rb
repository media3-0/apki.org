class Course::AchievementsController < ApplicationController
  #before_action :is_admin, except: [:index, :show]  # TODO : Włączyć po testach

  before_action :set_course_achievement, only: [:show, :update, :destroy]

  # GET /course/achievements.json
  def index
    @course_achievements = Course::Achievement.all
  end

  # GET /course/achievements/1.json
  def show
  end

  # POST /course/achievements.json
  def create
    id_present = false

    @course_achievement = Course::Achievement.new
    @course_achievement.data = {}

    if params.has_key?(:lesson_id) and Course::Lesson.where(id: params[:lesson_id]).exists?
      id_present = true
      @course_achievement.lesson_id = params[:lesson_id]
    end
    if !id_present and params.has_key?(:exercise_id) and Course::Exercise.where(id: params[:exercise_id]).exists?
      id_present = true
      @course_achievement.exercise_id = params[:exercise_id]
    end
    if !id_present and params.has_key?(:quiz_id) and Course::Quiz.where(id: params[:quiz_id]).exists?
      id_present = true
      @course_achievement.quiz_id = params[:quiz_id]
    end

    unless id_present
      respond_to do |format|
        format.json { render json: {}, status: :not_found }
      end
      return
    end

    respond_to do |format|
      if @course_achievement.save
        format.json { render :show, status: :created, location: @course_achievement }
      else
        format.json { render json: @course_achievement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course/achievements/1.json
  def update
    @course_achievement[:data] = @course_achievement.data(true).merge(JSON.parse(request.body.read))
    respond_to do |format|
      if @course_achievement.save
        format.json { render :show, status: :ok, location: @course_achievement }
      else
        format.json { render json: @course_achievement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course/achievements/1.json
  def destroy
    @course_achievement.destroy
    respond_to do |format|
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
