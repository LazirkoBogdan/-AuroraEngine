export default class BG extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for BG
   */
  createConfig() {
    this._config.bg = {
      id: 'Background',
      type: 'background',
      config: {
        visible: true,
        needMask: false,
        parentGroup: 'DEFAULT',
        testText: {
          on: true,
          text: 'Background component'
        },

        sceneObj: [
	        {
		        name:      "bg",
		        type:      core.display.SceneObject,
		        landscape: {
			        x:      -500,
			        y:      -1000,
			        scaleX: 1,
			        scaleY: 1,
		        },
		        portrait:  {
			        x:      -500,
			        y:      -1000,
			        scaleX: 1,
			        scaleY: 1,
		        },
		        sceneObj:  [
			        {
				        name:      "selector",
				        type:      core.display.Graphics,
				        landscape: {
					        x:         0,
					        y:         0,
					        rectAlpha: 1,
					        color:     0x0093FF,
					        rect:      {
						        x:      0,
						        y:      0,
						        width:  3000,
						        height: 2500,
					        },
				        },
				        portrait: {
					        x:         0,
					        y:         0,
					        rectAlpha: 1,
					        color:     0x0093FF,
					        rect:      {
						        x:      0,
						        y:      0,
						        width:  3000,
						        height: 2500,
					        },
				        },
			        },
		        ],
	        },
        ]
      }
    };
  }

  /**
   * @getter
   * BG paramaters
   */
  get config() {
    return {
      key: 'background',
      value: this._config.bg
    };
  }
}
