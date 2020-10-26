export default class Ui extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for Ui
   */
  createConfig() {

    const betButton = {
      initialGame: {
        status: "active",
        enable: true,
      },

      baseGame: {
        status: "active",
        enable: true,
      },

      popup: {
        enable: false,
        status: "disable",
      },

      appleGame: {
        enable: false,
        status: "disable",
      },

      stateCurrency: {
        enable: false,
        status: "disable",
      },

      betGame:   {
        status: "active",
        enable: true,

      },
      startGame: {
        enable: false,
        status: "disable",

      },
      gameOver:  {
        enable: false,
        status: "disable",

      },
    };
    const starAnim = {
	          starMove: {
		          loops:0,
		          setup: {
			          rotation: 0,
		          },
		          this: [
			          {
				          duration: 0,
				          rotation: 0,
			          }, {
				          duration: 2,
				          rotation: 10 * (Math.PI / 180),
			          },
			          {
				          duration: 2,
				          rotation: 0 * (Math.PI / 180),
			          },
			          {
				          duration: 2,
				          rotation: -10 * (Math.PI / 180),
			          },
			          {
				          duration: 2,
				          rotation: 0 * (Math.PI / 180),
			          },
		          ],
	          },
          };
    this._config.ui = {
      id:     "UI",
      type:   "ui",
      config: {
        name:                "ui",
        visible:             false,
        needMask:            false,
        parentGroup:         "UI",
        animationParameters: {
          buttonAnimationSpeed: 0.3,
        },
        testText:            {
          on:   false,
          text: "UI",
        },
        sceneObj:            [
	        {
		        name: 'buttonPause',
		        type: core.display.Button,
		        states: {
			        initialGame: {
				        status: 'active',
				        enable: true,
			        },
			        introGame: {
				        status: 'active',
				        enable: true,
			        },
			        betGame: {
				        status: 'active',
				        enable: true,
			        },
			        startGame: {
				        status: 'active',
				        enable: true,
			        },
			        selectGame: {
				        status: 'active',
				        enable: true,
			        },
			        hit: {
				        status: 'active',
				        enable: true,
			        },
			        stand: {
				        status: 'active',
				        enable: true,
			        },
			        gameOver: {
				        status: 'active',
				        enable: true,
			        },
		        },
		        landscape: {
			        x: 1860,
			        y: 6,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.6,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        portrait: {
			        x: 1400,
			        y: 0,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.8,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        sceneObj: [
			        {
				        texture: 'BTN_Enabled_Green',
				        name: 'buttonHomeSprite',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'btn_pause_press',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'btn_pause_press',
					        anchor: 0.5,
				        },
			        },
		        ],
	        },
	        {
		        name: 'buttonVolume',
		        type: core.display.Button,
		        states: {
			        initialGame: {
				        status: 'active',
				        enable: true,
			        },
			        introGame: {
				        status: 'active',
				        enable: true,
			        },
			        betGame: {
				        status: 'active',
				        enable: true,
			        },
			        startGame: {
				        status: 'active',
				        enable: true,
			        },
			        selectGame: {
				        status: 'active',
				        enable: true,
			        },
			        hit: {
				        status: 'active',
				        enable: true,
			        },
			        stand: {
				        status: 'active',
				        enable: true,
			        },
			        gameOver: {
				        status: 'active',
				        enable: true,
			        },
		        },
		        landscape: {
			        x: 1720,
			        y: 6,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.6,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        portrait: {
			        x: 1260,
			        y: 0,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.8,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        sceneObj: [
			        {
				        texture: 'btn_sound_0_active',
				        name: 'buttonVolumeSprite',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'btn_sound_0_press',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'btn_sound_0_press',
					        anchor: 0.5,
				        },
			        },
		        ],
	        },
	        {
		        name: 'buttonFullScreen',
		        type: core.display.Button,
		        states: {
			        initialGame: {
				        status: 'active',
				        enable: true,
			        },
			        introGame: {
				        status: 'active',
				        enable: true,
			        },
			        betGame: {
				        status: 'active',
				        enable: true,
			        },
			        startGame: {
				        status: 'active',
				        enable: true,
			        },
			        selectGame: {
				        status: 'active',
				        enable: true,
			        },
			        hit: {
				        status: 'active',
				        enable: true,
			        },
			        stand: {
				        status: 'active',
				        enable: true,
			        },
			        gameOver: {
				        status: 'active',
				        enable: true,
			        },
		        },
		        landscape: {
			        x: 1580,
			        y: 6,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.6,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        portrait: {
			        x: 1120,
			        y: 0,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.8,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        sceneObj: [
			        {
				        texture: 'btn_fullscreen_press',
				        name: 'btn_fullscreen_press',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'btn_fullscreen_press',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'btn_fullscreen_press',
					        anchor: 0.5,
				        },
			        },
		        ],
	        },
	        {
		        name: 'coin',
		        type: core.display.Button,
		        states: {
			        initialGame: {
				        status: 'active',
				        enable: true,
			        },
			        introGame: {
				        status: 'active',
				        enable: true,
			        },
			        betGame: {
				        status: 'active',
				        enable: true,
			        },
			        startGame: {
				        status: 'active',
				        enable: true,
			        },
			        selectGame: {
				        status: 'active',
				        enable: true,
			        },
			        hit: {
				        status: 'active',
				        enable: true,
			        },
			        stand: {
				        status: 'active',
				        enable: true,
			        },
			        gameOver: {
				        status: 'active',
				        enable: true,
			        },
		        },
		        landscape: {
			        x: 0,
			        y: 6,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.6,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        portrait: {
			        x: 420,
			        y: 0,
			        scaleX: 1,
			        scaleY: 1,
			        scales: {
				        unpressed: 1,
				        pressed: 0.8,
			        },
			        responsivePosition: {
				        position: 'top',
			        },
		        },
		        sceneObj: [
			        {
				        texture: 'collect_coin_icon',
				        name: 'line',
				        type: core.display.Sprite,
				        landscape: {
					        x: 200,
					        y: 20,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'coin_score_plate',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 200,
					        y: 20,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'coin_score_plate',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'collect_coin_icon',
				        name: 'coin',
				        type: core.display.Sprite,
				        landscape: {
					        x: 100,
					        y: 20,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'collect_coin_icon',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 100,
					        y: 20,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'collect_coin_icon',
					        anchor: 0.5,
				        },
			        },
			        {
				        name: 'text',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -50,
					        y: -40,
					        width: 100,
					        height: 80,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "white",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 52,
						        "lineJoin": "bevel",
						        "strokeThickness": 3
						        
					        },
					        text: '0',
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
					        x: 210,
					        y: 20,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 210,
					        y: 20,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        
				       
		        ],
	        },
	        {
		        name: 'endPopup',
		        type: core.display.Button,
		        states: {
			        initialGame: {
			   
				        status: 'active',
				        enable: true,
			        },
			        introGame: {
				        status: 'active',
				        enable: true,
			        },
			        betGame: {
				        status: 'active',
				        enable: true,
			        },
			        startGame: {
				        status: 'active',
				        enable: true,
			        },
			        selectGame: {
				        status: 'active',
				        enable: true,
			        },
			        hit: {
				        status: 'active',
				        enable: true,
			        },
			        stand: {
				        status: 'active',
				        enable: true,
			        },
			        gameOver: {
				        status: 'active',
				        enable: true,
			        },
		        },
		        landscape: {
			        alpha:1,
			        x: 960,
			        y: 500,
			        scaleX: 0.7,
			        scaleY: 0.7,
			        scales: {
				        unpressed: 1,
				        pressed: 0.6,
			        },
		        },
		        portrait: {
			     alpha:1,
			        x: 960,
			        y: 700,
			        scaleX: 0.7,
			        scaleY: 0.7,
			        scales: {
				        unpressed: 1,
				        pressed: 0.8,
			        },
		        },
		        sceneObj: [
			        {
				        texture: 'rays',
				        name: 'raycast',
				        animations: {
					        loopAnim: {
						        loops:0,
						        setup: {
							        rotation: 0,
						        },
						   
						        
						        this: [
							        {
								        duration: 0,
								        rotation: 0,
							        }, {
								        duration: 6,
								        rotation: 180 * (Math.PI / 180),
							        }, {
								        duration: 6,
								        rotation: 360 * (Math.PI / 180),
							        },
						        ],
					        },
				        },
				        type: core.display.KeyFrameSprite,
				        landscape: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'rays',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'rays',
					        anchor: 0.5,
				        },
			        },
				       
			        {
				        texture: 'collect_coin_icon',
				        name: 'bg',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'info_plate_big',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'info_plate_big',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'header_info_plate',
				        name: 'coin',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'header_info_plate',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'header_info_plate',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: -500,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -500,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_2',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: -550,
					        y: -155,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -550,
					        y: -155,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_3',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: -500,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -500,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_4',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: -500,
					        y: 345,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -500,
					        y: 345,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_5',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: 500,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 500,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_6',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: 550,
					        y: -155,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 550,
					        y: -155,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_7',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: 500,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 500,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'star',
				        name: 'start_8',
				        type: core.display.KeyFrameSprite,
				        animations: starAnim,
				        landscape: {
					        x: 500,
					        y: 345,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 500,
					        y: 345,
					        scaleX: 1.5,
					        scaleY: 1.5,
					        texture: 'star',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'ok_button_active',
				        name: 'ok',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 370,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'ok_button_active',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 370,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'ok_button_active',
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
					        text: 'Твои Очки:',
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
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        {
				        name: 'greenText',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -250,
					        y: -250,
					        width: 500,
					        height: 500,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "#14fa00",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 130,
						        "lineJoin": "bevel",
						
					        },
					        text: '98',
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
					        x: 0,
					        y: -280,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 0,
					        y: -280,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        {
				        texture: 'collect_coin_icon',
				        name: 'coin',
				        type: core.display.Sprite,
				        landscape: {
					        x: -180,
					        y: -100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'collect_coin_icon',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -180,
					        y: -100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'collect_coin_icon',
					        anchor: 0.5,
				        },
			        },
			        {
				        name: 'orangeText',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -250,
					        y: -250,
					        width: 500,
					        height: 500,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "#ff9300",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 100,
						        "lineJoin": "bevel",
						
					        },
					        text: '2',
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
					        x: 0,
					        y: -100,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 0,
					        y: -100,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        {
				        name: 'blueText',
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
						        "fill": "rgb(120,255,255)",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 100,
						        "lineJoin": "bevel",
						
					        },
					        text: '87',
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
					        x: 0,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 0,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        {
				        texture: 'collect_coin_icon',
				        name: 'flag',
				        type: core.display.Sprite,
				        landscape: {
					        x: -180,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'collect_distance_icon',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -180,
					        y: 100,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'collect_distance_icon',
					        anchor: 0.5,
				        },
			        },
		
		        ],
	        },
	        {
		        name: 'recordPopup',
		        type: core.display.Button,
		        states: {
			        initialGame: {
				
				        status: 'active',
				        enable: true,
			        },
			        introGame: {
				        status: 'active',
				        enable: true,
			        },
			        betGame: {
				        status: 'active',
				        enable: true,
			        },
			        startGame: {
				        status: 'active',
				        enable: true,
			        },
			        selectGame: {
				        status: 'active',
				        enable: true,
			        },
			        hit: {
				        status: 'active',
				        enable: true,
			        },
			        stand: {
				        status: 'active',
				        enable: true,
			        },
			        gameOver: {
				        status: 'active',
				        enable: true,
			        },
		        },
		        landscape: {
			        alpha:1,
			        x: 1700,
			        y: 500,
			        scaleX: 0.5,
			        scaleY: 0.5,
			        scales: {
				        unpressed: 1,
				        pressed: 0.6,
			        },
		        },
		        portrait: {
			        alpha:1,
			        x: 960,
			        y: 10,
			        scaleX: 0.5,
			        scaleY: 0.5,
			        scales: {
				        unpressed: 1,
				        pressed: 0.8,
			        },
		        },
		        sceneObj: [
			
			
			        {
				        texture: 'collect_coin_icon',
				        name: 'bg',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'info_plate_big',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'info_plate_big',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'header_info_plate',
				        name: 'coin',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'header_info_plate',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'header_info_plate',
					        anchor: 0.5,
				        },
			        },
	
			        {
				        texture: 'ok_button_active',
				        name: 'ok',
				        type: core.display.Sprite,
				        landscape: {
					        x: 0,
					        y: 370,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'ok_button_active',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 0,
					        y: 370,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'ok_button_active',
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
					        text: 'Таблица Рекордов :',
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
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 0,
					        y: -415,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        {
				        name: 'orangeText',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -250,
					        y: -250,
					        width: 500,
					        height: 500,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "#fa6c00",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 70,
						        "lineJoin": "bevel",
						        "dropShadow": true,
						
					        },
					        text: 'Неделя',
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
					        x: 0,
					        y: -300,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 0,
					        y: -300,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        {
				        texture: 'arrow_btn_active',
				        name: 'leftArrow',
				        type: core.display.Sprite,
				        landscape: {
					        x: -280,
					        y: -300,
					        scaleX: -1,
					        scaleY: 1,
					        texture: 'arrow_btn_active',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -280,
					        y: -300,
					        scaleX: -1,
					        scaleY: 1,
					        texture: 'arrow_btn_active',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'place_1',
				        name: 'place_1',
				        type: core.display.Sprite,
				        landscape: {
					        x: -100,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'place_1',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -100,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'place_1',
					        anchor: 0.5,
				        },
			        },
			        {
				        name: 'placeText',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -250,
					        y: -250,
					        width: 500,
					        height: 500,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "#ffa05b",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 30,
						
					        },
					        text: 'BLALALALALALAL',
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
					        x: -100,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: -100,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
	
			        {
				        texture: 'place_2',
				        name: 'place_2',
				        type: core.display.Sprite,
				        landscape: {
					        x: -100,
					        y: -90,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'place_2',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -100,
					        y: -90,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'place_2',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'place_3',
				        name: 'place_3',
				        type: core.display.Sprite,
				        landscape: {
					        x: -100,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'place_3',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: -100,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'place_3',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'midleader_scores_plate',
				        name: 'score',
				        type: core.display.Sprite,
				        landscape: {
					        x: 260,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'midleader_scores_plate',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 260,
					        y: 0,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'midleader_scores_plate',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'midleader_scores_plate',
				        name: 'score_1',
				        type: core.display.Sprite,
				        landscape: {
					        x: 260,
					        y: -90,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'midleader_scores_plate',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 260,
					        y: -90,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'midleader_scores_plate',
					        anchor: 0.5,
				        },
			        },
			        {
				        texture: 'midleader_scores_plate',
				        name: 'score_2',
				        type: core.display.Sprite,
				        landscape: {
					        x: 260,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'midleader_scores_plate',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 260,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'midleader_scores_plate',
					        anchor: 0.5,
				        },
			        },
			        {
				        name: 'placeTextNumber',
				        type: core.display.DisplayText,
				        dimensions: {
					        x: -250,
					        y: -250,
					        width: 500,
					        height: 500,
				        },
				        debugShape: false,
				        scaleDownToFit: true,
				        paramText: {
					        style:     {
						        "fill": "#ffa05b",
						        "fontFamily": "\"Arial Black\", Gadget, sans-serif",
						        "fontSize": 30,
						
					        },
					        text: '10000',
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
					        x: 250,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
				        },
				        portrait: {
					        x: 250,
					        y: -180,
					        scaleX: 1,
					        scaleY: 1,
				        },
			        },
			        
			        {
				        texture: 'rightArrow',
				        name: 'rightArrow',
				        type: core.display.Sprite,
				        landscape: {
					        x: 280,
					        y: -300,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'arrow_btn_active',
					        anchor: 0.5,
				        },
				        portrait: {
					        x: 280,
					        y: -300,
					        scaleX: 1,
					        scaleY: 1,
					        texture: 'arrow_btn_active',
					        anchor: 0.5,
				        },
			        },
		
		        ],
	        },
        ],
      },
    };
  }

  /**
   /**
   * @getter
   * Ui paramaters
   */
  get config() {
    return {
      key:   "ui",
      value: this._config.ui,
    };
  }
}
