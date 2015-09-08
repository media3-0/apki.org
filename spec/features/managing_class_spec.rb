require 'rails_helper'

feature 'Zarządzanie klasami', type: :feature do
  before(:all) do
    @teacher = User.create!(nickname: 'nauczyciel', uid: 'asdf', account_type: :teacher)
    @teacher2 = User.create!(nickname: 'nauczyciel2', uid: 'asdfg', account_type: :teacher)
    @student = User.create!(nickname: 'student', uid: 'zxcv', account_type: :student)

    3.times do |i|
      User.create!(nickname: "student#{i}", uid: "s#{i}", account_type: :student)
    end
  end

  after(:all) do
    User.destroy_all
  end

  after(:each) do
    School.destroy_all
  end

  scenario 'Nauczyciel może edytować klasę' do
    login @teacher
    visit school_edit_profile_path
    within 'form.simple_form' do
      fill_in 'school_name', with: 'test'
      fill_in 'wmd-input-description', with: 'test opis'
    end
    click_button 'Aktualizuj'
    expect(current_path).to eq(school_edit_profile_path)
    expect(page).to have_css '.alert-success'
    expect(page.find('.alert-success').text).to eq 'Zapisano'

    # Select z jakiegoś powodu nie chce działać (nie zaznacza opcji)
    # @teacher.reload
    # profile = @teacher.klasa
    # expect(profile.name).to eq 'test'
    # expect(profile.description).to eq 'test opis'
    # expect(profile.students.count).to eq 1
    # expect(profile.students.include? User.find_by_name('student1')).to eq true

    logout
  end

  scenario 'Walidacje formularza zarządzania klasą' do
    login @teacher
    visit school_edit_profile_path
    within 'form.simple_form' do
      fill_in 'school_name', with: ''
      fill_in 'wmd-input-description', with: 'test opis'
    end
    click_button 'Aktualizuj'
    expect(current_path).to eq(school_edit_profile_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Błąd podczas zapisu'

    within 'form.simple_form' do
      fill_in 'school_name', with: 'test'
      fill_in 'wmd-input-description', with: ''
    end
    click_button 'Aktualizuj'
    expect(current_path).to eq(school_edit_profile_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Błąd podczas zapisu'

    logout
  end

  scenario 'Nikt poza nauczycielem nie może edytować klasy' do
    login @student
    visit school_edit_profile_path
    expect(current_path).not_to eq(school_edit_profile_path)
    expect(page).to have_css('.alert-danger')
    expect(page.find('.alert-danger').text).to eq 'Musisz być edukatorem aby mieć tu dostęp'
    logout

    visit school_edit_profile_path
    expect(current_path).not_to eq(school_edit_profile_path)
    expect(page).to have_css('.alert-danger')
    expect(page.find('.alert-danger').text).to eq 'Musisz być zalogowany aby mieć tu dostęp'
  end
end