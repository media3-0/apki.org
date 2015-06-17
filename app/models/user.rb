class User
  include Mongoid::Document

  validates :name, :uid, presence: true

  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :email, type: String
  field :image, type: String
  field :nickname, type: String
  field :urls, type: Hash

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
end
