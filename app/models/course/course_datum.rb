module Course
  class CourseDatum
    include Mongoid::Document
    include Mongoid::Timestamps

    field :data, type: Hash

    has_many :course_lessons, :class_name => 'Course::Lesson'

    # Pobiera listę wszystkich kursów. Dla adminów także tych nieopublikowanych
    def self.get_list(user)
      data = Course::CourseDatum.all
      data = data.reject do |cd|
        !cd.data.has_key?('finished') || cd.data['finished'] == false
      end unless user.present? and user.is_admin?
      return data
    end
  end
end