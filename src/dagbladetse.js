//= require_tree "./vendor"
//= require "./lib/client.js"
//= require "./lib/mittmedia.js"
//= require "./lib/json.js"

var local_generateAdaptLogicZone = function(department)
{
	/* nyheter,sport,noje,ekonomi,familj,resor,bostad,motor,mat-dryck */
	switch(department)
	{
		case 'kulturnoje': return 'noje';
		case 'personligt': return 'familj';
		case 'ekonomiprylar': return 'ekonomi';	
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'dagbladetse',
			'googleAnalyticsId' : 'UA-1909178-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'nyheter',
			'defaultFusionLayout' : 'dagbladet_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'dagbladet',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'onDomReady' : local_domReady,
			'servicefinderId' : 15,
			'flygresorXml': 'http://dagbladet.se/polopoly_fs/1.4774247!/flygresor_st.xml',
			'charterXml' : 'http://dagbladet.se/polopoly_fs/1.4719598!charter.xml'
			});
}
