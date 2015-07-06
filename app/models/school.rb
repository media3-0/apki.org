class School
  include Mongoid::Document

  validates_presence_of :name, :description

  field :name, type: String
  field :description, type: String

  has_many :students, class_name: 'User'
  belongs_to :user

  public
  def get_proper_user_list
    @users = User.where(:account_type => :student) # pobranie wszystkich uczniów
    @users = @users.reject { |user| user.school != nil and user.school.id != self.id } # Odrzucenie ludzi którzy są przypisani do innych szkół
  end

  rails_admin do
    edit do
      field :name
      field :description, :text
    end
  end
end
