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
		case 'folkfamilj': return 'familj';
		case 'jobbpengar': return 'ekonomi';	
		case 'motor': return 'motor';
		case 'byggabo': return 'bostad';
		case 'resor': return 'resor';
		case 'mat': return 'mat-dryck';
		default: return 'nyheter';
	}
};

var local_domReady = function() { };

if( !mm_currentSite )
{
	mm_currentSite = new mm_siteObject({
			'alias' : 'gdse',
			'googleAnalyticsId' : 'UA-5478996-1',
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
			'servicefinderId': 11,
			'flygresorXml': 'http://gd.se/polopoly_fs/1.4690142!flygresor_gt.xml',
			'charterXml': 'http://gd.se/polopoly_fs/1.4690894!charter.xml'
			});
}
