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

    # get sprocket bundle
    print "Compiling #{input}... "
    bundle = environment[input]

    # write target file
    File.open(output, 'w') do |f|
      f.write bundle
    end

    # write minified target file
    File.open(output_min, 'w') do |f|
      f.write Uglifier.compile(bundle.to_s)
    end

    puts "done"
  end

  desc "Build all targets in directory '#{src_dir}'"
  task :all do
    path = File.join(src_dir, "*.{coffee,js}")

    Dir.glob(path) do |file|
      target = filename(file)
      Rake::Task["build:single"].reenable
      Rake::Task["build:single"].invoke target
    end
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
