# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# puts 'Tworzenie użytkowników'
# 10.times do |n|
#   User.create!(uid: n.to_s, nickname: "nickname#{n}", account_type: :student)
# end
# puts 'Użytkownicy stworzeni'

Course::CourseDatum.destroy_all
Course::Lesson.destroy_all
Course::Quiz.destroy_all
Course::Exercise.destroy_all
Course::Achievement.destroy_all

course = Course::CourseDatum.new(data: {
                                   :title => 'Pierwszy testowy kurs',
                                   :description => 'Oto testowy kurst który jest dla testu. Check this out!',
                                   :icon_src => '',
                                   :difficulty_level => 1,
                                   :dependencies => [],
                                   :lessonsPassed => [],
                                   :lessonCurrent => ''
                                 })

lesson = Course::Lesson.new(data: {
                              :title => 'sample lesson 1',
                              :article => "\n\n      \n      \n        \n                    <p align=\"center\" style=\"margin-top: 0.42cm; margin-bottom: 0.21cm; line-height: 100%; page-break-after: avoid\">\n      \n      \n        \n                        <font face=\"Nimbus Sans L, sans-serif\"><font size=\"6\" style=\"font-size: 28pt\"><b>Wstęp do języka Python. Zapoznanie z interpreterem</b></font></font></p>\n      \n      \n        \n                    <h1 class=\"western\" style=\"font-weight: normal\">\n      \n      \n        \n                        Czym jest interpreter?</h1>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">Interpreter to program komputerowy, kt&oacute;rego działanie opiera się na uruchamianiu program&oacute;w w języku, kt&oacute;ry obsługuje </span><span style=\"font-weight: normal\">tenże program. Jest on pewną bazą dla programu &ndash; łączy ze sobą wszystkie składniki kodu i umożliwia ich poprawne działanie. Oczywiście istnieją też języki, kt&oacute;re nie mają wsparcia nadrzędnego programu, jednakże nie umożliwiają one wprowadzania i prawie natychmiastowego testowania zmian (programy w tych językach podlegają kompilacji, kt&oacute;ra polega na zamianie kodu źr&oacute;dłowego &ndash; czytelnego dla programisty, na kod wykonywalny &ndash; zrozumiały dla komputera</span><span style=\"font-weight: normal\">)</span><span style=\"font-weight: normal\">.</span></p>\n      \n      \n        \n                    <h1 class=\"western\">\n      \n      \n        \n                        <span style=\"font-weight: normal\">Czym jest język Python?</span></h1>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Język Python to język programowania, umożliwiający tworzenie program&oacute;w w spos&oacute;b zwięzły. Jest wysokopoziomowy &ndash; kod w nim napisany łączy wysoką czytelność i możliwość wykonywania zaawansowanych operacji.</p>\n      \n      \n        \n                    <h1 class=\"western\">\n      \n      \n        \n                        <span style=\"font-weight: normal\">I</span><span style=\"font-weight: normal\">nstalacja Pythona w systemach Windows, Linux i Mac</span></h1>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">Instalacja Pythona w systemie Windows opiera się na standardowym instalatorze. I</span><span style=\"font-weight: normal\">nstalacja pokazana jest na </span><span style=\"font-weight: normal\">na poniższym filmiku:</span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">W systemie Linux język Python i jego interpreter są domyślnie zainstalowane, jednakże by sprawdzić/zainstalować interpreter języka Python, można skorzystać z poniższego filmiku:</span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <iframe allowfullscreen=\"\" alt=\"Jakiś tytuł filmu\" frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/rQqwG8Kji_I\" width=\"560\"></iframe><span style=\"font-weight: normal\">Dla Macintosha w poniższym filmiku podano instrukcje:</span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <h1 class=\"western\" style=\"font-weight: normal\">\n      \n      \n        \n                        Czym jest interaktywność interpretera?</h1>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <iframe allowfullscreen=\"\" frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/GG_ATSYONRM\" width=\"560\"></iframe></p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Interpreter dla środowiska Python jest w pełni interaktywny. Czasami istnieje potrzeba przetestowania bardzo małej porcji kodu, i pisanie programu jest wtedy nieoptymalne czasowo &ndash; można w takiej sytuacji włączyć interpreter w trybie interaktywnym. Polega on na interaktywnej konsoli, w kt&oacute;rą wpisuje się kod.</p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Włączenie i pierwsze użycie interaktywnej wersji programu w systemie Windows pokazane jest na poniższym filmie:</p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Użycie interpretera w systemie Linux jest banalnie proste i zostało opisane w materiale wideo poniżej:</p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Macintosh wymaga poniższych instrukcji do zadziałania:</p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">W programie została użyta </span><b>funkcja</b><span style=\"font-weight: normal\">. Funkcja to pewien zbi&oacute;r instrukcji (kodu), przetwarzający dane w spos&oacute;b zależny od jej przeznaczenia, i w wielu przypadkach umożliwiający odczyt wyniku tych operacji.</span></p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Język Python ma wiele takich wbudowanych funkcji.</p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">Pierwszą poznaną funkcją jest funkcja </span><u><b>print(dane)</b></u><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">. Służy ona do wyświetlania w konsoli danych r&oacute;żnego rodzaju &ndash; liczb czy ciąg&oacute;w znak&oacute;w. Możliwe jest także wyświetlanie </span></span><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">kilku danych następujących po sobie, </span></span><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">z użyciem znaku przecinka</span></span><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">, np.:</span></span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <i><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">print(&#39;alfa&#39;, 10)</span></span></i></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                         </p>\n",
                              :exercisesPassed => []
                            })

quizzes = []
quizzes << Course::Quiz.create!(data: {
                                  :question => 'Co działa lepiej? Front-end czy back-end?',
                                  :answer_idx => 2,
                                  :answers => %w(Front-end Back-end Tak)
                                })
quizzes << Course::Quiz.create!(data: {
                                  :question => 'Czy Sławek lubi się bawić swoim Pythonem?',
                                  :answers => %w(Tak Nie),
                                  :answer_idx => 0
                                })
quizzes << Course::Quiz.create!(data: {
                                  :question => 'Jaka jest odpowiedź na życie, wszechświat i wszystko?',
                                  :answers => [
                                    'Tak',
                                    'Love is the Answer',
                                    '42'
                                  ],
                                  :answer_idx => 1
                                })
lesson.course_quizs.concat quizzes
quizzes.each(&:save!)

Course::Achievement.create!(data: {:name => 'Achievement 1'}, lesson_id: lesson.id.to_s)
course.course_lessons << lesson
lesson.save!

lesson = Course::Lesson.new(data: {
                              :title => 'sample lesson 2',
                              :article => "\n\n      \n      \n        \n                    <p align=\"center\" style=\"margin-top: 0.42cm; margin-bottom: 0.21cm; line-height: 100%; page-break-after: avoid\">\n      \n      \n        \n                        <font face=\"Nimbus Sans L, sans-serif\"><font size=\"6\" style=\"font-size: 28pt\"><b>Wstęp do języka Python. Zapoznanie z interpreterem222222222222222222</b></font></font></p>\n      \n      \n        \n                    <h1 class=\"western\" style=\"font-weight: normal\">\n      \n      \n        \n                        Czym jest interpreter?</h1>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">Interpreter to program komputerowy, kt&oacute;rego działanie opiera się na uruchamianiu program&oacute;w w języku, kt&oacute;ry obsługuje </span><span style=\"font-weight: normal\">tenże program. Jest on pewną bazą dla programu &ndash; łączy ze sobą wszystkie składniki kodu i umożliwia ich poprawne działanie. Oczywiście istnieją też języki, kt&oacute;re nie mają wsparcia nadrzędnego programu, jednakże nie umożliwiają one wprowadzania i prawie natychmiastowego testowania zmian (programy w tych językach podlegają kompilacji, kt&oacute;ra polega na zamianie kodu źr&oacute;dłowego &ndash; czytelnego dla programisty, na kod wykonywalny &ndash; zrozumiały dla komputera</span><span style=\"font-weight: normal\">)</span><span style=\"font-weight: normal\">.</span></p>\n      \n      \n        \n                    <h1 class=\"western\">\n      \n      \n        \n                        <span style=\"font-weight: normal\">Czym jest język Python?</span></h1>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Język Python to język programowania, umożliwiający tworzenie program&oacute;w w spos&oacute;b zwięzły. Jest wysokopoziomowy &ndash; kod w nim napisany łączy wysoką czytelność i możliwość wykonywania zaawansowanych operacji.</p>\n      \n      \n        \n                    <h1 class=\"western\">\n      \n      \n        \n                        <span style=\"font-weight: normal\">I</span><span style=\"font-weight: normal\">nstalacja Pythona w systemach Windows, Linux i Mac</span></h1>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">Instalacja Pythona w systemie Windows opiera się na standardowym instalatorze. I</span><span style=\"font-weight: normal\">nstalacja pokazana jest na </span><span style=\"font-weight: normal\">na poniższym filmiku:</span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">W systemie Linux język Python i jego interpreter są domyślnie zainstalowane, jednakże by sprawdzić/zainstalować interpreter języka Python, można skorzystać z poniższego filmiku:</span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <iframe allowfullscreen=\"\" alt=\"Jakiś tytuł filmu\" frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/rQqwG8Kji_I\" width=\"560\"></iframe><span style=\"font-weight: normal\">Dla Macintosha w poniższym filmiku podano instrukcje:</span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <h1 class=\"western\" style=\"font-weight: normal\">\n      \n      \n        \n                        Czym jest interaktywność interpretera?</h1>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <iframe allowfullscreen=\"\" frameborder=\"0\" height=\"315\" src=\"https://www.youtube.com/embed/GG_ATSYONRM\" width=\"560\"></iframe></p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Interpreter dla środowiska Python jest w pełni interaktywny. Czasami istnieje potrzeba przetestowania bardzo małej porcji kodu, i pisanie programu jest wtedy nieoptymalne czasowo &ndash; można w takiej sytuacji włączyć interpreter w trybie interaktywnym. Polega on na interaktywnej konsoli, w kt&oacute;rą wpisuje się kod.</p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Włączenie i pierwsze użycie interaktywnej wersji programu w systemie Windows pokazane jest na poniższym filmie:</p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Użycie interpretera w systemie Linux jest banalnie proste i zostało opisane w materiale wideo poniżej:</p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Macintosh wymaga poniższych instrukcji do zadziałania:</p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <br />\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">W programie została użyta </span><b>funkcja</b><span style=\"font-weight: normal\">. Funkcja to pewien zbi&oacute;r instrukcji (kodu), przetwarzający dane w spos&oacute;b zależny od jej przeznaczenia, i w wielu przypadkach umożliwiający odczyt wyniku tych operacji.</span></p>\n      \n      \n        \n                    <p style=\"font-weight: normal\">\n      \n      \n        \n                        Język Python ma wiele takich wbudowanych funkcji.</p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <span style=\"font-weight: normal\">Pierwszą poznaną funkcją jest funkcja </span><u><b>print(dane)</b></u><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">. Służy ona do wyświetlania w konsoli danych r&oacute;żnego rodzaju &ndash; liczb czy ciąg&oacute;w znak&oacute;w. Możliwe jest także wyświetlanie </span></span><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">kilku danych następujących po sobie, </span></span><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">z użyciem znaku przecinka</span></span><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">, np.:</span></span></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                        <i><span style=\"text-decoration: none\"><span style=\"font-weight: normal\">print(&#39;alfa&#39;, 10)</span></span></i></p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                         </p>\n      \n      \n        \n                    <p>\n      \n      \n        \n                         </p>\n",
                              :exercisesPassed => []
                            })

quizzes = []
quizzes << Course::Quiz.create!(data: {
                                  :question => 'Co działa lepiej? Front-end czy back-end?',
                                  :answer_idx => 2,
                                  :answers => %w(Front-end Back-end Tak)})
quizzes << Course::Quiz.create!(data: {
                                  :question => 'Czy Sławek lubi się bawić swoim Pythonem?',
                                  :answers => %w(Tak Nie),
                                  :answer_idx => 0
                                })
quizzes << Course::Quiz.create!(data: {
                                  :question => 'Jaka jest odpowiedź na życie, wszechświat i wszystko?',
                                  :answers => [
                                    'Tak',
                                    'Love is the Answer',
                                    '42'
                                  ],
                                  :answer_idx => 1
                                })
lesson.course_quizs.concat quizzes
quizzes.each(&:save!)

exercises = []
exercises << Course::Exercise.create!(data: {
                                        :content_of_exercise => '<h2>Wyświetl na ekranie 44</h2>Użyj polecenie puts aby wyświetlić w języku Ruby liczbę czterdzieści i cztery.',
                                        'code' => '# Tutaj początek kodu\n ',
                                        'code_locks' => [
                                          {
                                            'rowStart' => 0,
                                            'colStart' => 0,
                                            'rowEnd' => 0,
                                            'colEnd' => 100
                                          }
                                        ],
                                        'allow_user_input' => false,
                                        'default_user_input' => '',
                                        'expected_result_expr' => '44',
                                        'code_before' => '',
                                        'code_after' => '',
                                        'lang' => 'RUBY'
                                      })

lesson.course_exercises.concat exercises
exercises.each(&:save!)

Course::Achievement.create!(data: {:name => 'Achievement 2'}, lesson_id: lesson.id.to_s)
course.course_lessons << lesson
lesson.save!


course.save!

user = User.where(uid: 'test').exists? ? User.find_by(uid: 'test') : User.create!(nickname: 'test', name: 'test', uid: 'test', account_type: :student)

Course::UserCourse.destroy_all
Course::UserCourse.create!(course_course_datum: course, user: user)

user.save!
