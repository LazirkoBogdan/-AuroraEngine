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
        visible: false,
        needMask: false,
        parentGroup: 'DEFAULT',
        testText: {
          on: false,
          text: 'Background component'
        },

        sceneObj: [
	        {
		        name:      "bg",
		        type:      core.display.SceneObject,
		        landscape: {
			        x:      960,
			        y:      650,
			        scaleX: 2,
			        scaleY: 2,
		        },
		        portrait:  {
			        x:      960,
			        y:      600,
			        scaleX: 1.7,
			        scaleY: 1.7,
		        },
		        sceneObj:  [
			        {
				        name:            "bg",
				        type:            core.display.Spine,
				        spineAnimations: {
					        show: {
						        name: "show",
						        loop: true,
					        },
					        idle: {
						        name: "loop",
						        loop: false,
					        },
				        },
				        landscape:       {
					        x:           0,
					        y:           0,
					        scaleX:      1.4,
					        scaleY:      1.4,
					        pivot:"center",
					        skin:"2.horizontal",
					        spineCenter: false,
				        },
				        portrait:        {
					        x:           0,
					        y:           0,
					        scaleX:      1.5,
					        scaleY:      1.5,
					        pivot:"center",
					        spineCenter: false,
					        skin:"1.vertical",
					        skinAnimation:{
						        name: "loop",
						        loop: true,
					        }
				        },
			        },
			        {
				        name:            "fogParticles",
				        skin:            "1.vertical",
				        type:            core.display.Spine,
				        spineAnimations: {
					        show: {
						        name: "loop_01-loading",
						        loop: true,
					        },
					        idle: {
						        name: "loop_01-loading",
						        loop: true,
					        },
				        },
				        
				        landscape:       {
					        x:           0,
					        y:           0,
					        scaleX:      1.4,
					        scaleY:      1.4,
					        spineCenter: false,
					        pivot:"center",
					        skin:"2.horizontal",
				        },
				        portrait:        {
					        x:           0,
					        y:           0,
					        scaleX:      1.5,
					        scaleY:      1.5,
					        pivot:"center",
					        spineCenter: false,
					        skin:"1.vertical"
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
