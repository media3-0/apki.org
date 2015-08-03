module Course
  class QuizzesController < CourseAdminController
    before_action :check_lesson_id, only: [:index, :create]
    before_action :set_course_quiz, only: [:show, :update, :destroy]

    # GET /course/quizzes.json
    def index
      @course_quizzes = Course::Lesson.find(params[:lesson_id]).course_quizs
    end

    # GET /course/quizzes/1.json
    def show
    end

    # POST /course/quizzes.json
    def create
      lesson = Course::Lesson.find(params[:lesson_id])
      @course_quiz = Course::Quiz.new
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

    def set_course_quiz
      @course_quiz = Course::Quiz.find(params[:id])
    end

    def check_lesson_id
      if !params.key?(:lesson_id) || (params.key?(:lesson_id) && !Course::Lesson.where(id: params[:lesson_id]).exists?)
        fail Exceptions::NotFound
      end
    end
  end
end
