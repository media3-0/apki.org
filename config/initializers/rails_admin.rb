require 'i18n'
I18n.default_locale = :pl


# FIXME : remove monkey patch
require 'rails_admin/config/fields/types/string'
require 'rails_admin/config/fields/types/bson_object_id'
require 'mongoid'

module RailsAdmin
  module Config
    module Fields
      module Types
        class BsonObjectId < RailsAdmin::Config::Fields::Types::String
          OBJECT_ID = begin
            if defined?(Moped::BSON)
              Moped::BSON::ObjectId
            elsif defined?(BSON::ObjectId)
              BSON::ObjectId
            end
          end
        end
      end
    end
  end
end

RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.authorize_with do
    redirect_to main_app.root_path, flash: { error: 'Musisz być zalogowany i mieć prawa admina aby dostać się do panelu administratora' } unless current_user && current_user.is_admin?
  end

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.included_models = %w(User News School EducatorNews Article ArticleCategory Project)
end
