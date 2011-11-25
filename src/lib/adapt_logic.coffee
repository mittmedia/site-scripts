//= require "lib/module"

@module "paper", ->
  class @AdaptLogic
    constructor: (path, alias, department_mapping, default_department) ->
      @department = @get_department(path, department_mapping, default_department)
    
    get_department: (path, department_mapping, default_department) ->
      pieces = path.split("/").filter (piece) -> piece? and piece != ""
      department = pieces.shift()
      department_mapping[department] || default_department
    
    #setup_environment: () ->

###
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
###