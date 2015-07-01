class Course::CourseDataController < ApplicationController
  before_action :is_admin, except: [:index, :show]  # TODO : Włączyć po testach

  before_action :set_course_course_datum, only: [:show, :update, :destroy]

  # GET /course/course_data
  # GET /course/course_data.json
  def index
    @course_course_data = Course::CourseDatum.get_list(current_user) # TODO : Włączyć po testach
    #@course_course_data = Course::CourseDatum.all
  end

  # GET /course/course_data/1.json
  def show
    # TODO : Zabezpieczyć dostęp do nieukończonych kursów
  end

  # POST /course/course_data.json
  def create
    @course_course_datum = Course::CourseDatum.new

    @course_course_datum.data = {}

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
    @course_course_datum[:data] = @course_course_datum.data(true).merge(JSON.parse(request.body.read))
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

    def course_course_datum_params
      params.require(:course_course_datum).permit(:data)
    end
end
