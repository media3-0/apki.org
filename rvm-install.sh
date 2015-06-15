#!/bin/bash

echo "Installing ruby ver 2.2.~"

rvm install 2.2

echo "Done (don't mind an error, it's not a bug it's a feature!"

echo "Setting up 2.2 as default"

rvm use 2.2 --default --create

echo "Done"

echo "Installing rails dependencies"

gem install rails

gem install bundler

echo "Finished installing!"
