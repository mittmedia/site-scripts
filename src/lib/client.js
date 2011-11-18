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