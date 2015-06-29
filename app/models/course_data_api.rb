class CourseDataApi
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :difficulty, type: String
  field :description, type: String
  field :image, type: String
end
