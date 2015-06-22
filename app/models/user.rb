class User
  include Mongoid::Document

  validates :name, :uid, :account_type, presence: true

  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :email, type: String
  field :image, type: String
  field :nickname, type: String
  field :urls, type: Hash
  field :account_type, type: Symbol # :student :teacher :moderator :admin
  field :profile_description

  has_many :news
  has_one :school

  after_initialize :init

  def init
    self.account_type ||= :student
  end

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.name = auth['info']['name']
      user.email = auth['info']['email']
      user.image = auth['info']['image']
      user.nickname = auth['info']['nickname']
      user.urls = auth['info']['urls']
    end
  end

  public

  def is_admin?
    self.account_type == :admin
  end

  def account_type_enum
    %w(student teacher moderator admin)
  end
end
