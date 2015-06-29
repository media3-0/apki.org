class Course::CourseDataController < ApplicationController
  before_action :is_admin, except: [:index, :show]

  before_action :set_course_course_datum, only: [:show, :edit, :update, :destroy]

  # GET /course/course_data
  # GET /course/course_data.json
  def index
    @course_course_data = Course::CourseDatum.get_list(current_user)
  end

  # GET /course/course_data/1
  # GET /course/course_data/1.json
  def show
    
  end

  # POST /course/course_data
  # POST /course/course_data.json
  def create
    @course_course_datum = Course::CourseDatum.new

    @course_course_datum.data = {}

    respond_to do |format|
      if @course_course_datum.save
        format.html { redirect_to @course_course_datum, notice: 'Course datum was successfully created.' }
        format.json { render :show, status: :created, location: @course_course_datum }
      else
        format.html { render :new }
        format.json { render json: @course_course_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course/course_data/1
  # PATCH/PUT /course/course_data/1.json
  def update
    respond_to do |format|
      if @course_course_datum.update(course_course_datum_params)
        format.html { redirect_to @course_course_datum, notice: 'Course datum was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_course_datum }
      else
        format.html { render :edit }
        format.json { render json: @course_course_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course/course_data/1
  # DELETE /course/course_data/1.json
  def destroy
    @course_course_datum.destroy
    respond_to do |format|
      format.html { redirect_to course_course_data_url, notice: 'Course datum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course_course_datum
      @course_course_datum = Course::CourseDatum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_course_datum_params
      params.require(:course_course_datum).permit(:data)
    end
end
