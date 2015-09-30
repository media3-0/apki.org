class News
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  # paginacja
  paginates_per 10

  validates_presence_of :title, :content, :user, :image
  validates_length_of :title, maximum: 250, message: 'Długość tytułu musi być mniejsza niż 250'

  field :title, type: String
  field :content, type: String
  field :image, type: String
  field :educator_news, type: Boolean, default: false

  slug :title

  belongs_to :user

  rails_admin do
    edit do
      field :title
      field :image
      field :content, :ck_editor
      field :user do
        visible false
      end

      field :user_id, :hidden do
        visible true
        default_value do
          bindings[:view].current_user.id
        end
      end
    end
  end
end
