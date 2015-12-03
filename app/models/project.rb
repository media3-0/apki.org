class Project
  include Mongoid::Document
  include Mongoid::Timestamps

  validates_presence_of :title, :github
  validates_uniqueness_of :title, :github

  field :title, type: String
  field :github, type: String
  field :icon, type: String, default: ''
  field :contest, type: Boolean, default: false
  field :votes, type: Array, default: []

  belongs_to :user
end
