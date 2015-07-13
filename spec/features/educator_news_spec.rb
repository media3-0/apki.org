require 'spec_helper'

feature 'Zarządzanie newsami edukatorów' do

  before(:all) do
    @teacher = User.create!(nickname: 'nauczyciel', uid: 'asdf', account_type: :teacher)
    @teacher2 = User.create!(nickname: 'nauczyciel2', uid: 'asdfg', account_type: :teacher)
    @student = User.create!(nickname: 'student', uid: 'zxcv', account_type: :student)
  end

  before(:each) do
    EducatorNews.destroy_all
  end

  after(:all) do
    User.destroy_all
  end

  scenario 'Nauczyciel może napisać news' do
    login @teacher
    visit school_educator_news_path
    within 'form.simple_form' do
      fill_in 'educator_news_title', with: 'test'
      fill_in 'wmd-input-content', with: 'test opisu'
    end
    click_button 'Zatwierdź'
    expect(page).to have_css '.alert-success'
    expect(page.find('.alert-success').text).to eq 'Stworzono nowy news'
    news = EducatorNews.all.first
    expect(current_path).to eq(school_view_news_path(news))
    expect(news.title).to eq 'test'
    expect(news.content).to eq 'test opisu'
    logout
  end

  scenario 'Nauczyciel może edytować swój news' do
    news = EducatorNews.create!(title: 'test', content: 'opis', user: @teacher)
    login @teacher
    visit school_educator_news_path + '?id=' + news.id.to_s
    within 'form.simple_form' do
      fill_in 'educator_news_title', with: 'test2'
      fill_in 'wmd-input-content', with: 'test opisu 2'
    end
    click_button 'Zatwierdź'
    expect(page).to have_css '.alert-success'
    expect(page.find('.alert-success').text).to eq 'Zaktualizowano news'
    news.reload
    expect(current_path).to eq(school_view_news_path(news))
    expect(news.title).to eq 'test2'
    expect(news.content).to eq 'test opisu 2'
    logout
  end

  scenario 'Nauczyciel nie może edytować cudzego newsa' do
    news = EducatorNews.create!(title: 'test', content: 'opis', user: @teacher2)
    login @teacher
    visit school_educator_news_path + '?id=' + news.id.to_s
    expect(current_path).not_to eq(school_view_news_path(news))
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Ten news nie należy do Ciebie'
    logout
  end

  scenario 'Walidacje formularza nowego newsa' do
    login @teacher
    visit school_educator_news_path
    within 'form.simple_form' do
      fill_in 'educator_news_title', with: ''
      fill_in 'wmd-input-content', with: 'test opisu 2'
    end
    click_button 'Zatwierdź'
    expect(current_path).to eq(school_educator_news_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Błąd podczas zapisu'

    within 'form.simple_form' do
      fill_in 'educator_news_title', with: 'test'
      fill_in 'wmd-input-content', with: ''
    end
    click_button 'Zatwierdź'
    expect(current_path).to eq(school_educator_news_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Błąd podczas zapisu'
    logout
  end

  scenario 'Walidacje formularza edycji newsa' do
    news = EducatorNews.create!(title: 'test', content: 'opis', user: @teacher)
    login @teacher
    visit school_educator_news_path + '?id=' + news.id.to_s
    within 'form.simple_form' do
      fill_in 'educator_news_title', with: ''
      fill_in 'wmd-input-content', with: 'test opisu 2'
    end
    click_button 'Zatwierdź'
    expect(current_path).to eq(school_educator_news_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Błąd podczas zapisu'

    within 'form.simple_form' do
      fill_in 'educator_news_title', with: 'test'
      fill_in 'wmd-input-content', with: ''
    end
    click_button 'Zatwierdź'
    expect(current_path).to eq(school_educator_news_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Błąd podczas zapisu'
    logout
  end

  scenario 'Nikt poza edukatorami nie może pisać newsów' do
    visit school_educator_news_path
    expect(current_path).not_to eq(school_educator_news_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Musisz być zalogowany aby mieć tu dostęp'

    login @student
    visit school_educator_news_path
    expect(current_path).not_to eq(school_educator_news_path)
    expect(page).to have_css '.alert-danger'
    expect(page.find('.alert-danger').text).to eq 'Musisz być edukatorem aby mieć tu dostęp'
    logout
  end
end