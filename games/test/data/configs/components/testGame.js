export default class testGame extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for testGame
   */
  createConfig() {
    this._config.testGame = {
      id:     "TestGame",
      type:   "testgame",
      config: {
        name:                   "TestGame",
        visible:                false,
        needMask:               false,
        parentGroup:            "DEFAULT",
	      
        testText:               {
          on:   false,
          text: "TestGame",
        },
        sceneObj:               [
	        {
		        name: 'bunny',
		        type: core.display.Button,
		        landscape: {
			        x: 0,
			        y: 0,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 1,
			        },
		        },
		        portrait: {
			        x: 0,
			        y: 300,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 1,
			        },
		        },
		        sceneObj: [
			        {
				        texture: 'persIdle',
				        name: 'pers',
				        type: core.display.Sprite,
				        landscape: {
					        x: 200,
					        y: 880,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'persIdle',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 700,
					        y: 880,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'persIdle',
					        anchor: 0.5,
				        },
			        },
			        {
				        name: 'text',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -150,
					        y: -75,
					        width: 300,
					        height: 150,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "#0062AA",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 52,
						        "lineJoin": "bevel",
						
					        },
					        text: 'TAP ME !',
					        landscape: {
						        x: 0,
						        y: 0,
					        },
					        portrait: {
						        x: 0,
						        y: 0,
					        },
				        },
				        landscape: {
					        x: 200,
					        y: 700,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 700,
					        y: 700,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
		        ],
	        },
        
        ],
      },
    };
  }

  /**
   * @getter
   * testGame parameters
   */
  get config() {
    return {
      key:   "testGame",
      value: this._config.testGame,
    };
  }

  get orientationName() {
    return core.getOrientation() ? "portrait" : "landscape";
  }

  get orientationSkin() {
    return core.getOrientation() ? "1.vertical/v_stp" : "2.horizontal/h_stp";
  }
}
