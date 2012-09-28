//= require_tree "./vendor"
//= require "./lib/client.js"
//= require "./lib/mittmedia.js"
//= require "./lib/json.js"

var local_generateAdaptLogicZone = function(department)
{
	/* nyheter,sport,noje,ekonomi,familj,resor,bostad,motor,mat-dryck */
	switch(department)
	{
		case 'sport': return 'sport';
		case 'noje': return 'noje';
		case 'slaktvanner': return 'familj';
		case 'jobbpengar': return 'ekonomi';	
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'allehandase',
			'googleAnalyticsId' : 'UA-6389386-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'start',
			'defaultFusionLayout' : 'allehanda_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'allehanda',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'onDomReady' : local_domReady,
			'servicefinderId' : 9,
			'flygresorXml': 'http://allehanda.se/polopoly_fs/1.4695779!/flygresor.xml',
			'charterXml' : 'http://allehanda.se/polopoly_fs/1.4695783!/charter.xml'
			});
}

if (typeof FamiljeLivVignette !== "undefined") {
    FamiljeLivVignette.init = {};
}
function getPageHref(a, c) {
    if (window.location.href.search(a) != -1) {
        var b = c;
    } else {
        var b = "alla";
    }
    return b;
}
function ChangeImageMapA(a, b) {
    document.getElementById(b).src = a;
}
function MM_jumpMenu(targ, selObj, restore) {
    eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
    if (restore) {
        selObj.selectedIndex = 0;
    }
}
function containNumber(a) {
    return /\d/.test(a);
}
function chkTNavd() {
    var d = "allehanda/";
    var c = new Array(7);
    var b = new Array(7);
    c[0] = "3";
    b[0] = "ettan";
    c[1] = "sport";
    b[1] = "sport";
    c[2] = "jobbpengar";
    b[2] = "ekonomi";
    c[3] = "noje";
    b[3] = "noje";
    c[4] = "kultur";
    b[4] = "noje";
    c[5] = "slaktvanner";
    b[5] = "familj";
    c[6] = "familjeliv";
    b[6] = "familj";
    var a = 0;
    var e;
    for (a = 0; a < 7; a++) {
        if (window.location.href.toLowerCase().search(c[a]) != -1) {
            if (containNumber(window.location.href)) {
                var e = d + "artikel";
            } else {
                var e = d + b[a];
            }
            break;
        } else {
            var e = d + "artikel";
        }
    }
    return e;
}
function chkLokAvd() {
    var c = "www.allehanda.se/";
    var e = 17;
    var b = new Array(e);
    var a = new Array(e);
    b[0] = "ornskoldsvik";
    a[0] = "ornskoldsvik";
    b[1] = "harnosand";
    a[1] = "harnosand";
    b[2] = "kramfors";
    a[2] = "kramfors";
    b[3] = "solleftea";
    a[3] = "solleftea";
    b[4] = "limelight";
    a[4] = "limelight";
    b[5] = "noje";
    a[5] = "noje";
    b[6] = "valkommentillvarldennyfodda";
    a[6] = "bb";
    b[7] = "brollopvigsel";
    a[7] = "brollop";
    b[8] = "kultur";
    a[8] = "kultur";
    b[9] = "slaktvanner";
    a[9] = "familje";
    b[10] = "exp_frontkopsalj";
    a[10] = "lokus/kopsalj";
    b[11] = "exp_frontmotor";
    a[11] = "lokus/motor";
    b[12] = "exp_frontbostad";
    a[12] = "/lokus/bostad";
    b[13] = "dodsfall";
    a[13] = "dodsfall";
    b[14] = "sport/os";
    a[14] = "os";
    b[15] = "/narasport";
    a[15] = "narasport";
    b[16] = "sport";
    a[16] = "sport";
    var d = 0;
    var f;
    for (x = 0; d < e; d++) {
        if (window.location.href.toLowerCase().search(b[d]) != -1) {
            var f = c + a[d];
            break;
        } else {
            var f = c + "alla";
        }
    }
    return f;
}
function mrflogg(d, c) {
    var g = d;
    var e = c;
    var f = "http://d1.allehanda.se/div/soklgr.php?sord=" + e + "&slurl=" + g;
    if (g != "") {
        document.mrf_piclog.src = f;
    }
}