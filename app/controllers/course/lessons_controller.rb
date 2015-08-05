module Course
  class LessonsController < CourseAdminController
    before_action :check_course_id, only: [:index, :create]
    before_action :set_course_lesson, only: [:show, :update, :destroy]

    # GET /course/lessons.json
    def index
      course_lessons = Course::CourseDatum.get_lessons_by_course_id params[:course_id]
      course_lessons_hashes = []
      course_lessons.each do |lesson|
        course_lessons_hashes << object_to_json(lesson)
      end
      render json: course_lessons_hashes
    end

    # GET /course/lessons/1.json
    def show

      render json: object_to_json(@course_lesson)
    end

    # POST /course/lessons.json
    def create
      course = Course::CourseDatum.find(params[:course_id])
      @course_lesson = Course::Lesson.new
      course.course_lessons << @course_lesson

      respond_to do |format|
        if @course_lesson.save
          format.json { render json:  object_to_json(@course_lesson), status: :created, location: @course_lesson }
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
          format.json { render json: object_to_json(@course_lesson), status: :ok, location: @course_lesson }
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
      if !params.key?(:course_id) || (params.key?(:course_id) && !Course::CourseDatum.where(id: params[:course_id]).exists?)
        fail Exceptions::NotFound
      end
    end

    def object_to_json(lesson)
      course_lesson_hash = lesson.attributes
      course_lesson_hash['id'] = course_lesson_hash['_id']
      course_lesson_hash['parent_id'] = lesson.parent_id
      exercises_passed = []
      query = Course::UserCourse.where(course_course_datum: lesson.course_course_datum, user: current_user)
      if current_user && query.exists?
        query.first.exercises.each_key do |key|
          exercises_passed << key
        end
      end
      course_lesson_hash['data']['exercisesPassed'] = exercises_passed
      course_lesson_hash
    end
  end
end
