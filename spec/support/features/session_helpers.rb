module Features
  module SessionHelpers
    def login(user)
      visit test_login_path(user.id.to_s)
      expect(current_path).to eq(root_path)
      expect(page).to have_css('.alert-success')
      expect(page.find('.alert-success').text).to eq 'Zalogowano!'
    end

    def logout
      visit signout_path
      expect(current_path).to eq(root_path)
      expect(page).to have_css('.alert-success')
      expect(page.find('.alert-success').text).to eq 'Wylogowano!'
    end
  end
end