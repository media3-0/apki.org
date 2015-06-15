#!/bin/bash

echo "Installing ruby ver 2.2.~"

rvm install 2.2

echo "Done (don't mind an error, it's not a bug it's a feature!"

echo "Set up 2.2 as default. Execute command:"
echo "  rvm use 2.2 --default --create"

echo "Then install rails dependencies. Execute commands:"
echo "  gem install rails"
echo "  gem install bundler"
echo "  bundler install"
