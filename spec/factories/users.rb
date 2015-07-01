FactoryGirl.define do
  factory :user do |u|
    u.nickname 'test'
    u.uid 'asdf'
    u.account_type :admin
  end
end
