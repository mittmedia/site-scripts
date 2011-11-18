//= require "lib/module"

# @paper.google.Analytics
# Manages Google Analytics account and interaction
@module "paper.google", ->
  class @Analytics
    constructor: (@uid, @domain_name = null) ->
      window._gaq = window._gaq || []
      window._gaq.push ['_setAccount', @uid]
      if @domain_name and @domain_name.length > 2
        window._gaq.push ['_setDomainName', @domain_name]
      window._gaq.push ['_trackPageview']
      window._gaq.push ['_trackPageLoadTime']
      
      ga_tag = document.createElement('script')
      ga_tag.type = 'text/javascript'
      ga_tag.async = true
      ga_tag.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'
      first_script_tag = document.getElementsByTagName('script')[0]
      first_script_tag.parentNode.insertBefore(ga_tag, first_script_tag)
      return