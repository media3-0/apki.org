class Course::ExercisesController < ApplicationController
  before_action :set_course_exercise, only: [:show, :edit, :update, :destroy]

  # GET /course/exercises
  # GET /course/exercises.json
  def index
    @course_exercises = Course::Exercise.all
  end

  # GET /course/exercises/1
  # GET /course/exercises/1.json
  def show
  end

  # GET /course/exercises/new
  def new
    @course_exercise = Course::Exercise.new
  end

  # GET /course/exercises/1/edit
  def edit
  end

  # POST /course/exercises
  # POST /course/exercises.json
  def create
    @course_exercise = Course::Exercise.new(course_exercise_params)

    respond_to do |format|
      if @course_exercise.save
        format.html { redirect_to @course_exercise, notice: 'Exercise was successfully created.' }
        format.json { render :show, status: :created, location: @course_exercise }
      else
        format.html { render :new }
        format.json { render json: @course_exercise.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course/exercises/1
  # PATCH/PUT /course/exercises/1.json
  def update
    respond_to do |format|
      if @course_exercise.update(course_exercise_params)
        format.html { redirect_to @course_exercise, notice: 'Exercise was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_exercise }
      else
        format.html { render :edit }
        format.json { render json: @course_exercise.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course/exercises/1
  # DELETE /course/exercises/1.json
  def destroy
    @course_exercise.destroy
    respond_to do |format|
      format.html { redirect_to course_exercises_url, notice: 'Exercise was successfully destroyed.' }
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
