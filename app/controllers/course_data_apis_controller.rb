class CourseDataApisController < ApplicationController
  before_action :set_course_data_api, only: [:show, :edit, :update, :destroy]

  # GET /course_data_apis
  # GET /course_data_apis.json
  def index
    @course_data_apis = CourseDataApi.all
  end

  # GET /course_data_apis/1
  # GET /course_data_apis/1.json
  def show
  end

  # GET /course_data_apis/new
  def new
    @course_data_api = CourseDataApi.new
  end

  # GET /course_data_apis/1/edit
  def edit
  end

  # POST /course_data_apis
  # POST /course_data_apis.json
  def create
    @course_data_api = CourseDataApi.new(course_data_api_params)

    respond_to do |format|
      if @course_data_api.save
        format.html { redirect_to @course_data_api, notice: 'Course data api was successfully created.' }
        format.json { render :show, status: :created, location: @course_data_api }
      else
        format.html { render :new }
        format.json { render json: @course_data_api.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /course_data_apis/1
  # PATCH/PUT /course_data_apis/1.json
  def update
    respond_to do |format|
      if @course_data_api.update(course_data_api_params)
        format.html { redirect_to @course_data_api, notice: 'Course data api was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_data_api }
      else
        format.html { render :edit }
        format.json { render json: @course_data_api.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /course_data_apis/1
  # DELETE /course_data_apis/1.json
  def destroy
    @course_data_api.destroy
    respond_to do |format|
      format.html { redirect_to course_data_apis_url, notice: 'Course data api was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course_data_api
      @course_data_api = CourseDataApi.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_data_api_params
      params.require(:course_data_api).permit(:name, :difficulty, :description, :image)
    end
end
