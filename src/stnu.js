//= require_tree "./vendor"
//= require "./lib/client.js"
//= require "./lib/mittmedia.js"
//= require "./lib/json.js"

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
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
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