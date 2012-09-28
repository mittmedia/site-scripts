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
		case 'jobbpengar': return 'ekonomi';	
		case 'motor': return 'motor';
		case 'hemtradgard': return 'bostad';
		case 'resor': return 'resor';
		case 'mat': return 'mat-dryck';
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'arbetarbladetse',
			'googleAnalyticsId' : 'UA-5478518-1',
			'specialDomainName' : 'none',
			'subdomain' : '',
			'defaultFusionMediaZone' : 'nyheter',
			'defaultFusionLayout' : 'gdarb_1',
			'fusionMediaZone' : '',
			'fusionLayouts' : '',
			'adaptLogicAlias' : 'gavletidningar',
			'adaptLogicZone' : '',
			'generateAdaptLogicZone' : local_generateAdaptLogicZone,
			'admetaMediaZone': '',
			'admetaAlias': '',
			'admetaSpaceMap': '',
			'onDomReady' : local_domReady,
			'servicefinderId' : 13,
			'flygresorXml': 'http://arbetarbladet.se/polopoly_fs/1.4690200!flygresor_gt.xml',
			'charterXml': 'http://arbetarbladet.se/polopoly_fs/1.4695613!charter.xml'
			});
}
