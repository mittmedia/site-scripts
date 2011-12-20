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
			'onDomReady' : local_domReady
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