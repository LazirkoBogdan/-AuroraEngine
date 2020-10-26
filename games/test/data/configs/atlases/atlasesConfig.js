export default class atlasesConfig extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
  }

  /**
   * @public
   *  config for atlasesConfig
   */

  getResources() {
    return {
      components: {
        preloader:        {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, background:    {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, backgroundtop: {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, history:       {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, loading:       {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, popup:         {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, rules:         {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, settings:      {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, testGame:     {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, ui:            {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, uibotton:      {
          resources: {
            spriteSheets: {}, spine: {},
          },
        },
      },
    };
  }

  getAtlasConfig() {
    return {
      atlases: [
	      {
		      name: "atlas_0",
		      url:  "./assets/atlases/atlas-0.json",
	      },
	      {
		      name: "atlas_1",
		      url:  "./assets/atlases/atlas-1.json",
	      },
		     
      ], spine: [
      
      ], font: [],
    };
  }
}
