module Course
  class CourseDatum
    include Mongoid::Document
    include Mongoid::Timestamps

    field :data, type: Hash, :default => {}

    has_many :course_lessons, :class_name => 'Course::Lesson'

    has_many :course_user_courses, :class_name => 'Course::UserCourse'

    # Pobiera listę wszystkich kursów. Dla adminów także tych nieopublikowanych
    def self.get_list(user)
      data = Course::CourseDatum.all
      data = data.reject do |cd|
        !cd.data.has_key?('finished') || cd.data['finished'] == false
      end unless user.present? and user.is_admin?
      return data
    end

    def parent_id
      ''
    end

    def self.get_lessons_by_course_id(id)
      find(id).course_lessons.sort_by { |lesson| lesson.created_at }
    end
  end
end