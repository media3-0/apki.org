class User
  include Mongoid::Document

  validates :nickname, :uid, :account_type, presence: true

  field :nickname, type: String
  field :email, type: String
  field :name, type: String
  field :account_type, type: Symbol # :student :teacher :moderator :admin
  field :uid, type: String
  field :image, type: String
  field :urls, type: Hash
  field :profile_description
  field :provider, type: String
  field :school_accepted, type: Boolean, default: false

  has_many :news
  has_many :course_user_courses, class_name: 'Course::UserCourse'
  has_many :projects
  belongs_to :school
  has_one :klasa, class_name: 'School'

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['name']
      user.email = auth['info']['email']
      user.image = auth['info']['image']
      user.nickname = auth['info']['nickname']
      user.urls = auth['info']['urls']
      user.account_type ||= :student
    end
  end

  def write_attribute(attr_name, value)
    attribute_changed(attr_name, read_attribute(attr_name), value)
    super
  end

  def attribute_changed(attr, old_val, new_val)
    if attr == 'school_id' && old_val.to_s != new_val
      self.school_accepted = false
      self.save!
    end
  end

  public

  def is_admin?
    account_type == :admin
  end

  def account_type_enum
    %w(student teacher moderator admin)
  end

  rails_admin do
    edit do
      field :name
      field :email
      field :image
      field :nickname
      field :account_type
      field :profile_description, :text
      field :school
      field :school_accepted
    end
    object_label_method do
      :nickname
    end
  end
end
