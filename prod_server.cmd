#!/bin/bash

RAILS_ENV=production rake assets:precompile
rails s -e production -b 0.0.0.0