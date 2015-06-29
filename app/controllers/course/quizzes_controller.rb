class Course::QuizzesController < ApplicationController
  before_action :set_course_quiz, only: [:show, :edit, :update, :destroy]

  # GET /course/quizzes
  # GET /course/quizzes.json
  def index
    @course_quizzes = Course::Quiz.all
  end

  # GET /course/quizzes/1
  # GET /course/quizzes/1.json
  def show
  end

  # GET /course/quizzes/new
  def new
    @course_quiz = Course::Quiz.new
  end

  # GET /course/quizzes/1/edit
  def edit
  end

  # POST /course/quizzes
  # POST /course/quizzes.json
  def create
    @course_quiz = Course::Quiz.new(course_quiz_params)

    respond_to do |format|
      if @course_quiz.save
        format.html { redirect_to @course_quiz, notice: 'Quiz was successfully created.' }
        format.json { render :show, status: :created, location: @course_quiz }
      else
        format.html { render :new }
        format.json { render json: @course_quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course/quizzes/1
  # PATCH/PUT /course/quizzes/1.json
  def update
    respond_to do |format|
      if @course_quiz.update(course_quiz_params)
        format.html { redirect_to @course_quiz, notice: 'Quiz was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_quiz }
      else
        format.html { render :edit }
        format.json { render json: @course_quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course/quizzes/1
  # DELETE /course/quizzes/1.json
  def destroy
    @course_quiz.destroy
    respond_to do |format|
      format.html { redirect_to course_quizzes_url, notice: 'Quiz was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course_quiz
      @course_quiz = Course::Quiz.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_quiz_params
      params.require(:course_quiz).permit(:data)
    end
end
