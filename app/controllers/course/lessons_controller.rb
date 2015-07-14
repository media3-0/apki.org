module Course
  class LessonsController < CourseAdminController
    before_action :check_course_id, only: [:index, :create]
    before_action :set_course_lesson, only: [:show, :update, :destroy]

    # GET /course/lessons.json
    def index
      @course_lessons = Course::CourseDatum.find(params[:course_id]).course_lessons
    end

    # GET /course/lessons/1.json
    def show
    end

    # POST /course/lessons.json
    def create
      course = Course::CourseDatum.find(params[:course_id])
      @course_lesson = Course::Lesson.new
      course.course_lessons << @course_lesson

      respond_to do |format|
        if @course_lesson.save
          format.json { render :show, status: :created, location: @course_lesson }
        else
          format.json { render json: @course_lesson.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /course/lessons/1.json
    def update
      @course_lesson[:data] = @course_lesson.data.merge(JSON.parse(request.body.read))
      respond_to do |format|
        if @course_lesson.save
          format.json { render :show, status: :ok, location: @course_lesson }
        else
          format.json { render json: @course_lesson.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /course/lessons/1.json
    def destroy
      @course_lesson.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private
    def set_course_lesson
      @course_lesson = Course::Lesson.find(params[:id])
    end

    def check_course_id
      if !params.has_key?(:course_id) or (params.has_key?(:course_id) and !Course::CourseDatum.where(id: params[:course_id]).exists?)
        raise Exceptions::NotFound
      end
    end
  end
end