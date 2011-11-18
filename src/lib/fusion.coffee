//= require "lib/module"

# @module "window.Fusion", ->
#    constructor: () ->

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