module Features
  module SessionHelpers
    def login(user)
      visit test_login_path(user.id.to_s)
      expect(current_path).to eq(root_path)
    end

    def logout
      visit signout_path
      expect(current_path).to eq(root_path)
    end
  end
end
