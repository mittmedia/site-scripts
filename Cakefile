fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

src_dir = "src/websites"
build_dir = "build"
vendor_dir = "vendor"

task 'compile:src', "Compile #{src_dir}/*.coffee to #{build_dir}/", ->
  exec "coffee --output #{build_dir}/ --compile #{src_dir}/*.coffee", (err, stdout, stderr) ->
    #throw err if err
    if err
      util.log err
      util.log stderr
    else
      console.log "Compiled #{src_dir}/*.coffee to #{build_dir}/"

task 'compile:vendor', "Concatenate #{vendor_dir}/* into #{build_dir}/vendor.js", ->
  vendor_data = []
  vendor_files = fs.readdirSync("#{vendor_dir}")
  for file in vendor_files
    vendor_data.push fs.readFileSync "#{vendor_dir}/#{file}"
  fs.writeFileSync "#{build_dir}/vendor.js", vendor_data.join('\n')
  console.log "Compiled #{vendor_dir}/.js to #{build_dir}/vendor.js"

task 'compile', "Compile #{src_dir}/*.coffee and #{vendor_dir}/*.js", ->
  invoke 'compile:vendor'
  invoke 'compile:src'
