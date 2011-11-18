var _gaq = _gaq || [];
var mm_currentSite;

if( document.getElementById('fusion_layoutExceptions') ) { eval(document.getElementById('fusion_layoutExceptions').innerHTML); }

document.observe("dom:loaded",function()
{
	if( mm_currentSite.onDomReady ) { mm_currentSite.onDomReady(); }
	
	setTimeout("checkIframes()", 2000);
});

function mm_siteObject(args)
{
	this.registerGoogleAnalytics = function()
	{
		_gaq.push(['_setAccount', this.googleAnalyticsId]);
		if( this.specialDomainName.length > 2 ) { _gaq.push(['_setDomainName', this.specialDomainName]); }
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackPageLoadTime']);

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
			window.Fusion.layout = (fusion_testmode) ? ((getUrlParam('layout'))?getUrlParam('layout'):layout) : layout;
			window.Fusion.parameters["url_path"] = self.location.pathname;
			window.Fusion.parameters["url"] = self.location.href;
			window.Fusion.loadAds();
			if( fusion_testmode ) { console.log(window.Fusion.mediaZone+"\n"+window.Fusion.layout); }
			
			this.setupAdaptLogicVariables(a_mediaZone[2]);
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

/* Ta reda på skärmhöjd och bredd */
var getClientHeight = function() { return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight; };
var getClientWidth = function() { return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth; };

/* Ta reda på scrollbarens y-position */
var getScrollY = function() {
  var scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) { scrOfY = window.pageYOffset; }
  else if( document.body && document.body.scrollTop ) { scrOfY = document.body.scrollTop; }
  else if( document.documentElement && document.documentElement.scrollTop ) { scrOfY = document.documentElement.scrollTop; }
  return scrOfY;
};

var getScrollXY = function() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) { scrOfY = window.pageYOffset; scrOfX = window.pageXOffset; }
  else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) { scrOfY = document.body.scrollTop; scrOfX = document.body.scrollLeft; }
  else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
};

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

/* Fredrik Sundströms iFrame-fix */
var checkIframes = function() {
	$$('#lookIframe').each(function(ifrm) { ifrm.src = ifrm.src; ifrm.style.display = "block"; });
	$$('#articleContainer iframe').each(function(ifrm) { ifrm.src = ifrm.src; ifrm.style.display = "block"; });
	$$('iframe.webClipIframe').each(function(ifrm) { ifrm.src = ifrm.src; ifrm.style.display = "block"; });
	$$('iframe.iframefix').each(function(ifrm) { ifrm.src = ifrm.src; ifrm.style.display = "block"; });
	$$('.iframefix iframe').each(function(ifrm) { ifrm.src = ifrm.src; ifrm.style.display = "block"; });
};

/* Ta GET-parameter och stoppa in i iFrame och ladda om denna. Bra för t.ex. OS-sajten */
var modIframe = function(p,s){var rx=new RegExp(s,"g");if(getUrlParam(p)){var sp=document.getElementById('startpageContainer');if(sp){var aifs=sp.getElementsByTagName('iframe');for(var i in aifs){if(aifs[i].name&&aifs[i].name.match(rx)){aifs[i].src=getUrlParam(p);break;}}}}};

/* Syns elementet i bild? */
var isScrolledIntoView = function(elem) {
	if( elem.offsetTop && elem.offsetHeight ) {
		var a_scroll = getScrollXY();
		var docViewBottom = a_scroll[1] + getClientHeight();
		var elemTop = elem.offsetTop;
		var elemBottom = elemTop + elem.offsetHeight;
		return ((elemBottom >= a_scroll[1]) && (elemTop <= docViewBottom));
	}
	else return false;
};

/* JSON-funktionalitet */
JSONscriptRequest.scriptCounter = 1;
function JSONscriptRequest(fullUrl) {
    this.fullUrl = fullUrl; 
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    this.headLoc = document.getElementsByTagName("head").item(0);
    this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
}

JSONscriptRequest.prototype.buildScriptTag = function () {
    this.scriptObj = document.createElement("script");
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
}
JSONscriptRequest.prototype.removeScriptTag = function () { this.headLoc.removeChild(this.scriptObj); };
JSONscriptRequest.prototype.addScriptTag = function () { this.headLoc.appendChild(this.scriptObj); };