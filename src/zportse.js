//= require_tree "./vendor"
//= require "./lib/client.js"
//= require "./lib/mittmedia.js"
//= require "./lib/json.js"

var local_generateAdaptLogicZone = function(department)
{
	/* nyheter,sport,noje,ekonomi,familj,resor,bostad,motor,mat-dryck */
	switch(department)
	{
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'zportse',
			'googleAnalyticsId' : 'UA-10825618-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'start.nyheter',
			'defaultFusionLayout' : 'ot_2',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'ostersundsposten',
			'adaptLogicZone' : '',
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'onDomReady' : local_domReady
			});
}