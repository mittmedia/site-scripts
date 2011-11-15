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
  
## Exempel
