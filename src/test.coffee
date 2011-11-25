//= require "./lib/fusion"

#new @paper.google.Analytics('UA-XXXXX')
layouts = { 'nyheter.hofors': 'hoforslayout', 'test2': 'blah2' }
fusion = new @paper.Fusion('mkt.gdse', 'nyheter.ettan', layouts, 'gd_1')
#fusion.setup_environment(fusion.media_zone, fusion.layout)
