//= require_tree "./vendor"
//= require_tree "./lib"

var local_generateAdaptLogicZone = function(department)
{
	/* nyheter,sport,noje,ekonomi,familj,resor,bostad,motor,mat-dryck */
	switch(department)
	{
		case 'kulturnoje': return 'noje';
		case 'slaktvanner': return 'familj';
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'opse',
			'googleAnalyticsId' : 'UA-10825541-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'nyheter.ettan',
			'defaultFusionLayout' : 'ot_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'ostersundsposten',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'onDomReady' : local_domReady
			});
}
