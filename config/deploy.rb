require 'mina/multistage'
require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'

# For system-wide RVM install.
#   set :rvm_path, '/usr/local/rvm/bin/rvm'

set :shared_paths, %w(config/local_env.yml log public/uploads)

set :current_path, 'public_ruby'

set :term_mode, nil

task :environment do
  invoke :'rvm:use[2.2]'
end

task setup: :environment do
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/log"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/public/uploads"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/public/uploads"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/config"]

  queue! %[touch "#{deploy_to}/#{shared_path}/config/local_env.yml"]
  queue  %[echo "-----> Be sure to edit '#{deploy_to}/#{shared_path}/config/local_env.yml'."]

  queue %[
    repo_host=`echo $repo | sed -e 's/.*@//g' -e 's/:.*//g'` &&
    repo_port=`echo $repo | grep -o ':[0-9]*' | sed -e 's/://g'` &&
    if [ -z "${repo_port}" ]; then repo_port=22; fi &&
    ssh-keyscan -p $repo_port -H $repo_host >> ~/.ssh/known_hosts
  ]
end

desc 'Deploys the current version to the server.'
task deploy: :environment do
  to :before_hook do
  end
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    to :launch do
      queue "ln -s #{deploy_to}/#{current_path}/app/assets/javascripts/vendor/ace #{deploy_to}/#{current_path}/public/ace"
      queue "mkdir -p #{deploy_to}/#{current_path}/tmp/"
      queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
    end
  end
end

task :restart do
  queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
end

task :logs do
  queue 'echo "Contents of the log file are as follows:"'
  queue "tail -f #{deploy_to}/#{current_path}/log/apache.log"
end
