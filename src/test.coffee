//= require "./lib/fusion"

#new @paper.google.Analytics('UA-XXXXX')

layouts = { 'nyheter.hofors': 'hoforslayout', 'test': 'testlayout' }

#path = window.location.pathname
path = "/nyheter/hofors/test.html"

fusion = new @paper.Fusion(path, 'mkt.gdse', 'nyheter.ettan', layouts, 'gd_1')

console.log fusion.media_zone
console.log fusion.layout

#fusion.setup_environment(fusion.media_zone, fusion.layout)
