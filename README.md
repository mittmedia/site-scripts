# Site Scripts
Byggmiljö för att skapa, underhålla och deploya samtliga script för MittMedias (mktwebb-baserade) sajter.

## Installation
Följande rubygems måste finnas installerade:

  * Byggmiljön kräver följande gems:
    * bundler
    * rake
    * coffee-script
    * sprockets
    * uglifier

  * Kör `git clone git@github.com:mittmedia/site-scripts.git`
  * Kör `bundle install`

## Användning

  * Kör `rake build:all` för att kompilera samtliga sajtscript till build-katalogen
  * Kör `rake build:single[sajtnamn]` för att kompilera sajtens script till build-katalogen
  * Kör `rake clear:build` för att radera filerna i build-katalogen

## Innehåll
  * Sajtinställningar - I /src finns det javascript döpta enligt <tidningsnamn>.js i dessa finns alla siteparameters och lokala avvikelser.
    * 'alias' : 'gdse', `sitealias`
    * 'googleAnalyticsId' : 'UA-5478996-1',
    * 'specialDomainName' : 'none',
    * 'subdomain' : '',
    * 'defaultFusionMediaZone' : 'nyheter', `Startsidan anges med denna parameter för Fusion. http://gd.se/nyheter är till exempel startsidan för gd.se`
    * 'defaultFusionLayout' : 'gdarb_1', `Standardlayout för Fusion`
    * 'fusionMediaZone' : '', `Sätts i mittmedia.js`
    * 'fusionLayouts' : '', `Sätts i mittmedia.js`
    * 'adaptLogicAlias' : 'gavletidningar', `Bolagsnamn enligt adaptLogic`
    * 'adaptLogicZone' : '',
    * 'generateAdaptLogicZone' : local_generateAdaptLogicZone,
    * 'admetaMediaZone': '',
    * 'admetaAlias': '',
    * 'admetaSpaceMap': '',
    * 'onDomReady' : local_domReady,
    * 'servicefinderId': 11, `Servicefinder id`
    * 'flygresorXml': 'http://gd.se/polopoly_fs/1.4690142!flygresor_gt.xml', `Används enbart på resevertikalen av inline-script`
    * 'charterXml': 'http://gd.se/polopoly_fs/1.4690894!charter.xml' `Används enbart på resevertikalen av inline-script`
