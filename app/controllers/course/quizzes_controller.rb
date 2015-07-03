module Course
  class QuizzesController < ApplicationController
    #before_action :is_admin, except: [:index, :show]  # TODO : Włączyć po testach

    before_action :set_course_quiz, only: [:show, :update, :destroy]

    # GET /course/quizzes.json
    def index
      unless params.has_key?(:lesson_id)
        respond_to do |format|
          format.json { render json: {}, status: :not_found }
        end
        return
      end
      @course_quizzes = Course::Lesson.find(params[:lesson_id]).course_quizs
    end

    # GET /course/quizzes/1.json
    def show
    end

    # POST /course/quizzes.json
    def create
      if !params.has_key?(:lesson_id) or (params.has_key?(:lesson_id) and !Course::Lesson.where(id: params[:lesson_id]).exists?)
        respond_to do |format|
          format.json { render json: {}, status: :not_found }
        end
        return
      end

      lesson = Course::Lesson.find(params[:lesson_id])
      @course_quiz = Course::Quiz.new
      @course_quiz.data = {}
      lesson.course_quizs << @course_quiz

      respond_to do |format|
        if @course_quiz.save
          format.json { render :show, status: :created, location: @course_quiz }
        else
          format.json { render json: @course_quiz.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /course/quizzes/1.json
    def update
      @course_quiz[:data] = @course_quiz.data.merge(JSON.parse(request.body.read))
      respond_to do |format|
        if @course_quiz.save
          format.json { render :show, status: :ok, location: @course_quiz }
        else
          format.json { render json: @course_quiz.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /course/quizzes/1.json
    def destroy
      @course_quiz.destroy
      respond_to do |format|
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
end