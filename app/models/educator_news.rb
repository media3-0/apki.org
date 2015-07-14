class EducatorNews
  include Mongoid::Document
  include Mongoid::Timestamps

  # paginacja
  paginates_per 5

  validates_presence_of :title, :content, :user
  validates_length_of :title, maximum: 250, message: 'Długość tytułu musi być mniejsza niż 250'

  field :title, type: String
  field :content, type: String

  belongs_to :user
end
