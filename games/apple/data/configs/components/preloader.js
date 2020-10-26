export default class Preloader extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   *  config for preloader
   */
  createConfig() {
    this._config.preloader = {
      id:     "Preloader",
      type:   "preloader",
      config: {
        visible:  true,
        needMask: false,
        testText: {
          on:   false,
          text: "Preloader",
        },
	      sceneObj: [
		      {
			      name:      "preloader",
			      type:      core.display.SceneObject,
			      landscape: {
				      x:      960,
				      y:      500,
				      scaleX: 1.8,
				      scaleY: 1.8,
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
				      {
					      name:            "preloader",
					      type:            core.display.Spine,
					      spineAnimations: {
						      show: {
							      name: "show",
							      loop: false,
						      },
						      loop: {
							      name: "loop",
							      loop: true,
						      },
					      },
					      landscape:       {
						      x:           0,
						      y:           0,
						      scaleX:      1,
						      scaleY:      1,
						      spineCenter: false,
					      },
					      portrait:        {
						      x:           0,
						      y:           0,
						      scaleX:      1,
						      scaleY:      1,
						      spineCenter: false,
					      },
				      },
			      ],
		      },
	      ],
      },
    };
  }

  get config() {
    return {
      key:   "preloader",
      value: this._config.preloader,
    };
  }
}
