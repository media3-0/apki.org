class Course::Achievement
  include Mongoid::Document
  include Mongoid::Timestamps

  field :data, type: Hash
  field :lesson_id, type: String
  field :exercise_id, type: String
  field :quiz_id, type: String
end
