#!/usr/bin/env ruby
# encoding: UTF-8
require 'rubygems'
require 'bundler'
Bundler.require

task :default => "build:all"

build_dir = "build"
src_dir = "src"

environment = Sprockets::Environment.new
environment.append_path src_dir

# From a given filename src/test.{coffee,js} returns the canonical filename test
def filename(file)
  basename = File.basename(file) # target single needs xy.js, not src/xy.js
  basename.chomp(".coffee").chomp(".js")
end

# Wrap a block of code with progress indication
def progress_bar(&block)
  print "."
  yield
  print "."
end

namespace "deploy" do
  desc "Build and deploy to heroku"
  task :production do

    #!/usr/bin/ruby -w
    time = Time.new
    time = time.strftime("%Y-%m-%d_%H-%M")

    if File.directory? './heroku'
      sh 'cd ./heroku; git stash; git checkout master;'
      mv './heroku/public/javascripts/older', './heroku/older/'
      rmtree './heroku/public/javascripts/older'
      mv './heroku/public/javascripts', './heroku/older/' + time
      rmtree './heroku/public'
      cp_r './build', './heroku/'
      mkdir './heroku/public'
      mkdir './heroku/public/images'
      mkdir './heroku/public/stylesheets/'
      mv './heroku/build', './heroku/public/javascripts'
      mv './heroku/older', './heroku/public/javascripts/older/'
       sh 'cd ./heroku; git add -A .; git commit -m "automatic push to heroku"; git push heroku master -f'
    else
      print "No such dir: 'heroku"
    end
  end
end

namespace "backup" do
  desc "Create backup"
  task :all do

    #!/usr/bin/ruby -w
    time = Time.new
    time = time.strftime("%Y-%m-%d_%H-%M")

    if File.directory? './build'
      mv './build', './backup/javascript/' + time
      mkdir './build'
    else
      print "No such dir: 'build"
    end
  end
end

namespace "build" do
  desc "Build a single target in directory '#{src_dir}'"
  task :single, [:target] do |t, args|
    unless args.target
      puts "Invalid target!"
      puts
      puts "Usage:"
      puts "# rake #{t}[my_target]"
      puts
      puts "The file my_target.{coffee,js} must exist in #{src_dir}. It may contain sprocket directives //= require foo"
      puts
      exit
    end

    input = filename(args.target)
    output = File.join(build_dir, "#{input}.js")
    output_min = File.join(build_dir, "#{input}.min.js")
    bundle = nil
    print "Building #{input}"

    # get sprocket bundle
    progress_bar do
      bundle = environment[input].to_s
    end

    # write target file
    progress_bar do
      File.open(output, 'w') do |f|
        f.write bundle
      end
    end

    # write minified target file
    progress_bar do
      File.open(output_min, 'w') do |f|
        f.write Uglifier.compile(bundle)
      end
    end

    puts " done"
  end

  desc "Build all targets in directory '#{src_dir}'"
  task :all do
    puts "Deploy to production? (y/n)"
    #prompt = $stdin.gets.chomp

    Rake::Task["backup:all"].invoke(:all)

    path = File.join(src_dir, "*.{coffee,js}")

    Dir.glob(path) do |file|
      target = filename(file)
      Rake::Task["build:single"].reenable
      Rake::Task["build:single"].invoke target
    end
    #if prompt == "y" || prompt == "yes" || prompt == "Y"
    #  Rake::Task["deploy:production"].invoke(:all)
    #end
  end
end

namespace "clear" do
  desc "Clear everything in directory '#{build_dir}'"
  task :build do
    Dir.foreach(build_dir) do |file|
      next if file =~ /^[\.]/
      File.unlink File.join(build_dir, file)
    end
  end
end
