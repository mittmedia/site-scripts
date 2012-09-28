var _gaq = _gaq || [];
var mm_currentSite;
var ADM_PL;

function recordOutboundLink(link, category, action) {
  try {
    var myTracker=_gat._getTrackerByName();
		_gaq.push(['b._trackEvent', category ,  action, window.location.href]);
    _gaq.push(['myTracker._trackEvent', category ,  action, window.location.href]);
    setTimeout('document.location = "' + link.href + '"', 100)
  }catch(err){}
}

var _mm_gaq = _mm_gaq || [];

if( document.getElementById('fusion_layoutExceptions') ) { eval(document.getElementById('fusion_layoutExceptions').innerHTML); }

document.observe("dom:loaded",function()
{
	if( mm_currentSite.onDomReady ) { mm_currentSite.onDomReady(); }

	//setTimeout("checkIframes()", 2000);
});

function mm_siteObject(args)
{
	this.registerGoogleAnalytics = function()
	{

		//_gaq.push(['_setAccount', this.googleAnalyticsId]);
		if( this.specialDomainName.length > 2 ) { _gaq.push(['_setDomainName', this.specialDomainName]); }
		_gaq.push(['_setAccount', this.googleAnalyticsId]);
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackPageLoadTime']);
		_gaq.push(['b._setAccount', 'UA-31522926-1']);
		if( this.specialDomainName.length > 2 ) { _gaq.push(['b._setDomainName', this.specialDomainName]); }
		_gaq.push(['b._setAllowLinker', true]);
		_gaq.push(['b._trackPageview']);
		_gaq.push(['b._trackPageLoadTime']);


/*		  ['_setAccount', this.googleAnalyticsId],
		  ['_trackPageview'],
			['_trackPageLoadTime'],
		  ['b._setAccount', 'UA-31522926-1'],
			['b._setAllowLinker', true],
		  ['b._setAllowLinker', true]
		);

		if( this.specialDomainName.length > 2 ) { _gaq.push(['_setDomainName', this.specialDomainName]); }


		if( this.specialDomainName.length > 2 ) {
			_gaq.push(['_setDomainName', this.specialDomainName]);
			_gaq.push(['b._setDomainName', this.specialDomainName]);
		}
*/

		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	}

	this.setupAdVariables = function()
	{
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

			//Remove hash-tags if there are any
			window.Fusion.mediaZone = window.Fusion.mediaZone.split("#",1)[0];

			window.Fusion.layout = (fusion_testmode) ? ((getUrlParam('layout'))?getUrlParam('layout'):layout) : layout;
			window.Fusion.parameters["url_path"] = self.location.pathname;
			window.Fusion.parameters["url"] = self.location.href;
			window.Fusion.loadAds();
			if( fusion_testmode ) { console.log(window.Fusion.mediaZone+"\n"+window.Fusion.layout); }

			this.setupAdaptLogicVariables(a_mediaZone[2]);

			this.admetaMediaZone = window.Fusion.mediaZone.replace("mkt." + a_mediaZone[1] + ".", "");
			this.admetaMediaZone = this.admetaMediaZone.replace(/\.\d\.\d+[^_]*/g, '');

			this.admetaAlias = a_mediaZone[1];

			this.admetaSpaceMap = new Array();

			this.admetaSpaceMap["ad_tester"] = {width: 1, height: 1, rank: 1};

			this.admetaSpaceMap["ad_artikel_special"] = {width: 200, height: 600, rank: 1};

			this.admetaSpaceMap["ad_980x160"] = {width: 980, height: 120, rank: 1};
			this.admetaSpaceMap["ad_980x160_2"] = {width: 980, height: 120, rank: 2};

			this.admetaSpaceMap["ad_280x280_1"] = {width: 250, height: 240, rank: 1};
			this.admetaSpaceMap["ad_280x280_2"] = {width: 250, height: 240, rank: 2};

			this.admetaSpaceMap["ad_250x250_1"] = {width: 250, height: 360, rank: 1};
			this.admetaSpaceMap["ad_250x250_2"] = {width: 250, height: 360, rank: 2};
			this.admetaSpaceMap["ad_250x250_3"] = {width: 250, height: 360, rank: 3};
			this.admetaSpaceMap["ad_250x250_4"] = {width: 250, height: 360, rank: 4};

			this.admetaSpaceMap["dt_ad_250x250_1"] = {width: 250, height: 240, rank: 1};
			this.admetaSpaceMap["dt_ad_250x250_2"] = {width: 250, height: 240, rank: 2};
			this.admetaSpaceMap["dt_ad_250x250_3"] = {width: 250, height: 240, rank: 3};
			this.admetaSpaceMap["dt_ad_250x250_4"] = {width: 250, height: 240, rank: 4};

			this.admetaSpaceMap["ad_250x800"] = {width: 250, height: 360, rank: 5};

			this.admetaSpaceMap["ad_250x500"] = {width: 250, height: 360, rank: 6};

			this.admetaSpaceMap["ad_468x300_1"] = {width: 468, height: 220, rank: 1};
			this.admetaSpaceMap["ad_468x300_2"] = {width: 468, height: 220, rank: 2};
			this.admetaSpaceMap["ad_468x300_3"] = {width: 468, height: 220, rank: 3};
			this.admetaSpaceMap["ad_468x300_4"] = {width: 468, height: 220, rank: 4};
			this.admetaSpaceMap["ad_468x300_5"] = {width: 468, height: 220, rank: 5};

			this.admetaSpaceMap["ad_200x220_1"] = {width: 200, height: 600, rank: 1};
			this.admetaSpaceMap["ad_200x220_2"] = {width: 200, height: 600, rank: 2};
			this.admetaSpaceMap["ad_200x220_3"] = {width: 200, height: 600, rank: 3};
			this.admetaSpaceMap["ad_200x220_4"] = {width: 200, height: 600, rank: 4};
			this.admetaSpaceMap["ad_200x220_5"] = {width: 200, height: 600, rank: 5};
			this.admetaSpaceMap["ad_200x220_6"] = {width: 200, height: 600, rank: 6};
			this.admetaSpaceMap["ad_200x220_7"] = {width: 200, height: 600, rank: 7};

			this.admetaSpaceMap["ad_artikel_2"] = {width: 200, height: 600, rank: 1};
			this.admetaSpaceMap["ad_artikel_3"] = {width: 468, height: 220, rank: 1};

			this.admetaLoadAd = function(fusion_space_name) {
				if(this.admetaSpaceMap[fusion_space_name]) {
					var ASM = this.admetaSpaceMap[fusion_space_name];
					ADM_PL = {tp:'sp', pbId:22, Site:this.admetaAlias, Page:this.admetaMediaZone+'_' + fusion_space_name, Width:ASM.width, Height:ASM.height, Rank:ASM.rank, clk:'[External click-tracking here]'}
					Admeta.processImpressions();
				}
			}

			this.admetaLoadAdAsync = function(fusion_space_name, fusion_space_id) {
				if(this.admetaSpaceMap[fusion_space_name]) {
					var ASM = this.admetaSpaceMap[fusion_space_name];
					ADM_PL = {tagId: fusion_space_id, pbId:22, Site:this.admetaAlias, Page:this.admetaMediaZone+'_' + fusion_space_name, Width:ASM.width, Height:ASM.height, Rank:ASM.rank, clk:'[External click-tracking here]'}
					window._Admeta=window._Admeta||{};
					(function(){
						window._Admeta.aTags=window._Admeta.aTags||[];
						window._Admeta.aTags.push(ADM_PL);
						if(window.Admeta&&window.Admeta.processAsync) window.Admeta.processAsync();
						else if(window._Admeta.aTags.length==1){
							window.ajs=document.createElement("script");
							ajs.async = true;
							ajs.type = "text/javascript";
							ajs.src = "http://s.atemda.com/Admeta.js";
							window.node=document.getElementsByTagName("script")[0];
							node.parentNode.insertBefore(ajs, node);
						}
					})();
				}
			}
			/*
			this.admetaLoadAdAsync_OLD = function(fusion_space_name, fusion_space_id) {
				if(this.admetaSpaceMap[fusion_space_name]) {
					var ASM = this.admetaSpaceMap[fusion_space_name];
					ADM_PL = {tagId: fusion_space_id, tp:'sp', pbId:22, Site:this.admetaAlias, Page:this.admetaMediaZone+'_' + fusion_space_name, Width:ASM.width, Height:ASM.height, Rank:ASM.rank , clk:'[External click-tracking here]'}
					Admeta=window.Admeta||{};
					(function(){
					  Admeta.aTags=Admeta.aTags||[];
					  Admeta.aTags.push(ADM_PL);
					  ajs=document.createElement("script");
					  ajs.async = true;
					  ajs.type = "text/javascript";
					  ajs.src = "http://s.atemda.com/Admeta.js";
					  window.node=document.getElementsByTagName("script")[0];
					  node.parentNode.insertBefore(ajs, node);
					})();
				}
			}	*/
		}
	}


	this.setupAdaptLogicVariables = function(department)
	{
		if( department && this.generateAdaptLogicZone && this.adaptLogicAlias )
		{
			this.adaptLogicZone = this.generateAdaptLogicZone(department);
			if( this.adaptLogicZone )
			{
				this.adaptLogicServer = "http://oas.tidningsnatet.se";
				this.adaptLogicPosition = "Position1!Position1";
				this.adaptLogicSitepage = this.adaptLogicAlias + "/artikel/" + this.adaptLogicZone;
			}
		}
	}

	for(var arg in args) { eval("this."+arg+" = args['"+arg+"'];"); }
	this.fusionLayouts = (fusion_layoutExceptions) ? fusion_layoutExceptions : new Array();
	this.fusionLayouts['standard'] = this.defaultFusionLayout;
	if( this.googleAnalyticsId && this.googleAnalyticsId != 'UA-XXXXXXX-X' ) { this.registerGoogleAnalytics(); }
	this.setupAdVariables();
}

var mm_processUrl = function()
{
	var href = window.location.href.replace(/(\?)+([\S])*/gi,'');
	href = href.replace(/https?:\/\/([-\w\.]+(\/))/gi,'');
	if( href.charAt(href.length-1) == '/' ) href = href.substr(0,href.length-1);
	return href;
};

var inArray = function(a,v){ for(var i=0, ln=a.length; i<ln; i++) { if(a[i] == v) return true; } return false; };
var regexInArray = function(arr,str) { for(var i=0,ln=arr.length;i<ln;i++) { var regex = new RegExp(arr[i]); if( str.match(regex) ) return true; } return false; }

/* Hämta en parameter från URL:en */
var getUrlParam = function(pn){
	var strReturn = ""; var strHref = window.location.href;
	if( strHref.indexOf("?") > -1 ) {
		var strQueryString = strHref.substr(strHref.indexOf("?"));
		var aQueryString = strQueryString.split("&");
		for( var iParam = 0; iParam < aQueryString.length; iParam++ ){
			if( aQueryString[iParam].indexOf(pn + "=") > -1 ){
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
    	}
  	}
	return unescape(strReturn);
};


function appendServicefinderIframe(imgNode,width,height,mainWrapperWidth)
{
	if( mm_currentSite && mm_currentSite.servicefinderId )
	{
		var inlineCss = "<style type=\"text/css\" media=\"all\">\n#AttentionTeaserWrapper { width:"+width+"px !important; }\n";
		if( mainWrapperWidth ) {
			inlineCss += "\n.column.mainContainer { width:"+mainWrapperWidth+"px; }\n";
		}
		inlineCss += "</style>\n";

		var cssNode = document.createElement('span');
		cssNode.innerHTML = inlineCss;
		imgNode.parentNode.insertBefore(cssNode,imgNode);

		var sf_url = "http://www.servicefinder.se/partner/stampen/"+mm_currentSite.servicefinderId;
		var url = window.location.href;

		if( url.match(/(categoryid\=)+([0-9])/gi) )
		{
			var a_sub = url.split('categoryid=');
			sf_url += '/kategori/'+a_sub[a_sub.length-1];
		}

		var spanNode = document.createElement('span');
		spanNode.innerHTML = '<iframe name="servicefinder" src="'+sf_url+'" width="'+width+'" scrolling="no" height="'+height+'" frameborder="0"></iframe>';
		imgNode.parentNode.insertBefore(spanNode,imgNode);

	}
}


/* Ta GET-parameter och stoppa in i iFrame och ladda om denna. Bra för t.ex. OS-sajten */
var modIframe = function(p,s){var rx=new RegExp(s,"g");if(getUrlParam(p)){var sp=document.getElementById('startpageContainer');if(sp){var aifs=sp.getElementsByTagName('iframe');for(var i in aifs){if(aifs[i].name&&aifs[i].name.match(rx)){aifs[i].src=getUrlParam(p);break;}}}}};


