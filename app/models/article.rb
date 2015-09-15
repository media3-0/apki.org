class Article
  include Mongoid::Document
  include Mongoid::Timestamps
  #include Mongoid::Slug

 # paginacja
  paginates_per 3
  
  validates_presence_of :title, :content, :user, :article_category
  validates_length_of :title, maximum: 250, message: 'Długość tytułu musi być mniejsza niż 250'

  field :title, type: String
  field :content, type: String

  #slug :title

  belongs_to :user
  belongs_to :article_category

  rails_admin do
    edit do
      field :title
      field :content, :ck_editor
      field :article_category
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
