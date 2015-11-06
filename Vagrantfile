# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = '2'

# https://gorails.com/guides/using-vagrant-for-rails-development
# https://supermarket.chef.io/cookbooks/mongodb#readme
# http://sourabhbajaj.com/mac-setup/Vagrant/README.html

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Use Ubuntu 14.04 Trusty Tahr 64-bit as our operating system
  config.vm.box = 'ubuntu/trusty64'

  # Configurate the virtual machine to use 2GB of RAM
  config.vm.provider :virtualbox do |vb|
    vb.customize ['modifyvm', :id, '--memory', '2048']
    #vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    #vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 27017, host: 27018
  #config.vm.network :private_network, ip: '192.168.50.50'

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = %w(cookbooks)

    chef.add_recipe 'apt'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'ruby_build'
    chef.add_recipe 'rbenv::user'
    chef.add_recipe 'rbenv::vagrant'
    chef.add_recipe 'mongodb::default'

    chef.json = {
        rbenv: {
            user_installs: [{
                                user: 'vagrant',
                                rubies: ['2.2.1'],
                                global: '2.2.1',
                                gems: {
                                    '2.2.1' => [
                                        { name: 'bundler'}
                                    ]
                                }
                            }]
        }
    }
  end
end