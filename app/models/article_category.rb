class ArticleCategory
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

 

  field :name, type: String
  slug :name
  

  has_many :articles

end

