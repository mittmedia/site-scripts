EAS_flash = 1;
EAS_proto = "http:";
if (location.protocol == "https:") {
   EAS_proto = "https:";
}
if (document.getElementById) {
   EAS_dom = true;
} else {
   EAS_dom = false;
}
EAS_server = EAS_proto + "//eas8.emediate.eu";

function EAS_load(url) {
	document.write('<scr' + 'ipt language="JavaScript" src="' + url + '"></sc' + 'ript>');
}

function EAS_init(pages, parameters) {
	var EAS_ord=new Date().getTime();
	var EAS_url = EAS_server + "/eas?target=_blank&EASformat=jsvars&EAScus=" + pages + "&ord=" + EAS_ord;

	EAS_detect_flash();

	EAS_url += "&EASflash=" + EAS_flash;

	if (parameters) EAS_url += "&" + parameters;

	EAS_load(EAS_url);

	return;
}

function EAS_detect_flash() {
   if (EAS_flash > 1) return;

	var maxVersion = 11;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;

	// write vbscript detection if we're not on mac.
	if(isIE && isWin && !isOpera){ 
		document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
		document.write('on error resume next \nDim eas_flobj(' + maxVersion + ') \n');
		for (i = 2; i < maxVersion; i++) {
			document.write('Set eas_flobj(' + i + ') = CreateObject("ShockwaveFlash.ShockwaveFlash.' + i + '") \n');
			document.write('if(IsObject(eas_flobj(' + i + '))) Then EAS_flash='+i+' \n');
		}
		document.write('</SCR' + 'IPT\> \n'); // break up end tag so it doesn't end our script
	} else if (navigator.plugins) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]){

			var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;
			var flashVersion = parseInt(flashDescription.substr(flashDescription.indexOf(".") - 2, 2), 10);

			if (flashVersion > 1) EAS_flash = flashVersion;
		}
	}

	// alert("Version is " + EAS_flash);

}

function EAS_show_flash(width, height, src, extra) {
   var EAS_args = [];
   if (extra) EAS_args = extra.split(",");

   document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + width + '" height="' + height + '"><param name=src value=' + src + '>');
   for (i = 0; i < EAS_args.length; i++) {
      EAS_eq = EAS_args[i].indexOf('=');
      EAS_nv0 = EAS_args[i].substring(0, EAS_eq );
      EAS_nv1 = EAS_args[i].substring(EAS_eq+1, EAS_args[i].length);
      document.write('<param name="' + EAS_nv0 + '" value="' + EAS_nv1 + '">');
   }
   document.write('<embed src="' + src + '" width="' + width + '" height="' + height + '" type="application/x-shockwave-flash"');
   for (i = 0; i < EAS_args.length; i++) {
      EAS_eq = EAS_args[i].indexOf('=');
      EAS_nv0 = EAS_args[i].substring(0, EAS_eq );
      EAS_nv1 = EAS_args[i].substring(EAS_eq+1, EAS_args[i].length);

      document.write(' ' + EAS_nv0 + '="' + EAS_nv1 + '"');
   }
   document.write('></embed></object>');
}

function EAS_embed_flash(width, height, src, params, flashvars, events, eventurl) {
   var par = "";
   var flashID = new Date().getTime() + "" + Math.floor(Math.random() * 11);
   if (params) {
      var args = [];
      var eq, nv0, nv1;
      args = params.split(',');
      for (i = 0; i < args.length; i++) {
         eq = args[i].indexOf('=');
         nv0 = args[i].substring(0, eq);
         nv1 = args[i].substring(eq + 1, args[i].length);
         if (nv0.toLowerCase() == 'flashvars')
            flashvars += (flashvars ? "&" : "") + nv1;
         else
            par += '<param name="' + nv0 + '" value="' + nv1 + '" />';
      }
   }

   if (events && eventurl) {
      var args = [];
      args = events.split(",");
      for (i = 0; i < args.length; i++) {
         flashvars += (flashvars ? "&" : "") + args[i] + "=" + eventurl + args[i];
      }
   }

   if (flashvars)
      par += '<param name="FlashVars" value="' + flashvars + '" />';

   document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + width + '" height="' + height + '" id="eas_' + flashID + '"><param name="movie" value="' + src + '" />');
   if (params) document.write(par);

   document.write('<!--[if !IE]>-->');
   document.write('<object type="application/x-shockwave-flash" data="' + src + '" width="' + width + '" height="' + height + '">');
   if (params) document.write(par);
   document.write('</object>');
   document.write('<!--<![endif]-->');

   document.write('</object>');

   return;
}

function EAS_statistics() {

   var t = new Date();
   var EAS_time = t.getTime();
   var bWidth = 0;
   var bHeight = 0;
   var cdepth = 0;
   var plugins = "";
   var tmz = t.getTimezoneOffset() / 60;
   if (navigator.plugins) {
      var p = navigator.plugins;
      var pArr = new Array();
      for (var i = 0; i < p.length; i++) {
         if (p[i].name.indexOf("RealPlayer") != -1) pArr[0] = 1;
         else if (p[i].name.indexOf("Adobe Reader") != -1) pArr[1] = 1;
         else if (p[i].name.indexOf("Adobe Acrobat") != -1) pArr[1] = 1;
         else if (p[i].name.indexOf("Windows Media Player") != -1) pArr[2] = 1;
         else if (p[i].name.indexOf("QuickTime") != -1) pArr[3] = 1;
      }
      for (var i = 0; i < 4; i++) if (pArr[i]) plugins += i + ",";
   }

   if (typeof(EAS_cu) == "undefined") return;
   if (EAS_flash == 1) EAS_detect_flash();

   if (screen && screen.colorDepth) cdepth = screen.colorDepth;

   if (document.body && document.body.clientHeight > 50) {
      bWidth = document.body.clientWidth;
      bHeight = document.body.clientHeight;
   } else if (document.documentElement && document.documentElement.clientHeight > 50) {
      bWidth = document.documentElement.clientWidth;
      bHeight = document.documentElement.clientHeight;
   } else if (typeof(window.innerHeight == 'number')) {
      bWidth = window.innerWidth;
      bHeight = window.innerHeight;
   }

   var EAS_stat_tag = EAS_server + '/eas?cu=' + EAS_cu + ';ord=' + EAS_time;
   EAS_stat_tag += ';logrest=width=' + screen.width + ';height=' + screen.height + ';bwidth=' + bWidth + ';bheight=' + bHeight + ';time=' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
   EAS_stat_tag += ";tmz=" + tmz;
   if (EAS_flash > 2) EAS_stat_tag += ';flash=' + EAS_flash;
   if (typeof(EAS_page) != "undefined") EAS_stat_tag += ';page=' + EAS_page;
   if (typeof(java) != "undefined" && java.installed) EAS_stat_tag += ';jversion=' + java.lang.System.getProperty("java.version");
   if (typeof(EAS_jsversion) != "undefined") EAS_stat_tag += ';jsversion=' + EAS_jsversion;
   if (cdepth) EAS_stat_tag += ';cdepth=' + cdepth;
   if (plugins) EAS_stat_tag += ';plugins=' + plugins;
   if (document.referrer) EAS_stat_tag += ';ref=' + escape(document.referrer);
   if (document.location) EAS_stat_tag += ';url=' + escape(document.location);
   if (typeof(EAS_capture) != "undefined") EAS_stat_tag += ';EAScapture=' + escape(EAS_capture);

   document.write('<img width="1" height="1" src="' + EAS_stat_tag + '">');
}

function EAS_duplicate(cu, expires) {
   var cookie_arr = document.cookie.split('; ');
   var nv_arr;
   var cu_arr;
   var duplicate = 0;
   var found_cu = 0;
   var now = Math.round(new Date().getTime() / 1000);
   var new_cookie = "";
   if (cookie_arr.length > 0) {
      for (var i = 0; i < cookie_arr.length; i++) {
         nv_arr = cookie_arr[i].split('=');
         if (nv_arr[0] == 'eas_dup') {
            cu_arr = nv_arr[1].split(':');
            for (var j = 0; j < cu_arr.length; j++) {
               cu_val = cu_arr[j].split('_');
               if (now - cu_val[1] < expires) {
                  if (cu_val[0] == cu) {
                     found_cu = 1;
                     duplicate = 1;
                     break;
                  } else {
                     if (new_cookie) new_cookie += ":";
                     new_cookie += cu_arr[j];
                  }
               }
            }
            break;
         }
      }
   }

   if (!duplicate) {
      if (!found_cu) {
         if (new_cookie) new_cookie += ":";
         new_cookie += cu + "_" + now;
      }
      document.cookie = "eas_dup=" + new_cookie + "; path=/; expires=Mon, 16-Mar-20 01:00:00 GMT;";
   }
   if (duplicate) return true;
   return false;
}

function EAS_place_ad(cus, EAS_options) {
   if(!EAS_dom) return;
   var set_size = 1;
   var safe_log = 0;
   var move_pos = 1;
   if (EAS_options) {
      var EAS_options_arr = EAS_options.split(",");
      for (var i = 0; i < EAS_options_arr.length; i++) {
         var EAS_temp = EAS_options_arr[i].split("=");
         var EAS_temp_val = 0;
         if (EAS_temp[1] == "1" || EAS_temp[1] == "y" || EAS_temp[1] == "yes") {
            EAS_temp_val = 1;
         }
         if (EAS_temp[0] == "set_size") set_size = EAS_temp_val;
         else if (EAS_temp[0] == "safe_log") safe_log = EAS_temp_val;
         else if (EAS_temp[0] == "move_pos") move_pos = EAS_temp_val;
      }
   }

   var EAS_cu_arr = cus.split(",");
   for (var i = 0; i < EAS_cu_arr.length; i++) {
      var EAS_cu = EAS_cu_arr[i];
      if (set_size || move_pos) {
         var EAS_temp = "EAS_position_" + EAS_cu;
         var EAS_div_position = document.getElementById(EAS_temp);
         if (EAS_div_position) {
            EAS_temp = "EAS_tag_" + EAS_cu;
            var EAS_div_tag = document.getElementById(EAS_temp);
            if (EAS_div_tag) {
               if (set_size) {
                  var EAS_width = eval("EAS_found_width_" + EAS_cu);
                  var EAS_height = eval("EAS_found_height_" + EAS_cu);
                  if (EAS_width && EAS_height) {
                     EAS_div_position.style.width = EAS_width + "px";
                     EAS_div_position.style.height = EAS_height + "px";
                  }
               }
               if (move_pos) {
                  var EAS_pos_top = EAS_pos_left = 0;
                  var EAS_pos_obj = EAS_div_position;
                  if (EAS_pos_obj.offsetParent) {
                     do {
                        EAS_pos_top += EAS_pos_obj.offsetTop;
                        EAS_pos_left += EAS_pos_obj.offsetLeft;
                     } while (EAS_pos_obj = EAS_pos_obj.offsetParent);
                     EAS_div_tag.style.position = "absolute";
                     EAS_div_tag.style.top = EAS_pos_top + "px";
                     EAS_div_tag.style.left = EAS_pos_left + "px";
                  }
               }
               EAS_div_tag.style.display = "block";
            }
         }
      }
      if (safe_log) {
         var confirm_img_src = eval("EAS_confirm_" + EAS_cu);
         if (confirm_img_src) {
            var confirm_img = new Image(1,1);
            confirm_img.src = confirm_img_src;
         }
      }
   }
}

function EAS_load_fif(divId, fifSrc, easSrc, width, height) {
   var d = document,
       fif = d.createElement("iframe"),
       div = d.getElementById(divId);

   fif.src = fifSrc;
   fif.style.width = width + "px";
   fif.style.height = height + "px";
   fif.style.margin = "0px";
   fif.style.borderWidth = "0px";
   fif.style.padding = "0px";
   fif.scrolling = "no";
   fif.frameBorder = "0";
   fif.allowTransparency = "true";
   fif.EAS_src = easSrc;
   div.appendChild(fif);
}

function EAS_resize_fif(expand, width, height) {
   if (typeof inDapIF !== "undefined") {
      var fif = window.frameElement;

      if (expand) {
         fif._width = fif.style.width;
         fif._height = fif.style.height;
         fif.style.width = width + "px";
         fif.style.height = height + "px";
      } else {
         fif.style.width = fif._width;
         fif.style.height = fif._height;
      }
   }
}
;
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
			if( this.fusionLayouts[a_mediaZone[4]] ) layout = this.fusionLayouts[a_mediaZone[4]];
			if( this.fusionLayouts[a_mediaZone[5]] ) layout = this.fusionLayouts[a_mediaZone[5]];

			this.fusionMediaZone = a_mediaZone.join('.');

			if(this.fusionMediaZone.indexOf("resor") > 0) {
				layout = "mm_resor";
			}

			this.short_media_zone = this.fusionMediaZone.replace("mkt." + a_mediaZone[1] + ".", "");

			if( this.fusionLayouts[this.short_media_zone] ) layout = this.fusionLayouts[this.short_media_zone];

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

			this.admetaMediaZone = this.short_media_zone
			this.admetaMediaZone = this.admetaMediaZone.replace(/\.\d\.\d+[^_]*/g, '');

			this.admetaAlias = a_mediaZone[1];

			this.admetaSpaceMap = new Array();

			this.admetaSpaceMap["ad_tester"] = {width: 1, height: 1, rank: 1};

			this.admetaSpaceMap["ad_artikel_special"] = {width: 200, height: 600, rank: 1};

			this.admetaSpaceMap["ad_980x160"] = {width: 980, height: 120, rank: 1};
			this.admetaSpaceMap["ad_980x160_2"] = {width: 980, height: 120, rank: 2};
			this.admetaSpaceMap["ad_box_1"] = {width: 250, height: 360, rank: 1};

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
			this.admetaSpaceMap["ad_250x800_2"] = {width: 250, height: 360, rank: 6};
			this.admetaSpaceMap["ad_250x800_3"] = {width: 250, height: 360, rank: 7};

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
					return true;
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





var local_generateAdaptLogicZone = function(department)
{
  /* nyheter,sport,noje,ekonomi,familj,resor,bostad,motor,mat-dryck */
  switch(department)
  {
    case 'sport':
    case 'noje':
    case 'ekonomi':
    case 'familj': return department;
    default: return 'nyheter';
  }
};

var local_domReady = function() { };

var stnu_subdomain = (window.location.href.match(/look\.st\.nu/gi)) ? 'look' : ((window.location.href.match(/guiden\.st\.nu/gi))?'guiden':'');

if( !mm_currentSite )
{
  mm_currentSite = new mm_siteObject({
      'alias' : 'stnu',
      'googleAnalyticsId' : ((stnu_subdomain)?((stnu_subdomain=='look')?'UA-1246581-24':'UA-1246581-18'):'UA-1246581-1'),
      'specialDomainName' : 'none',
      'subdomain' : stnu_subdomain,
      'defaultFusionMediaZone' : 'start',
      'defaultFusionLayout' : ((stnu_subdomain && stnu_subdomain=='look')?'st_3':'st_2'),
      'fusionMediaZone' : '',
      'fusionLayouts' : '',
      'adaptLogicAlias' : 'sundsvallstidning',
      'adaptLogicZone' : '',
      'generateAdaptLogicZone' : local_generateAdaptLogicZone,
      'onDomReady' : local_domReady
      });
}

//Start funktionalitet för Stenstan toppbanner
var a_stenstanAds = new Array();
var stenstanImages = new Array();
var stenstanPos = 0;
var stenstanImgPos = 0;
var stenstanTest = 0;
function stenstanAd(filename,company_id,parent_id,num) {
  this.company_id = company_id;
  this.filename = filename;
  this.filepath = 'http://2.st.nu/webdisplay/ads/55/'+this.company_id+'/ad/'+filename;
}
function getStenstanAds(mainNode) {
  var jsonObj = new JSONscriptRequest('http://2.st.nu/stenstan/ads.php?param=12');
  jsonObj.buildScriptTag();
  jsonObj.addScriptTag();
}
function initStenstanAds(arr) {
  if( arr ) {
    for(var i=0, ln=arr.length; i<ln; i++) { a_stenstanAds[a_stenstanAds.length] = new stenstanAd(arr[i].filename,arr[i].company_id,'',i); }
    if( a_stenstanAds.length ) { stenstanLoop('init'); }
  }
}
function modStenstan() {
  var a_u = window.location.href.split('stenstanUrl'); var s = a_u[a_u.length-1]; s = s.substr(1,s.length);
  var sp=document.getElementById('stenstanIframe'); if(sp) { sp.src=s; }
}
function setStenstanExpo(filename) {
  var jsonObj = new JSONscriptRequest('http://2.st.nu/stenstan/index.php?method=expo&filename='+filename);
  jsonObj.buildScriptTag(); jsonObj.addScriptTag();
}
function stenstanLoop(m)
{ 
  var sleep = 4000;
  if( m != 'init' && stenstanImgPos != 2 ) { sleep = 500; }
  var path = 'http://2.st.nu/stenstan/index.php?method=click&filename=';
  if( m=='init' || !m && isScrolledIntoView(document.getElementById('stenstanTop')) )
  {
    //IE6 Fix
    var tp = document.getElementById('adTop');
    if( tp.getElementsByTagName('div')[0].className && tp.getElementsByTagName('div')[0].className == 'advertising' ) { tp.getElementsByTagName('div')[0].className = ''; }
    
    var numAds = 1; var n,a;
    var filenames = '';
    
    if( stenstanTest ) {
      if( document.getElementById('stenstanTest') ) { var t = document.getElementById('stenstanTest'); }
      else
      {
        var t = document.createElement('div'); t.id='stenstanTest'; ts = t.style; ts.position='absolute';
        ts.top='200px'; ts.left='1400px'; ts.zIndex = 100; document.body.appendChild(t);
      }
      t.innerHTML += (m=='init') ? ' init ' : ' loop ';
    }
    
    if( m == 'init' )
    {
      var a,a0,a1,a2,sleep;
      numAds = 3;
      for(var i=0;i<3;i++) { eval("a"+i+"=document.getElementById('stenstan"+i+"');"); }
    }
    else { a = document.getElementById('stenstan'+stenstanImgPos); n = document.getElementById('stenImg'+stenstanImgPos); }
    
    if( (!m && a ) || (m=='init' && a0 && a1 && a2 ) )
    {
      for(var i=0;i<numAds;i++){
        eval("a"+((!m)?"":stenstanImgPos)+".style.backgroundImage='url("+a_stenstanAds[stenstanPos].filepath+")'; a"+((!m)?"":stenstanImgPos)+".href=path+'"+a_stenstanAds[stenstanPos].filename+"'; filenames+='"+a_stenstanAds[stenstanPos].filename+",'; if((stenstanPos+1)<a_stenstanAds.length){stenstanPos++;} else{sleep=14000;stenstanPos=0;}stenstanImgPos=(stenstanImgPos==2)?0:(stenstanImgPos+1);");                                            
      }
      
      if(filenames) { filenames = filenames.substr(0,filenames.length-1); /*setStenstanExpo(filenames);*/ }
    }
  }
  setTimeout(stenstanLoop,sleep);
}
//Slut på funktionalitet för Stenstan toppbanner

//Funktionalitet för att visa WD singelannons (t.ex. för O'Learys)
var loadWDSoloAd = function(n,pid,cid) {
  n.parentNode.id = 'wd_solo_'+pid+'_'+cid;
  var jsonObj = new JSONscriptRequest('http://2.st.nu/webdisplay/ads/'+pid+'/'+cid+'/index.html?method=single');
  jsonObj.buildScriptTag(); jsonObj.addScriptTag();
};
var replaceWDSoloAd = function(s,id) {
  if( document.getElementById(id) ) { document.getElementById(id).innerHTML = s; }
};
var regWDSingleAd = function(n) {
  
  if( n.nextSibling && n.nextSibling.innerHTML && n.nextSibling.innerHTML.match(/bannerid=/g) )
  {
    var pcs = n.nextSibling.innerHTML.split('bannerid='); var a_bid = pcs[1].split('&'); var bid = a_bid[0].replace(/[^0-9]/gi,'');
    var pcs2 = pcs[1].split('zoneid='); var a_zid = pcs2[1].split('&'); var zid = a_zid[0].replace(/[^0-9]/gi,'');
    return regClick(bid,zid);
  }
  return false;
};
//Slut på funktionalitet för att visa WD singelannons (t.ex. för O'Learys)

//Extra funktionalitet för modalfönstret
if(typeof ModalWindow != 'undefined'){
    ModalWindow.time = {
        delay : 210, // how long to show loader before quiting
        durationShrink : 0.8, // how long the window shrink time is
        // overlay fade in and out
        durationOverlay : 0.3, 
        fpsOverlay : 20,
        // loader fade in and out
        durationLoader : 0.8, 
        fpsLoader : 20
    }
}

//Funktionalitet för att göra en mouseover-expanderande HTML-annons
function regClick(b,z)
{
  var fRand = (new Date()).getTime();
  var jsonObj = new JSONscriptRequest('http://ox.st.nu/delivery/ck.php?oaparams=2__bannerid='+b+'__zoneid='+z+'__cb='+fRand);
  jsonObj.buildScriptTag();
  jsonObj.addScriptTag();
  return true;
}

function toggleAd(nod,m,sz1,sz2)
{
  var ch = nod.getElementsByTagName('div')[1];
  var h = ch.style.height.replace(/[^0-9]/gi,'');
  if( m == 'e' && parseInt(h) <= 0 )
  {
    ch.style.height = sz1 + 'px';
    nod.style.height = sz2 + 'px';
  }
  else if( m == 'c' && parseInt(h) > 0 )
  {
    ch.style.height = sz1 + 'px';
    nod.style.height = sz2 + 'px';
  }
}

function getParentNode(n,cn)
{
  var testObj = n;
    eval("while( !(testObj.className && testObj.className.match(/"+n+"/g)) ) { testObj = testObj.parentNode; }\n");
  return testObj; 
}

var a_displayProjects = new Array();

function displayProject(name,title,projectUrl,adsUrl,parentId,gs,regExpo,adWidth,adHeight,a_heights)
{
  this.name = name;
  title = unescape(title); this.title = title.replace(/\+/gi,' ');
  this.ads = new Array();
  this.images = new Array();
  this.globalShow = (gs) ? gs : 4000;
  this.regExpo = (regExpo == 'yes') ? 1 : 0;
  this.globalPos = 0;
  this.adWidth = adWidth;
  this.adHeight = adHeight;
  this.mainHeight = 0;
  for(var i=0; i<a_heights.length; i++) { this.mainHeight = this.mainHeight + parseInt(a_heights[i]); }
  this.mainHeight = this.mainHeight + parseInt(adHeight);
  this.parentId = parentId;
  this.url = projectUrl;
  this.adsUrl = adsUrl;
  this.heights = a_heights;
}

function setupDisplayLinks(uberDiv,project,filename)
{
  var proj = a_displayProjects[project];
  var arr = uberDiv.getElementsByTagName('a');
  var url = proj.url+'?method=click&filename='+filename;
  var hpos = 0;
  
  for(var i=0, ln=arr.length; i<ln; i++)
  {
    if(arr[i].className && arr[i].className=='specialLink')
    {
      var img = document.createElement('img');
      img.width = proj.adWidth;
      img.style.height = proj.heights[hpos]+'px';
      img.src = 'http://st.nu/misc/images/transpixel.gif';
      img.border = 0;
      arr[i].href = url;
      arr[i].target = '_blank';
      arr[i].title = proj.title;
      arr[i].appendChild(img);
      hpos++;
    }
  } 
}

function editDisplayLinks(mainDiv,url)
{
  var arr = mainDiv.getElementsByTagName('a');
  for(var i=0, ln=arr.length; i<ln; i++) { if(arr[i].className && arr[i].className=='specialLink'){ arr[i].href = url; } }  
}

function displayAd(filename,project,num)
{
  this.makeDom = function(num)
  {
    var proj = a_displayProjects[this.project];
    var projectUrl = proj.url;
    var divNode = document.createElement('div');
    var imgNode = document.createElement('img');
    imgNode.border = 0;
    var aNode = document.createElement('a');
    aNode.href = this.url;
    aNode.target = '_blank';
    imgNode.src = proj.adsUrl+this.filename;
    imgNode.width = proj.adWidth; imgNode.height = proj.adHeight;
    
    if( document.getElementById(proj.parentId) )
    {
      var parent = document.getElementById(proj.parentId);
      var mainDiv = parent.parentNode.parentNode;
      if( num==0 && mainDiv ) editDisplayLinks(mainDiv,this.url);
      if( num == 0 ) { parent.removeChild(parent.getElementsByTagName('a')[0]); }
      aNode.style.display = 'block';
      aNode.appendChild(imgNode);
      divNode.appendChild(aNode);
      parent.appendChild(divNode);
    }
  }
  
  this.project = project;
  this.filename = filename;
  this.url = a_displayProjects[project].url+'?method=click&filename='+this.filename;

  this.makeDom(num);
}

function getDisplayAds(mainNode,projectUrl)
{
  if( projectUrl && mainNode.id )
  { 
    var css = document.createElement('link');
    css.setAttribute('href',projectUrl+'/loop.css');
    css.setAttribute('rel','stylesheet');
    css.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(css);
    
    var jsonObj = new JSONscriptRequest(projectUrl+'ads.php?parent='+mainNode.id);
    jsonObj.buildScriptTag();
    jsonObj.addScriptTag();
  }
}

function initDisplayAds(arr,project,projectUrl,adsUrl,parentId,regExpo,speed,adWidth,adHeight,title,a_heights)
{
  if( document.getElementById(parentId) )
  {
    a_displayProjects[project] = new displayProject(project,title,projectUrl,adsUrl,parentId,speed,regExpo,adWidth,adHeight,a_heights);
    var mainNode = document.getElementById(parentId);
    
    mainNode.style.width  = adWidth+"px";
    mainNode.style.height = adHeight+"px";
    mainNode.style.overflow = 'hidden';
    mainNode.getElementsByTagName('a')[0].href = projectUrl;
    
    var proj = a_displayProjects[project];
    if( arr ) {
      for(var i=0, ln=arr.length; i<ln; i++) { proj.ads[i] = new displayAd(arr[i].filename,project,i); }
      if( proj.ads.length && document.getElementById(parentId) ) { initLoop(project); }
    }
  }
}

function setDisplayAdExpo(filename,project)
{ 
  if( a_displayProjects[project].url )
  {
    var jsonObj = new JSONscriptRequest(a_displayProjects[project].url+'?method=expo&filename='+filename);
    jsonObj.buildScriptTag();
    jsonObj.addScriptTag();
  }
}

function setupDislayAd(proj,uberPar)
{
  if( uberPar.getElementsByTagName('div') )
  {
    var box = uberPar.getElementsByTagName('div')[0];
    box.className = 'displayCompany '+proj.name;
    box.style.height = uberPar.style.height = proj.mainHeight+'px';
  }
}

function initLoop(project)
{
  if( project && a_displayProjects[project] )
  {
    var proj = a_displayProjects[project];
    var par = document.getElementById(proj.parentId);

    var uberPar = getParentNode(par,'loaderBkg');
    if( uberPar.className && uberPar.className.match(/loaderBkg/g) ) { uberPar.className = uberPar.className.replace(/loaderBkg/g,''); }  
    if( uberPar ) setupDisplayLinks(uberPar,project,proj.ads[0].filename);
    
    setupDislayAd(proj,uberPar);
    
    if( isScrolledIntoView(par) && proj.regExpo ) { setDisplayAdExpo(proj.ads[proj.globalPos].filename,proj.name); }
    
    var css2 = document.createElement('link');
    css2.setAttribute('href',proj.url+'loop2.css');
    css2.setAttribute('rel','stylesheet');
    css2.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(css2);
    proj.images = par.getElementsByTagName('img');
    for(i=1, ln=proj.images.length; i<ln; i++) { proj.images[i].xOpacity = 0; }
    proj.images[0].style.display = 'block';
    proj.images[0].xOpacity = .99;
    setTimeout("so_xfade('"+project+"')",proj.globalShow);
  }
}

function so_xfade(project)
{
  if( project && a_displayProjects[project] )
  {
    function setOpacity(obj) {
      if( obj.xOpacity > .99 ) { obj.xOpacity = .99; return; }
      obj.style.opacity = obj.xOpacity;
      obj.style.MozOpacity = obj.xOpacity;
      obj.style.filter = 'alpha(opacity=' + (obj.xOpacity*100) + ')';
    }
    
    var proj = a_displayProjects[project];
    
    if( !proj.images.length )
    {
      proj.images = document.getElementById(proj.parentId).getElementsByTagName('img');
      for(i=1, ln=proj.images.length; i<ln; i++) { proj.images[i].xOpacity = 0; }
      proj.images[0].style.display = 'block';
      proj.images[0].xOpacity = .99;
    }
    
    var cOpacity = proj.images[proj.globalPos].xOpacity; 
    var nIndex = (proj.images[proj.globalPos+1]) ? (proj.globalPos+1) : 0;
    var nOpacity = proj.images[nIndex].xOpacity;
    cOpacity -= .05;
    nOpacity += .05;
    proj.images[nIndex].style.display = 'block';
    proj.images[proj.globalPos].xOpacity = cOpacity;
    proj.images[nIndex].xOpacity = nOpacity;
    setOpacity(proj.images[proj.globalPos]);
    setOpacity(proj.images[nIndex]);
    if( cOpacity <= 0 )
    {
      var url = (proj.ads[proj.globalPos+1]) ?
      proj.ads[proj.globalPos+1].url : proj.ads[0].url;
      
      //För att ändra samtliga länkar i main-diven så de reggar klick på rätt annons inuti
      if( document.getElementById(proj.parentId) ) { editDisplayLinks(getParentNode(document.getElementById(proj.parentId)),url); }
      
      if( proj.regExpo && isScrolledIntoView(document.getElementById(proj.parentId)) )
      {
        setDisplayAdExpo(proj.ads[proj.globalPos].filename,proj.name);
      }
      proj.images[proj.globalPos].style.display = 'none';
      proj.globalPos = nIndex;
      setTimeout("so_xfade('"+project+"')",proj.globalShow);
    }
    else { setTimeout("so_xfade('"+project+"')",50); }

  }
}

/** Move to lib/mittmedia.js **/

var mm_modifyRegistrationForm = function() {
  jQuery('#registerAndEditForm fieldset').each(function(index, element) {
    jQuery(element).addClass('fieldset_' + index);
  });

  //Ta bort felaktiga förklaringar
  jQuery('#registerAndEditForm .fieldset_5 div label').html(jQuery('#registerAndEditForm .fieldset_5 div label').html().replace(/\&nbsp\;\<span\>Endast siffror<\/span\>\&nbsp\;/gi, '')); //Mobiltelefon, ta bort onödigt mellanslag och "Endast siffror"
  jQuery('#registerAndEditForm .fieldset_7 div label.emailfield').html(jQuery('#registerAndEditForm .fieldset_7 div label.emailfield').html().replace(/ \(Används vid inloggning\)/gi, '')); //E-post, ta bort onödigt mellanslag och "Används vid inloggning"

  //Lägg till etiketter
  jQuery('<p>Ditt kundnummer är sexsiffrigt och återfinns i din faktura.</p>').appendTo(jQuery('#registerAndEditForm .fieldset_6 div:not(:first)')); //Kundnummer
  jQuery('<p>Personnummer anges ÅÅÅÅMMDDXXXX, till exempel: 190101015555.</p>').appendTo(jQuery('#registerAndEditForm .fieldset_6 div:first')); //Personnummer
  jQuery('<p>Vänligen ange ditt mobilnummer med endast siffror.</p>').appendTo(jQuery('#registerAndEditForm .fieldset_5 div:not(.clearer)')); //Mobiltelefon
  jQuery('<p>E-posten används vid inloggning.</p>').appendTo(jQuery('#registerAndEditForm .fieldset_7 div label.emailfield').parent()); //E-post

  //Flytta fält
  jQuery('#registerAndEditForm .fieldset_6 div').appendTo(jQuery('#registerAndEditForm .fieldset_2')); //Personnummer
  jQuery('#registerAndEditForm .fieldset_5 div').appendTo(jQuery('#registerAndEditForm .fieldset_2')); //Mobiltelefon
  jQuery('#registerAndEditForm .fieldset_3 div.rdo').appendTo(jQuery('#registerAndEditForm .fieldset_3')); //Kön
  jQuery('#registerAndEditForm .fieldset_4 div').appendTo(jQuery('#registerAndEditForm .fieldset_3')); //Civilstånd
  jQuery('#registerAndEditForm .fieldset_2 div:contains("Alias")').appendTo(jQuery('#registerAndEditForm .fieldset_3')); //Alias

  if (typeof FormValidation !== 'undefined') {
    FormValidation.ERROR_FIELD1 = 'Du har inte fyllt i ditt personnummer på rätt sätt. Se ovan för instruktion.';
  }

  /**
   * Overrides functions in global.js
   * @param {Object} fieldValue
   */
  if (typeof FormValidation !== 'undefined') {
    FormValidation.isEmpty = function(field){
      if (field.id === 'subScriberOptional') {
        return false;
      } else {
        return field.value.length === 0;
      }
    };
    FormValidation.checkField1 = function(fieldValue){
      return SwedishSocialSecurityNumberValidator.validatePNum(fieldValue);
    };
  }
}


;
