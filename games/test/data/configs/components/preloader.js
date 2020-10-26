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
						      color:     0x00AAFF,
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
						      color:     0x00AAFF,
						      rect:      {
							      x:      0,
							      y:      0,
							      width:  3000,
							      height: 3000,
						      },
					      },
				      },
			      ],
		      },
		      {
			      name:      "preloader",
			      type:      core.display.SceneObject,
			      landscape: {
				      x:      960,
				      y:      500,
				      scaleX: 1,
				      scaleY: 1,
			      },
			      portrait:  {
				      x:      960,
				      y:      500,
				      scaleX: 1,
				      scaleY: 1,
			      },
			      sceneObj:  [
				      {
					      texture: 'persJump',
					      name: 'pers',
					      type: core.display.Sprite,
					      landscape: {
						      x: 0,
						      y: 0,
						      scaleX: 1,
						      scaleY: 1,
						      anchor: 0.5,
						      texture: 'persJump',
					      },
					      portrait: {
						      x: 0,
						      y: 0,
						      scaleX: 1,
						      scaleY: 1,
						      anchor: 0.5,
						      texture: 'persJump',
					      },
				      },
				      {
					      texture: 'ride',
					      name: 'ride',
					      type: core.display.Sprite,
					      landscape: {
						      x: 0,
						      y: -230,
						      scaleX: 1,
						      scaleY: 1,
						      anchor: 0.5,
						      texture: 'ride',
					      },
					      portrait: {
						      x: 0,
						      y: -230,
						      scaleX: 1,
						      scaleY: 1,
						      anchor: 0.5,
						      texture: 'ride',
					      },
				      },
				      {
					      name:           "text",
					      type:           core.display.DisplayText,
					      dimensions:     {
						      x:      -250,
						      y:      -250,
						      width:  500,
						      height: 500,
					      },
					      debugShape:     false,
					      scaleDownToFit: true,
					      paramText:      {
						      style:     {
							      "fontFamily": "\"Arial Black\", Gadget, sans-serif",
							      "fontSize": 52,
							      "lineJoin": "bevel",
							      "strokeThickness": 3
						      },
						      text:      'Mi Bunny',
						      landscape: {
							      x: 0,
							      y: 0,
						      },
						      portrait:  {
							      x: 0,
							      y: 0,
						      },
					      },
					      landscape:      {
						      x:      100,
						      y:      -330,
						      scaleX: 1,
						      scaleY: 1,
						      rotation:-8
					      },
					      portrait:       {
						      x:      100,
						      y:      -330,
						      scaleX: 1,
						      scaleY: 1,
						      rotation:-8
					      },
				      },
			      ],
		      },
		      {
			      name:      "progressBar",
			      type:      core.display.SceneObject,
			      landscape: {
				      x:      960,
				      y:      500,
				      scaleX: 1,
				      scaleY: 1,
			      },
			      portrait:  {
				      x:      960,
				      y:      500,
				      scaleX: 1,
				      scaleY: 1,
			      },
			      sceneObj:  [
				      {
					      name:      "barBG",
					      type:      core.display.Graphics,
					      landscape: {
						      x:         0,
						      y:         260,
						      rectAlpha: 1,
						      color:     0xEBEBEB,
						      rect:      {
							      x:      -455,
							      y:      -55,
							      width:  910,
							      height: 60,
						      },
					      },
					      portrait: {
						      x:         0,
						      y:         260,
						      rectAlpha: 1,
						      color:     0xEBEBEB,
						      rect:      {
							      x:      -455,
							      y:      -55,
							      width:  910,
							      height: 60,
						      },
					      },
				      },
				      {
					      name:      "barMiddleBG",
					      type:      core.display.Graphics,
					      landscape: {
						      x:         0,
						      y:         260,
						      rectAlpha: 1,
						      color:     0x0059AD,
						      rect:      {
							      x:      -450,
							      y:      -50,
							      width:  900,
							      height: 50,
						      },
					      },
					      portrait: {
						      x:         0,
						      y:         260,
						      rectAlpha: 1,
						      color:     0x0059AD,
						      rect:      {
							      x:      -450,
							      y:      -50,
							      width:  900,
							      height: 50,
						      },
					      },
				      },
				      {
					      name:      "barTop",
					      type:      core.display.Graphics,
					      landscape: {
						      x:         0,
						      y:         260,
						      rectAlpha: 1,
						      color:     0xFF8F00,
						      rect:      {
							      x:      -450,
							      y:      -50,
							      width:  900,
							      height: 50,
						      },
					      },
					      portrait: {
						      x:         0,
						      y:         260,
						      rectAlpha: 1,
						      color:     0xFF8F00,
						      rect:      {
							      x:      -450,
							      y:      -50,
							      width:  900,
							      height: 50,
						      },
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
