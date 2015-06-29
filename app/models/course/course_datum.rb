class Course::CourseDatum
  include Mongoid::Document
  include Mongoid::Timestamps
  include JSONDataModel

  field :data, type: Hash

  has_many :course_lessons, :class_name => 'Course::Lesson'

  # Pobiera listę wszystkich kursów. Dla adminów także tych nieopublikowanych
  def self.get_list(user)
    data = Course::CourseDatum.all
    data.reject do |cd|
      !cd.has_key?('finished') || cd['finished'] == false # TODO : przetestować warunek na prawdziwych danych!
    end if user.account_type != :admin
  end
end
