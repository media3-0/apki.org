# apki.org 

[![Build Status](https://travis-ci.org/media3-0/apki.org.svg?branch=master)](https://travis-ci.org/media3-0/apki.org) [![Dependency Status](https://gemnasium.com/media3-0/apki.org.svg)](https://gemnasium.com/media3-0/apki.org) [![Code Climate](https://codeclimate.com/github/media3-0/apki.org/badges/gpa.svg)](https://codeclimate.com/github/media3-0/apki.org) [![Test Coverage](https://codeclimate.com/github/media3-0/apki.org/badges/coverage.svg)](https://codeclimate.com/github/media3-0/apki.org/coverage) [![Stories in Ready](https://badge.waffle.io/media3-0/apki.org.svg?label=ready&title=Ready)](http://waffle.io/media3-0/apki.org) [![GitHub version](https://badge.fury.io/gh/media3-0%2Fapki.org.png)](https://badge.fury.io/gh/media3-0%2Fapki.org)

Informacje o rozwoju projektu można znaleźć na naszym [devblogu](http://devblog.apki.org)

## Konfiguracja potrzebna do uruchomienia aplikacji

Aby poprawnie uruchomić aplikację  należy stworzyć plik `config/local_env.yml` i wypełnić go potrzebnymi zmiennymi środowiskowymi. Rozwiązanie to opisane jest dokładnie na naszym [devblogu](http://devblog.apki.org/zmienne-srodowiskowe-i-wrazliwe-dane-produkcyjne/).

Do działania aplikacji w trybie developerskim wymagane są tylko 4 klucze:

```yaml
SECRET_KEY_BASE: losowy secret_key_base
GITHUB_KEY: klucz_github_key
GITHUB_SECRET: klucz_github_secret
API_DISCOURSE: klucz_api_discourse
```

Przy czym klucz API_DISCOURSE potrzebny jest tylko do wymiany informacji z forum.apki.org.

Do uruchomienia potrzebne jest środowisko Ruby. Zalecaną przez nas wersją jest linia 2.2 (stabilna), jednak projekt uruchamia się także na wersji 2.1 (jedyny sposób uruchomienia naszego projektu na systemie windows. Wersja 2.2 tam nie działa). Wersje niższe niż 2.1 nie są przez nas testowane.

Do instalacji zależności potrzebny jest gem bundler (`gem install bundler`). Po jego zainstalowaniu wystarczy w katalogu projektu wykonać polecenie `bundle` i zaczekać na pobranie i instalację wszystkich zależności.

Po tym procesie wystarczy uruchomić serwer poleceniem `rails s`.

## Kompilacja kodu zadań

Aby kompilować kod wysyłany do zadań należy uruchomić osobny serwer kompilacji (drobne api napisane w PHP za pomocą frameworka Slim). Jest on dostępny [tutaj](https://github.com/media3-0/apki.org-Code-Compiler).

## Konfiguracja Vagranta do pracy z portalem apki.org

Pełna instrukcja dostępna na naszym [devblogu](http://devblog.apki.org/vagrant-ustawienie-srodowiska-developerskiego/).

## Testowanie

Aby uruchomić wszystkie testy po zainstalowaniu zależności wystarczy wykonać polecenie `rake`.

Status testów dla MRI 2.1 oraz 2.2 jest na bieżąco monitorowany na Travis CI. 

[![Build Status](https://travis-ci.org/media3-0/apki.org.svg?branch=master)](https://travis-ci.org/media3-0/apki.org) [![Test Coverage](https://codeclimate.com/github/media3-0/apki.org/badges/coverage.svg)](https://codeclimate.com/github/media3-0/apki.org/coverage) [![Code Climate](https://codeclimate.com/github/media3-0/apki.org/badges/gpa.svg)](https://codeclimate.com/github/media3-0/apki.org)
