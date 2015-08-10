module Course
  class CourseDataController < CourseAdminController
    before_action :set_course_course_datum, only: [:show, :update, :destroy]

    # GET /course/course_data.json
    def index
      course_courses_data = Course::CourseDatum.get_list(current_user)
      courses_hashes = []
      course_courses_data.each do |course|
        courses_hashes << object_to_json(course)
      end
      courses_hashes.sort! do |a, b|
        a_weight, b_weight = 0, 0
        a_weight = 1 if a['data']['userInside'] && !a['data']['userFinished']
        a_weight = 0 if !a['data']['userInside'] && !a['data']['userFinished']
        a_weight = -1 if a['data']['ubserInside'] && a['data']['userFinished']

        b_weight = 1 if b['data']['userInside'] && !b['data']['userFinished']
        b_weight = 0 if !b['data']['userInside'] && !b['data']['userFinished']
        b_weight = -1 if b['data']['userInside'] && b['data']['userFinished']

        a_weight <=> b_weight

        # TEST:
        # courses_hashes = []
        #
        # courses_hashes << { data: { userInside: true, userFinished: true }}
        # courses_hashes << { data: { userInside: false, userFinished: false }}
        # courses_hashes << { data: { userInside: true, userFinished: false }}
        # courses_hashes << { data: { userInside: true, userFinished: false }}
        # courses_hashes << { data: { userInside: true, userFinished: true }}
        # courses_hashes << { data: { userInside: false, userFinished: false }}
        #
        # courses_hashes.sort! do |a, b|
        #   a_weight, b_weight = 0, 0
        #   a_weight = 1 if a[:data][:userInside] && !a[:data][:userFinished]
        #   a_weight = 0 if !a[:data][:userInside] && !a[:data][:userFinished]
        #   a_weight = -1 if a[:data][:ubserInside] && a[:data][:userFinished]
        #
        #   b_weight = 1 if b[:data][:userInside] && !b[:data][:userFinished]
        #   b_weight = 0 if !b[:data][:userInside] && !b[:data][:userFinished]
        #   b_weight = -1 if b[:data][:userInside] && b[:data][:userFinished]
        #
        #   b_weight <=> a_weight
        # end
        #
        # puts courses_hashes
      end
      render json: courses_hashes
    end

    # GET /course/course_data/1.json
    def show
      unless current_user.present? && current_user.is_admin?
        if !@course_course_datum.data.key?('finished') || @course_course_datum.data['finished'] == false
          fail Exceptions::AccessDenied.new('Ten kurs nie został jeszcze opublikowany')
        end
      end
      render json: object_to_json(@course_course_datum)
    end

    # POST /course/course_data.json
    def create
      @course_course_datum = Course::CourseDatum.new

      respond_to do |format|
        if @course_course_datum.save
          format.json { render json: object_to_json(@course_course_datum), status: :created, location: @course_course_datum }
        else
          format.json { render json: @course_course_datum.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /course/course_data/1.json
    def update
      @course_course_datum[:data] = @course_course_datum.data.merge(JSON.parse(request.body.read))
      respond_to do |format|
        if @course_course_datum.save
          format.json { render json: object_to_json(@course_course_datum), status: :ok, location: @course_course_datum }
        else
          format.json { render json: @course_course_datum.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /course/course_data/1.json
    def destroy
      @course_course_datum.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private

    def set_course_course_datum
      @course_course_datum = Course::CourseDatum.find(params[:id])
    end

    def object_to_json(course)
      course_hash = course.attributes
      course_hash['id'] = course_hash['_id']
      course_hash['parent_id'] = course.parent_id
      lessons_passed = []
      course_hash['data']['lessonCurrent'] = ''
      user_inside = false
      user_finished = false

      query = Course::UserCourse.where(course_course_datum: course, user: current_user)
      if current_user && query.exists?
        user_inside = true
        lessons_passed = query.first.lessons
        user_finished = true if lessons_passed.count == course.course_lessons.count
        passed_count = lessons_passed.count
        lessons_list = Course::CourseDatum.get_lessons_by_course_id(course.id.to_s)
        lessons_count = lessons_list.count
        if passed_count == lessons_count
          course_hash['data']['lessonCurrent'] = lessons_passed.last
        else
          course_hash['data']['lessonCurrent'] = lessons_list[passed_count].id.to_s
        end
      end
      course_hash['data']['lessonsPassed'] = lessons_passed
      course_hash['data']['userInside'] = user_inside
      course_hash['data']['userFinished'] = user_finished
      course_hash
    end
  end
end
