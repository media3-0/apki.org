module Course
  class ExercisesController < CourseAdminController
    before_action :check_lesson_id, only: [:index, :create]
    before_action :set_course_exercise, only: [:show, :update, :destroy]

    # GET /course/exercises.json
    def index
      lesson = Course::Lesson.find(params[:lesson_id])
      @course_exercises = lesson.course_exercises.sort_by(&:created_at)
      if !current_user || (current_user && !current_user.is_admin?)
        @course_exercises.each do |exercise|
          exercise.data.delete('expected_result_expr')
          exercise.data.delete('code_before')
          exercise.data.delete('code_after')
        end
      end

      query = Course::UserCourse.where(course_course_datum: lesson.course_course_datum, user: current_user)

      if current_user && query.exists?
        user_course = query.first
        json_response = {} # mock only
        Course::CourseChecker.check_lesson user_course, lesson, json_response
      end
    end

    # GET /course/exercises/1.json
    def show
      if !current_user || (current_user && !current_user.is_admin?)
        @course_exercise.data.delete('expected_result_expr')
        @course_exercise.data.delete('code_before')
        @course_exercise.data.delete('code_after')
      end
    end

    # POST /course/exercises.json
    def create
      lesson = Course::Lesson.find(params[:lesson_id])
      @course_exercise = Course::Exercise.new
      lesson.course_exercises << @course_exercise

      respond_to do |format|
        if @course_exercise.save
          format.json { render :show, status: :created, location: @course_exercise }
        else
          format.json { render json: @course_exercise.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /course/exercises/1.json
    def update
      @course_exercise[:data] = @course_exercise.data.merge(JSON.parse(request.body.read))
      respond_to do |format|
        if @course_exercise.save
          format.json { render :show, status: :ok, location: @course_exercise }
        else
          format.json { render json: @course_exercise.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /course/exercises/1.json
    def destroy
      @course_exercise.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private

    def set_course_exercise
      @course_exercise = Course::Exercise.find(params[:id])
    end

    def check_lesson_id
      if !params.key?(:lesson_id) || (params.key?(:lesson_id) && !Course::Lesson.where(id: params[:lesson_id]).exists?)
        fail Exceptions::NotFound
      end
    end
  end
end
