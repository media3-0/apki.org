class Course::LessonsController < ApplicationController
  before_action :set_course_lesson, only: [:show, :edit, :update, :destroy]

  # GET /course/lessons
  # GET /course/lessons.json
  def index
    @course_lessons = Course::Lesson.all
  end

  # GET /course/lessons/1
  # GET /course/lessons/1.json
  def show
  end

  # GET /course/lessons/new
  def new
    @course_lesson = Course::Lesson.new
  end

  # GET /course/lessons/1/edit
  def edit
  end

  # POST /course/lessons
  # POST /course/lessons.json
  def create
    @course_lesson = Course::Lesson.new(course_lesson_params)

    respond_to do |format|
      if @course_lesson.save
        format.html { redirect_to @course_lesson, notice: 'Lesson was successfully created.' }
        format.json { render :show, status: :created, location: @course_lesson }
      else
        format.html { render :new }
        format.json { render json: @course_lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course/lessons/1
  # PATCH/PUT /course/lessons/1.json
  def update
    respond_to do |format|
      if @course_lesson.update(course_lesson_params)
        format.html { redirect_to @course_lesson, notice: 'Lesson was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_lesson }
      else
        format.html { render :edit }
        format.json { render json: @course_lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course/lessons/1
  # DELETE /course/lessons/1.json
  def destroy
    @course_lesson.destroy
    respond_to do |format|
      format.html { redirect_to course_lessons_url, notice: 'Lesson was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course_lesson
      @course_lesson = Course::Lesson.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_lesson_params
      params.require(:course_lesson).permit(:data)
    end
end
