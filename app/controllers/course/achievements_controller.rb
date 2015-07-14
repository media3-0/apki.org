module Course
  class AchievementsController < CourseAdminController
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
      unless check_achievement_type
        raise Exceptions::NotFound
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
      @course_achievement[:data] = @course_achievement.data.merge(JSON.parse(request.body.read))
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
    def set_course_achievement
      @course_achievement = Course::Achievement.find(params[:id])
    end

    def check_achievement_type
      id_present = false
      @course_achievement = Course::Achievement.new

      if params.has_key?(:lesson_id) and Course::Lesson.where(id: params[:lesson_id]).exists?
        id_present = true
        @course_achievement.lesson_id = params[:lesson_id]
      end
      if !id_present and params.has_key?(:exercise_id) and Course::Exercise.where(id: params[:exercise_id]).exists?
        id_present = true
        @course_achievement.exercise_id = params[:exercise_id]
      end
      id_present
    end
  end
end