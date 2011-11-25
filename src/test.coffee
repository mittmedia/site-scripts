//= require "./lib/modern_js"
//= require "./lib/fusion"
//= require "./lib/adapt_logic"

#--------------------------------------------------------------------------------------
# Analytics
#--------------------------------------------------------------------------------------
#new @paper.google.Analytics('UA-XXXXX')

#--------------------------------------------------------------------------------------
# Fusion
#--------------------------------------------------------------------------------------
layouts = { 'nyheter.hofors': 'hoforslayout', 'test': 'testlayout' }

#path = window.location.pathname
path = "/nyheter/hofors/test.html"

fusion = new @paper.Fusion(path, 'mkt.gdse', 'nyheter.ettan', layouts, 'gd_1')

#console.log fusion.media_zone
#console.log fusion.layout

#fusion.setup_environment(fusion.media_zone, fusion.layout)

#--------------------------------------------------------------------------------------
# AdaptLogic
#--------------------------------------------------------------------------------------

department_mappings = { 'slaktvanner': 'familj', 'kulturnoje': 'noje' }

path = "/kulturnoje/test"

adapt_logic = new @paper.AdaptLogic(path, 'ostersundsposten', department_mappings, 'nyheter')

#console.log adapt_logic.department