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
		case 'levabo': return 'familj';
		case 'levabo': return 'bostad';
		case 'resor': return 'resor';	
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'helahalsinglandse',
			'googleAnalyticsId' : 'UA-8170995-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'startsida',
			'defaultFusionLayout' : 'hh_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'helahalsingland',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'onDomReady' : local_domReady,
			'servicefinderId' : 12,
			'flygresorXml': 'http://helahalsingland.se/polopoly_fs/1.4777017!/flygresor.xml',
			'charterXml' : 'http://helahalsingland.se/polopoly_fs/1.4720369!charter.xml'
			});
}
