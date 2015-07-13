# apki.org [![Build Status](https://travis-ci.org/media3-0/apki.org.svg?branch=master)](https://travis-ci.org/media3-0/apki.org)
Informacje o rozwoju projektu można znaleźć na naszym [devblogu](http://devblog.apki.org)

## Konfiguracja potrzebna do uruchomienia aplikacji

Aby poprawnie uruchomić aplikację  należy stworzyć plik `config/local_env.yml` i wypełnić go potrzebnymi zmiennymi środowiskowymi. Rozwiązanie to opisane jest dokładnie na naszym [devblogu](http://devblog.apki.org/zmienne-srodowiskowe-i-wrazliwe-dane-produkcyjne/).

Do działania aplikacji w trybie developerskim wymagane są tylko 4 klucze:

```
SECRET_KEY_BASE: losowy secret_key_base
GITHUB_KEY: klucz_github_key
GITHUB_SECRET: klucz_github_secret
API_DISCOURSE: klucz_api_discourse
```

Przy czym klucz API_DISCOURSE potrzebny jest tylko do wymiany informacji z forum.apki.org.

Do uruchomienia potrzebne jest środowisko Ruby. Zalecaną przez nas wersją jest linia 2.2 (stabilna), jednak projekt uruchamia się także na wersji 2.1 (jedyny sposób uruchomienia naszego projektu na systemie windows. Wersja 2.2 tam nie działa). Niższe wersje nie są przez nas testowane.

Do instalacji zależności potrzebny jest gem bundler (`gem install bundler`). Po jego zainstalowaniu wystarczy w katalogu projektu wykonać polecenie `bundle` i zaczekać na pobranie i instalację wszystkich zależności.

Po tym procesie wystarczy uruchomić serwer poleceniem `rails s`.

## Konfiguracja Vagranta do pracy z portalem apki.org

Pełna instrukcja dostępna na naszym [devblogu](http://devblog.apki.org/vagrant-ustawienie-srodowiska-developerskiego/).

## Testowanie

Aby uruchomić wszystkie testy po zainstalowaniu zależności wystarczy wykonać polecenie `rake`.

Status testów dla MRI 2.1 oraz 2.2 jest na bieżąco monitorowany na Travis CI. 

[![Build Status](https://travis-ci.org/media3-0/apki.org.svg?branch=master)](https://travis-ci.org/media3-0/apki.org)