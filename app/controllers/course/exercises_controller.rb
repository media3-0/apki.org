class Course::ExercisesController < ApplicationController
  #before_action :is_admin, except: [:index, :show]  # TODO : Włączyć po testach

  before_action :set_course_exercise, only: [:show, :update, :destroy]

  # GET /course/exercises.json
  def index
    unless params.has_key?(:lesson_id)
      respond_to do |format|
        format.json { render json: {}, status: :not_found}
      end
    end
    @course_exercises = Course::Lesson.find(params[:lesson_id]).course_exercises
  end

  # GET /course/exercises/1.json
  def show
  end

  # POST /course/exercises.json
  def create
    if !params.has_key?(:lesson_id) or (params.has_key?(:lesson_id) and !Course::Lesson.where(id: params[:lesson_id]).exists?)
      respond_to do |format|
        format.json { render json: {}, status: :not_found}
      end
      return
    end

    lesson = Course::Lesson.find(params[:lesson_id])
    @course_exercise = Course::Exercise.new
    @course_exercise.data = {}
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
    @course_exercise[:data] = @course_exercise.data(true).merge(JSON.parse(request.body.read))
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
    # Use callbacks to share common setup or constraints between actions.
    def set_course_exercise
      @course_exercise = Course::Exercise.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_exercise_params
      params.require(:course_exercise).permit(:data)
    end
end
