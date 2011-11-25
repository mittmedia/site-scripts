//= require "lib/module"

@module "paper", ->
  class @Fusion
    constructor: (path, base_zone, default_zone, layouts, default_layout, subdomain = null) ->
      media_zone_path = @get_media_zone_path(path, default_zone)
      @media_zone = @get_media_zone(media_zone_path, [base_zone, subdomain], default_zone)
      @layout = @get_layout(media_zone_path, layouts, default_layout)
      
    get_media_zone_path: (path, default_zone) ->
      pieces = path.split("/")
      # remove empty pieces from extra slashes
      pieces = pieces.filter (piece) -> piece != ""
      # remove last path piece if it contains a dot (like "something.html")
      pieces.pop() if pieces.length > 0 and pieces[pieces.length - 1].indexOf(".") >= 0
      # use default zone if none
      pieces.push(default_zone) if pieces.length == 0
      return pieces.join(".")
    
    get_media_zone: (zone_path, zones, default_zone) ->
      # remove zones that are null
      zones = zones.filter (zone) -> zone? and zone != ""
      # return arrays joined with a dot
      return zones.concat(zone_path).join(".")
    
    get_layout: (zone_path, layouts, default_layout) ->
      layouts[zone_path] ||= default_layout
    
    setup_environment: (media_zone = @media_zone, layout = @layout) ->
      window.Fusion.adServer = "fusion.adtoma.com"
      window.Fusion.mediaZone = media_zone
      window.Fusion.layout = layout
      window.Fusion.parameters["url_path"] = window.location.pathname
      window.Fusion.parameters["url"] = window.location.href
      window.Fusion.loadAds()


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