require 'spec_helper'

feature 'Zarządzanie klasami', type: :feature do
  before(:all) do
    @teacher = User.create!(nickname: 'nauczyciel', uid: 'asdf', account_type: :teacher)
    @teacher2 = User.create!(nickname: 'nauczyciel2', uid: 'zxcv', account_type: :teacher)

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
      select('student1', :from => 'school_student_ids')
    end
    click_button 'Aktualizuj'
    expect(page).to have_css('.alert-success')
    expect(page.find('.alert-success').text).to eq 'Zapisano'
    @teacher.reload
    profile = @teacher.klasa
    expect(profile.name).to eq 'test'
    expect(profile.description).to eq 'test opis'
    expect(profile.students.count).to eq 1 # TODO : Dokończyć test
    expect(profile.students.include? User.find_by_name('student1')).to eq true
    logout
  end

  # TODO : Testy newsów edukatorów
end