class Article
  include Mongoid::Document
  include Mongoid::Timestamps

  # paginacja
  paginates_per 1

  validates_presence_of :title, :content, :user
  validates_length_of :title, maximum: 250, message: 'Długość tytułu musi być mniejsza niż 250'

  field :title, type: String
  field :content, type: String

  belongs_to :user

  rails_admin do
    edit do
      field :title
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
