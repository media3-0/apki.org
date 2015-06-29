class School
  include Mongoid::Document

  validates_presence_of :name, :description

  field :name, type: String
  field :description, type: String

  has_many :users

  public
  def get_proper_user_list(user_id)
    @users = User.where(:id.ne => user_id, :account_type => :student) # pobranie wszystkich użytkowników z wyjątkiem siebie
    @users = @users.reject { |user| user.school != nil and user.school.id != self.id } # Odrzucenie ludzi którzy są przypisani do innych szkół
  end

  rails_admin do
    edit do
      field :name
      field :description, :text
    end
  end
end
