//= require_tree "./vendor"
//= require "./lib/client.js"
//= require "./lib/mittmedia.js"
//= require "./lib/json.js"

var local_generateAdaptLogicZone = function(department)
{
	/* nyheter,sport,noje,ekonomi,familj,resor,bostad,motor,mat-dryck */
	switch(department)
	{
		case 'noje': return 'noje';
		case 'slaktvanner': return 'familj';
		case 'ekonominyheter': return 'ekonomi';	
		case 'motor': return 'motor';
		case 'bostad': return 'bostad';
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'ltzse',
			'googleAnalyticsId' : 'UA-10825589-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'nyheter.allt',
			'defaultFusionLayout' : 'ot_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'ltz',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'onDomReady' : local_domReady,
			'servicefinderId' : 14,
			'flygresorXml': 'http://ltz.se/polopoly_fs/1.4782402!/flygresor.xml',
			'charterXml' : 'http://ltz.se/polopoly_fs/1.4730734!/charter.xml'
			});
}
