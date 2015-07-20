# Be sure to restart your server when you modify this file.
if Rails.env.development?
  Rails.application.config.session_store :cookie_store, key: '_apkiorg_session'
end

