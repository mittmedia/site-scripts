//= require "lib/module"

@module "paper", ->
  class @Fusion
    constructor: (alias, mediazone, layout, subdomain = null) ->
      #url = window.location.href
      url = "http://gd.se/nyheter/hofors/test.html?test=one&something=two"
      media_zones = @set_media_zones(url, 'mkt', alias, subdomain)
    
    set_media_zones: (url, zones...) ->
      # remove zones that are null
      zones = zones.filter (zone) -> zone?
      # remove protocol and querystring from url, and split into pieces
      url_pieces = url.split("://").pop().split("?").shift().split("/")
      #remove domain name 
      url_pieces.shift() if url_pieces.length > 1
      # remove last path piece if it contains a dot (like "something.html")
      url_pieces.pop() if url_pieces[url_pieces.length - 1].indexOf(".") >= 0

      return zones.concat(url_pieces).join(".")
      
      

###      
if( !window.Fusion.adServer )
{
	var fusion_testmode = getUrlParam('fusion_testmode');
	var a_mediaZone = (this.subdomain) ? new Array('mkt',this.alias,this.subdomain) : new Array('mkt',this.alias);
	var layout = this.fusionLayouts['standard'];
	var href = mm_processUrl();

	if( href ) {
		var a_url = href.split('/');
		for(var i=0,ln=a_url.length;i<ln;i++) {
			a_mediaZone[a_mediaZone.length] = a_url[i];
			if( ln == 1 && a_mediaZone.length == 3 ) i--;
		}
	}
	else { a_mediaZone[a_mediaZone.length+1] = a_mediaZone[a_mediaZone.length] = this.defaultFusionMediaZone; }

	if( this.fusionLayouts[a_mediaZone[3]] ) layout = this.fusionLayouts[a_mediaZone[3]];

	this.fusionMediaZone = a_mediaZone.join('.');

	window.Fusion.adServer = "fusion.adtoma.com";
	window.Fusion.mediaZone = (fusion_testmode) ? ((getUrlParam('mediazone'))?getUrlParam('mediazone'):this.fusionMediaZone) : this.fusionMediaZone;
	window.Fusion.layout = (fusion_testmode) ? ((getUrlParam('layout'))?getUrlParam('layout'):layout) : layout;
	window.Fusion.parameters["url_path"] = self.location.pathname;
	window.Fusion.parameters["url"] = self.location.href;
	window.Fusion.loadAds();
	if( fusion_testmode ) { console.log(window.Fusion.mediaZone+"\n"+window.Fusion.layout); }

	this.setupAdaptLogicVariables(a_mediaZone[2]);
}
###