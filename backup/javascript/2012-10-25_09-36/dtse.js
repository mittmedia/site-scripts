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

			if( this.fusionLayouts[this.fusionMediaZone] ) layout = this.fusionLayouts[this.fusionMediaZone];

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

			// this.admetaSpaceMap["ad_980x160"] = {width: 980, height: 120, rank: 1};
			// this.admetaSpaceMap["ad_980x160_2"] = {width: 980, height: 120, rank: 2};
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
				if(this.admetaSpaceMap[fusion_space_name] && window.location.origin.indexOf("http") > -1) {
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
		case 'sport': return 'sport';
		case 'nojekultor': return 'noje';
		case 'familjvanner': return 'familj';
		case 'inspiration': return 'bostad';
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'dtse',
			'googleAnalyticsId' : 'UA-7122651-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'nyheter',
			'defaultFusionLayout' : 'dt_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'dalarnastidningar',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'onDomReady' : local_domReady,
			'servicefinderId' : 7,
			'flygresorXml': 'http://www.dt.se/polopoly_fs/1.4710905!flygresorse.xml',
			'charterXml' : 'http://www.dt.se/polopoly_fs/1.4695775!/charter.xml'
			});
}


var kommuner = new Array('Avesta','Borlänge','Falun','Gagnef','Hedemora','Leksand','Ludvika','Malung/Sälen','Mora','Orsa','Rättvik','Smedjeb.','Säter','Vansbro','Älvdalen');
var pralin = new Array('Bloggar', 'Bli bloggare', 'Mat', 'Hemma', 'Kontakt');
var kontakt_avdelningar = new Array('annonsera', 'prenumerera', 'tidningskortet', 'arkiv', 'kontaktaoss', 'omdt');

var dtse_domReady = function () { dt_appendRssSubmenu(); };

var dt_appendRssSubmenu = function (munic) {
        if (!$$('.leftColumnSubmenu').length) {
            if ($$('.rssTeaserContainer')) {
                var rssNode = $$('.rssTeaserContainer')[0];
                var subCity = '';
                if (!munic) {
                    if (rssNode && rssNode.innerHTML && rssNode.innerHTML.match(/\//)) {
                        var txt = rssNode.getElementsByTagName('span')[0].innerHTML;
                        if (txt.match(/malung/gi)) {
                            txt = txt.replace(/lung-S/g, 'lung##S');
                        }
                        var pcs = txt.split('/');
                        pcs[0] = pcs[0].replace(/##/, '/');
                        for (var i = 0, ln = kommuner.length; i < ln; i++) {
                            if (kommuner[i].name == pcs[0]) {
                                munic = kommuner[i];
                                break;
                            }
                        }
                        subCity = pcs[pcs.length - 1];
                    }
                }
                if (munic && munic.name) {
                    var newDiv = document.createElement('div');
                    newDiv.className = 'leftColumnSubmenu';
                    var str = '<ul>';
                    for (var i = 0, ln = munic.subs.length; i < ln; i++) {
                        var ob = munic.subs[i];
                        var x = (subCity && subCity == ob.name) ? 'active' : '';
                        str += '<li class="' + x + ((munic.subs[i + 1]) ? '' : ' last') + '">';
                        str += '<a href="' + ob.href + '" title="Till avdelningen ' + ob.name + '">' + ob.name + '</a></li>';
                    }
                    newDiv.innerHTML = str + '</ul><div class="clearfix"><!-- --></div>';
                    rssNode.parentNode.appendChild(newDiv);
                }
            }
        }
    };
	
function dt_obNames(mtype) {
	if (mtype == 'munic') return kommuner;
	else if (mtype == 'pralin') return pralin;
	return;
}

function appendExtraMenu(mtype) {
    var a_obj = new Array();
    var a_title = document.title.split(' ');
    var obnames = dt_obNames(mtype);
    if (obnames && obnames.length && obnames.length > 1 && document.getElementById(mtype))
	{
		var extraSubMenu = (window.location.href.match(/pralin\/bloggar/gi) && mtype == 'pralin');
		var extraSubMenuHtml = blogRX = '';
        
		var selNode = $$('select[name="quickLinksItems"]')[0];
        var regex = makeExtraMenuRegex(obnames, mtype, '');
        for (var i = 0, ln = obnames.length; i < ln; i++) {
            var ob = new Object;
            ob.name = obnames[i];
            ob.href = (mtype == 'munic') ? 'http://www.dt.se/nyheter/avesta' : ((mtype == 'pralin') ? 'http://www.dt.se/pralin/kontakt' : '');
            ob.subs = new Array();
            a_obj[a_obj.length] = ob;
        }	
        for (var i = 0, ln = selNode.options.length; i < ln; i++) {
            var str = selNode.options[i].innerHTML;
            if (str.match(regex))
			{
                var cname = selNode.options[i].innerHTML.replace(/( \()+([A-ZÅÄÖÉ.\/])+(\))+$/gi, '');
                var rname = selNode.options[i].innerHTML.replace(/[A-ZÅÄÖÉ\/\-\s]+(\()/gi, '');
                rname = rname.replace(/(\))/gi, '');
                rname = rname.replace(/(Nyheter\/)|(Pralin\/)/g, '');
                for (var j = 0, ln2 = a_obj.length; j < ln2; j++) {
                    if (a_obj[j].name == rname) {
                        var ob = new Object;
                        if (a_obj[j].href.match(/avesta/)) {
                            a_obj[j].href = a_obj[j].href.replace(/avesta/, engLink(rname));
                        }
                        ob.name = cname;
                        ob.href = selNode.options[i].value;
                        a_obj[j].subs[a_obj[j].subs.length] = ob;
                        break;
                    }
                }
            }
			if( extraSubMenu && selNode.options[i].value.match(/(pralin\/)+(bloggar\/)+(\S)+(\/)+([A-Z])/gi) )
			{
				var a_urlSplit = selNode.options[i].value.replace(/(pralin\/)+(bloggar\/)/gi,'').split('/');
				var brx = new RegExp(a_urlSplit[1], 'gi');
				if( window.location.href.match(brx) )
				{
					blogRX = brx;
					var blogTitle = selNode.options[i].innerHTML.replace(/(\(pralin\/bloggar\/)+([A-Z\s0-9åäöéè])+(\))/gi,'');
					extraSubMenuHtml += '<a href="'+selNode.options[i].value+'" style="display:block; font-weight:normal !important; padding-left:5px">'+blogTitle+'</a>';
				}
			}
			
        }
        if (mtype == 'munic') {
            kommuner = a_obj;
        }
		
        var s = s_active = '';
		var mm_clickable = true;
        var a_subdep = window.location.toString().split('/');
        var subdep = a_subdep[a_subdep.length - 1];
        for (var i = 0, ln = a_obj.length; i < ln; i++) {
            if (a_obj[i].name) {
                if (mtype == 'munic') {
                    s += '<div class="extraMenu' + ((i < 8) ? ' row1' : '') + '">';
                    if (a_title[0] == a_obj[i].name) {
                        dt_appendRssSubmenu(a_obj[i]);
                    }
                } else if (mtype == 'pralin') {
                    var sb = 'blogs';
                    switch (a_obj[i].name.toLowerCase()) {
                    case 'bli bloggare':
                        sb = 'signup';
						mm_clickable = false;
                        break;
                    case 'hemma':
                        sb = 'home';
						mm_clickable = false;
                        break;
                    case 'mat':
                        sb = 'food';
						mm_clickable = false;
                        break;
                    case 'kontakt':
                        sb = 'contact';
						mm_clickable = true;
                        break;
                    default:
						mm_clickable = false
                        break;
                    }
                    s += '<div class="extraMenu ' + sb + '">';
                }
                s += '<ul><li class="topic">';
				s += '<a href="' + a_obj[i].href + '" '+((mm_clickable)?'':' style="cursor:default;" onclick="return false;"');
				s += ' title="' + a_obj[i].name + '">' + ((mtype == 'pralin') ? '<span></span>' : '');
                s += ((mtype == 'munic') ? a_obj[i].name.toUpperCase() : a_obj[i].name + '!') +'</a></li>';
                for( var j = 0, ln2 = a_obj[i].subs.length; j < ln2; j++ )
				{
                    var a_thisSub = a_obj[i].subs[j].href.split('/');
                    s_active = (!s_active && a_thisSub[a_thisSub.length - 1] == subdep) ? ' class ="active" ' : '';
                    s += '<li' + s_active + '><a title="' + a_obj[i].subs[j].name + '" href="' + a_obj[i].subs[j].href + '">' + a_obj[i].subs[j].name + '</a>';
					if( extraSubMenu && sb == 'blogs' && a_obj[i].subs[j].href.match(blogRX) ) { s += extraSubMenuHtml; }
					s += '</li>';
                }
                s += '</ul></div>';
            }
        }
        document.getElementById(mtype).innerHTML = s + '<div class="clearfix"> </div>';
    }
    a_obj = null;
}
var toggleExtraMenuOptions = function (arr) {
	var addr = window.location.toString();
	var a_subdep = addr.split('/');
	var subdep = a_subdep[a_subdep.length - 1];
	var s_active = '';
	for (var i = 0, ln = arr.length; i < ln; i++) {
		if (document.getElementById(arr[i])) {
			if (eval("addr.match(/" + arr[i] + "/g)")) {
				document.getElementById(arr[i]).className += ' active';
				var arr2 = arr[i].getElementsByTagName('a');
				for (var j = 0, ln2 = arr2.length; j < ln2; j++) {
					if (arr2[j].href && !s_active) {
						var a_thisSub = arr2[j].href.split('/');
						if (a_thisSub[a_thisSub.length - 1] == subdep) arr2[j].parentNode.className = 'active';
					}
				}
			} else {
				document.getElementById(arr[i]).className = document.getElementById(arr[i]).className.replace(/active/g, '');
			}
		}
	}
	if (document.getElementById(arr[0])) {
		if (!document.getElementById(arr[0]).parentNode.innerHTML.match(/extraMenu active/g)) {
			document.getElementById(arr[0]).className = 'extraMenu active';
		}
	}
};

function createExtraMenu(nod) {
    if (document.getElementById('level1') && nod.parentNode && nod.parentNode.id) {
        var mtype = nod.parentNode.id;
        if (mtype == 'customer_support') {
            toggleExtraMenuOptions(kontakt_avdelningar);
        } else {
            if (mtype == 'munic') {
                var li = document.getElementById('level1').getElementsByTagName('li')[document.getElementById('level1').getElementsByTagName('li').length - 1];
                li.className = 'item toggleLink';
                var lnk = li.getElementsByTagName('a')[0];
                lnk.className = 'arrow_down';
                lnk.onclick = function () {
                    return toggleMunicipalities(this);
                }
            }
            appendExtraMenu(mtype);
        }
    }
}

function makeExtraMenuRegex(obnames, mtype, rx) {
    for (var i = 0, ln = obnames.length; i < ln; i++) {
        rx += '(' + (linkPrefix(mtype)) + obnames[i].replace(/\//gi, "\/") + ')';
        if ((i + 1) < ln) rx += '|';
    }
    return new RegExp(rx, 'gi');
}
var engLink = function (s) {
	s = s.replace(/å|ä/gi, 'a');
	s = s.replace(/ö/gi, 'o');
	s = s.replace(/é|è/gi, 'e');
	s = s.replace(/( )|(\/)|(\.)/gi, '');
	s = s.replace(/'/gi, '');
	return s.toLowerCase();
};
var linkPrefix = function (m) {
        return ((m == 'munic') ? 'nyheter/' : ((m == 'pralin') ? 'pralin/' : ''));
    };
var toggleMunicipalities = function (nod) {
	if (document.getElementById('munic')) {
		var dir = (nod.className.match(/down/g)) ? 'down' : 'up';
		eval("nod.className = nod.className.replace(/" + ((dir == 'down') ? "down" : "up") + "/,((dir=='down')?'up':'down'));");
		document.getElementById('munic').style.display = ((dir == 'down') ? 'block' : 'none');
		document.getElementById('topMenuWrapper').style.borderColor = ((dir == 'down') ? '#666' : '#D7D7D7');
	}
	return false;
};

function addSearchText() {
    if( $$('.searchTeaserContainer')[0] && $$('.searchTeaserContainer')[0].getElementsByTagName('input') ) {
        var s = $$('.searchTeaserContainer')[0].getElementsByTagName('input')[1];
        var sstr = "Sök på dt.se";
        s.value = sstr;
        s.onclick = s.onfocus = function () {
            if (this.value == sstr) this.value = '';
            s.style.color = '#000 !important';
        }
    }
}
;