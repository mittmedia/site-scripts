require "sprockets"

task :default => "build:all"

build_dir = "build"
src_dir = "src"

environment = Sprockets::Environment.new
environment.append_path src_dir

def filename(file)
  basename = File.basename(file) # target single needs xy.js, not src/xy.js
  basename.chomp!(".coffee")
  basename.chomp!(".js")
end

namespace "build" do
  desc "Build a single target in directory #{src_dir}"
  task :single, [:target] do |t, args|
    unless args.target
      puts "Invalid target!"
      puts ""
      puts "Usage:"
      puts "# rake #{t}[:my_target]"
      puts ""
      puts "The file my_target.{coffee,js} must exist in #{src_dir}. It may contain sprocket directives //= require foo"
    end

    input = filename(args.target)
    output = File.join(build_dir, "#{input}.js")

    print "Compiling #{input}... "
    File.open(output, 'w') do |f|
      f.write environment[input]
    end
    puts "done"
  end

  desc "Build all targets in directory #{src_dir}"
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
  desc "Clear build directory: #{build_dir}"
  task :build do
    Dir.foreach(build_dir) do |file|
      next if file =~ /^[\.]/
      File.unlink File.join(build_dir, file)
    end
  end
end