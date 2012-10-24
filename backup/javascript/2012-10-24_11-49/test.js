// Add ECMA262-5 method binding if not supported natively
//
if (!('bind' in Function.prototype)) {
    Function.prototype.bind= function(owner) {
        var that= this;
        if (arguments.length<=1) {
            return function() {
                return that.apply(owner, arguments);
            };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
}

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim= function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}
// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}
;
(function() {

  this.module || (this.module = function(names, fn) {
    var space, _name;
    if (typeof names === 'string') {
      names = names.split('.');
    }
    space = this[_name = names.shift()] || (this[_name] = {});
    space.module || (space.module = this.module);
    if (names.length) {
      return space.module(names, fn);
    } else {
      return fn.call(space);
    }
  });

}).call(this);
(function() {

  this.module("paper", function() {
    return this.Fusion = (function() {

      Fusion.name = 'Fusion';

      function Fusion(path, base_zone, default_zone, layouts, default_layout, subdomain) {
        var media_zone_path;
        if (subdomain == null) {
          subdomain = null;
        }
        media_zone_path = this.get_media_zone_path(path, default_zone);
        this.media_zone = this.get_media_zone(media_zone_path, [base_zone, subdomain], default_zone);
        this.layout = this.get_layout(media_zone_path, layouts, default_layout);
      }

      Fusion.prototype.get_media_zone_path = function(path, default_zone) {
        var pieces;
        pieces = path.split("/");
        pieces = pieces.filter(function(piece) {
          return piece !== "";
        });
        if (pieces.length > 0 && pieces[pieces.length - 1].indexOf(".") >= 0) {
          pieces.pop();
        }
        if (pieces.length === 0) {
          pieces.push(default_zone);
        }
        return pieces.join(".");
      };

      Fusion.prototype.get_media_zone = function(zone_path, zones, default_zone) {
        zones = zones.filter(function(zone) {
          return (zone != null) && zone !== "";
        });
        return zones.concat(zone_path).join(".");
      };

      Fusion.prototype.get_layout = function(zone_path, layouts, default_layout) {
        return layouts[zone_path] || default_layout;
      };

      Fusion.prototype.setup_environment = function(media_zone, layout) {
        if (media_zone == null) {
          media_zone = this.media_zone;
        }
        if (layout == null) {
          layout = this.layout;
        }
        window.Fusion.adServer = "fusion.adtoma.com";
        window.Fusion.mediaZone = media_zone;
        window.Fusion.layout = layout;
        window.Fusion.parameters["url_path"] = window.location.pathname;
        window.Fusion.parameters["url"] = window.location.href;
        return window.Fusion.loadAds();
      };

      return Fusion;

    })();
  });

  /*      
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
  */


}).call(this);
(function() {

  this.module("paper", function() {
    return this.AdaptLogic = (function() {

      AdaptLogic.name = 'AdaptLogic';

      function AdaptLogic(path, alias, department_mapping, default_department) {
        this.department = this.get_department(path, department_mapping, default_department);
      }

      AdaptLogic.prototype.get_department = function(path, department_mapping, default_department) {
        var department, pieces;
        pieces = path.split("/").filter(function(piece) {
          return (piece != null) && piece !== "";
        });
        department = pieces.shift();
        return department_mapping[department] || default_department;
      };

      return AdaptLogic;

    })();
  });

  /*
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
  */


}).call(this);
(function() {
  var adapt_logic, department_mappings, fusion, layouts, path;

  layouts = {
    'nyheter.hofors': 'hoforslayout',
    'test': 'testlayout'
  };

  path = "/nyheter/hofors/test.html";

  fusion = new this.paper.Fusion(path, 'mkt.gdse', 'nyheter.ettan', layouts, 'gd_1');

  department_mappings = {
    'slaktvanner': 'familj',
    'kulturnoje': 'noje'
  };

  path = "/kulturnoje/test";

  adapt_logic = new this.paper.AdaptLogic(path, 'ostersundsposten', department_mappings, 'nyheter');

}).call(this);
