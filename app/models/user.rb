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

  has_many :news
  belongs_to :school

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

  public

  def is_admin?
    self.account_type == :admin
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
    end
    object_label_method do
      :nickname
    end
  end
end
