module Course
  class CourseDataController < CourseAdminController
    before_action :set_course_course_datum, only: [:show, :update, :destroy]

    # GET /course/course_data
    # GET /course/course_data.json
    def index
      @course_course_data = Course::CourseDatum.get_list(current_user) # TODO : Włączyć po testach
      # @course_course_data = Course::CourseDatum.all
    end

    # GET /course/course_data/1.json
    def show
      unless current_user.present? && current_user.is_admin?
        if !@course_course_datum.data.key?('finished') || @course_course_datum.data['finished'] == false
          fail Exceptions::AccessDenied.new('Ten kurs nie został jeszcze opublikowany')
        end
      end
    end

    # POST /course/course_data.json
    def create
      @course_course_datum = Course::CourseDatum.new

      respond_to do |format|
        if @course_course_datum.save
          format.json { render :show, status: :created, location: @course_course_datum }
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
          format.json { render :show, status: :ok, location: @course_course_datum }
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
  end
end
