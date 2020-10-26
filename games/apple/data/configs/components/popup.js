export default class Popup extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for popup
   */
  createConfig() {
    const translation    = this._model.libary.translation;
  

    this._config.popup = {
      id:     "Popup",
      type:   "popup",
      config: {
        visible:        false,
        needMask:       false,
        parentGroup:    "DEFAULT",
        animationSpeed: 1,
        simpleOffset:   800,
        testText:       {
          on:   false,
          text: "popup component",
        },
        sceneObj:       [
          {
            name:      "bg",
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
                name:       "bg",
                type:       core.display.KeyFrameGraphics,
                animations: {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        delay:    0.6,
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                landscape:  {
                  x:           0,
                  y:           0,
                  scaleX:      1,
                  scaleY:      1,
                  rectAlpha:   0.7,
                  color:       0x000000,
                  rect:        {
                    x:      -1920,
                    y:      -1080,
                    width:  1920 * 2,
                    height: 1080 * 2,
                  },
                  pivotCenter: true,
                },
                portrait:   {
                  x:           0,
                  y:           0,
                  scaleX:      1,
                  scaleY:      1,
                  rectAlpha:   0.7,
                  color:       0x000000,
                  rect:        {
                    x:      -1080,
                    y:      -1920,
                    width:  1080 * 2,
                    height: 1920 * 2,
                  },
                  pivotCenter: true,
                },
              },
            ],
          },
          {
            name:      "gameOver",
            type:      core.display.SceneObject,
            landscape: {
              x:      960,
              y:      540,
              scaleX: 1,
              scaleY: 1,
            },
            portrait:  {
              x:      960,
              y:      540,
              scaleX: 1,
              scaleY: 1,
            },
            sceneObj:  [
              {
                name:       "win-win-lose_notification",
                type:       core.display.Spine,
                animations: {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },

                landscape: {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
                portrait:  {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
              },
              {
                name:           "description",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -30,
                  width:  450,
                  height: 60,
                },
	              animations:     {
		              show: {
			              setup: {
				              alpha: 0
			              },
			              this:  [
				              {
					              duration: 0.6,
					              alpha:    1,
					              ease:     core.tween.Quad.easeOut,
				              }, {
					              duration: 0.2,
					              alpha:    1,
					              ease:     core.tween.Quad.easeIn,
				              }, {
					              duration: 0.2,
					              alpha:    1,
					              ease:     core.tween.Quad.easeOut,
				              },
			              ],
		              },
		              hide: {
			              setup: {
				              alpha: 1,
			              },
			              this:  [
				              {
					              duration: 0.2,
					              alpha:    0.5,
					              ease:     core.tween.Quad.easeOut,
				              }, {
					              duration: 0.5,
					              alpha:    0,
					              ease:     core.tween.Quad.easeIn,
				              },
			              ],
		              },
	              },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.popups.label,
                  text:      'Lose',
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
                  x:      0,
                  y:      80,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      80,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "text",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -500,
                  y:      -200,
                  width:  1000,
                  height: 400,
                },
                animations:     {
                  show: {
                    setup: {
                      alpha: 0
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeOut,
                      }, {
                        duration: 0.2,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      }, {
                        duration: 0.2,
                        alpha:    1,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.2,
                        alpha:    0.5,
                        ease:     core.tween.Quad.easeOut,
                      }, {
                        duration: 0.5,
                        alpha:    0,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                },
                debugShape:     false,
                hAlign:         0,
                vAlign:         -1,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.main,
                  text:      core.getTranslation("title", "popupGameOver"),
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
                  x:      0,
                  y:      -170,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      -170,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "okButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      0,
                  y:      190,
                  scaleX: 1,
                  scaleY: 1,
                  scales: {
                    unpressed: 1,
                    pressed:   1.2,
                  },
                },
                portrait:       {
                  x:      0,
                  y:      190,
                  scaleX: 1,
                  scaleY: 1,
                  scales: {
                    unpressed: 1,
                    pressed:   1.2,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
                    skin:            "win",
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.ok,
                      text:      core.getTranslation("ok", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
            ],
          },
          {
            name:      "home",
            type:      core.display.SceneObject,
            landscape: {
              x:      960,
              y:      500,
              scaleX: 1.4,
              scaleY: 1.4,
            },
            portrait:  {
              x:      960,
              y:      400,
              scaleX: 1.3,
              scaleY: 1.3,
            },
            sceneObj:  [
              {
                name:            "win-win-lose_notification",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },

                landscape: {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
                portrait:  {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
              },
              {
                name:           "title",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -50,
                  width:  450,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style:     StyleText.popups.label.default,
                  text:      core.getTranslation("title", "popupBack"),
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
                  x:      0,
                  y:      -20,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      -20,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "description",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -60,
                  width:  450,
                  height: 120,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style:     StyleText.popups.description.default,
                  text:      core.getTranslation("description", "popupBack"),
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
                  x:      0,
                  y:      50,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      50,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "yesButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      -125,
                  y:      150,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  scales: {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                portrait:       {
                  enableSceneObj: true,
                  x:              -125,
                  y:              150,
                  scaleX:         0.9,
                  scaleY:         0.9,
                  scales:         {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
                    skin:            "lose",
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.yes,
                      text:      core.getTranslation("yes", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
              {
                name:           "noButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      125,
                  y:      150,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  scales: {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                portrait:       {
                  x:      125,
                  y:      150,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  scales: {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
                    skin:            "win",
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.no,
                      text:      core.getTranslation("no", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
            ],
          },
          {
            name:      "internet",
            type:      core.display.SceneObject,
            landscape: {
              x:      960,
              y:      500,
              scaleX: 1.4,
              scaleY: 1.4,
            },
            portrait:  {
              x:      960,
              y:      400,
              scaleX: 1.3,
              scaleY: 1.3,
            },
            sceneObj:  [
              {
                name:            "win-win-lose_notification",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },

                landscape: {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
                portrait:  {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
              },
              {
                name:           "title",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -50,
                  width:  450,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style:     StyleText.popups.label.default,
                  text:      core.getTranslation("title", "popupConnection"),
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
                  x:      0,
                  y:      -40,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      -40,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "description",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -60,
                  width:  450,
                  height: 120,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style:     StyleText.popups.description.default,
                  text:      core.getTranslation("description", "popupConnection"),
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
                  x:      0,
                  y:      20,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      20,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "yesButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      -125,
                  y:      130,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  scales: {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                portrait:       {
                  enableSceneObj: true,
                  x:              -125,
                  y:              130,
                  scaleX:         0.9,
                  scaleY:         0.9,
                  scales:         {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
                    skin:            "win",
	                  
	               
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.yes,
                      text:      core.getTranslation("yes", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
              {
                name:           "noButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      125,
                  y:      130,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  scales: {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                portrait:       {
                  x:      125,
                  y:      130,
                  scaleX: 0.9,
                  scaleY: 0.9,
                  scales: {
                    unpressed: 0.9,
                    pressed:   0.8,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
	                  skin:            "lose",
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.no,
                      text:      core.getTranslation("no", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
            ],
          },
          {
            name:      "limit",
            type:      core.display.SceneObject,
            landscape: {
              x:      960,
              y:      500,
              scaleX: 1.4,
              scaleY: 1.4,
            },
            portrait:  {
              x:      960,
              y:      400,
              scaleX: 1.3,
              scaleY: 1.3,
            },
            sceneObj:  [
              {
                name:            "win-win-lose_notification",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },

                landscape: {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
                portrait:  {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
              },
              {
                name:           "title",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -50,
                  width:  450,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style:     StyleText.popups.label.default,
                  text:      core.getTranslation("title", "popupLimits"),
                  landscape: {
                    x: 0,
                    y: 50,
                  },
                  portrait:  {
                    x: 0,
                    y: 50,
                  },
                },
                landscape:      {
                  x:      0,
                  y:      -20,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      -20,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "description",
                type:           core.display.KeyFrameTextDisplay,
                dimensions:     {
                  x:      -225,
                  y:      -30,
                  width:  450,
                  height: 60,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style:     StyleText.popups.description.default,
                  text:      core.getTranslation("description", "popupLimits").min,
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
                  x:      0,
                  y:      50,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      50,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:           "okButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      0,
                  y:      150,
                  scaleX: 1,
                  scaleY: 1,
                  scales: {
                    unpressed: 1,
                    pressed:   0.6,
                  },
                },
                portrait:       {
                  x:      0,
                  y:      150,
                  scaleX: 1,
                  scaleY: 1,
                  scales: {
                    unpressed: 1,
                    pressed:   0.6,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
                    skin:            "win",
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.ok,
                      text:      core.getTranslation("ok", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
            ],
          },
          {
            name:      "rules",
            type:      core.display.SceneObject,
            landscape: {
              x:      960,
              y:      545,
              scaleX: 1,
              scaleY: 1,
            },
            portrait:  {
              x:      960,
              y:      400,
              scaleX: 1,
              scaleY: 1,
            },
            sceneObj:  [
              {
                name:            "win-win-lose_notification",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },

                landscape: {
                  x:           85,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  rotation:    90,
                  spineCenter: false,
                },
                portrait:  {
                  x:           0,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  rotation:    0,
                  spineCenter: false,
                },
              },
              {
                name:           "rulesHeader",
                type:           core.display.KeyFrameTextDisplay,
                landscape:      {
                  x:      0,
                  y:      -400,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      -600,
                  scaleX: 1,
                  scaleY: 1,
                },
                dimensions:     {
                  x:      -250,
                  y:      -50,
                  width:  500,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
                  style: StyleText.popups.rules.header,
                  text:  core.getTranslation("title", "ruleMenu"),
                },
              },
	            {
		            name:           "rulesLandscape",
		            type:           core.display.KeyFrameTextDisplay,
		            landscape:      {
			            x:      0,
			            y:      0,
			            scaleX: 1,
			            scaleY: 1,
			            dimensions:     {
				            x:      -825,
				            y:      -325,
				            width:  1650,
				            height: 650,
			            },
		            },
		            portrait:       {
			            x:      0,
			            y:      100,
			            scaleX: 1,
			            scaleY: 1,
			            dimensions:     {
				            x:      -475,
				            y:      -600,
				            width:  950,
				            height: 1200,
			            },
		            },
		            dimensions:     {
			            x:      -250,
			            y:      -250,
			            width:  500,
			            height: 500,
		            },
		            debugShape:     false,
		            hAlign:         0,
		            vAlign:     1,
		
		            scaleDownToFit: true,
		            animations:     {
			            show: {
				            setup: {
					            alpha: 0,
				            },
				            this:  [
					            {
						            duration: 0.6,
						            alpha:    1,
						            ease:     core.tween.Quad.easeIn,
					            },
				            ],
			            },
			            hide: {
				            setup: {
					            alpha: 1,
				            },
				            this:  [
					            {
						            duration: 0.6,
						            alpha:    0,
						            ease:     core.tween.Quad.easeOut,
					            },
				            ],
			            },
		            },
		            paramText:      {
			            disable:true,
			            style: StyleText.popups.rules.landscape,
			            text:  core.getTranslation("rules", "ruleMenu"),
			            landscape: {
				            x: 0,
				            y: 0,
				            updateStyle:true,
				            style:StyleText.popups.rules.landscape,
			            },
			            portrait: {
				            x: 0,
				            y: 0,
				            updateStyle:true,
				            style:StyleText.popups.rules.landscape,
			            },
		            },
		
	            },
              {
                name:           "rulesText",
                type:           core.display.KeyFrameTextDisplay,
                landscape:      {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
	                dimensions:     {
		                x:      -825,
		                y:      -325,
		                width:  1650,
		                height: 650,
	                },
                },
                portrait:       {
                  x:      0,
                  y:      100,
	                scaleX: 1,
	                scaleY: 1,
	                dimensions:     {
		                x:      -475,
		                y:      -600,
		                width:  950,
		                height: 1200,
	                },
                },
                dimensions:     {
                  x:      -250,
                  y:      -250,
                  width:  500,
                  height: 500,
                },
                debugShape:     false,
	              hAlign:         0,
	              vAlign:     1,
	              
                scaleDownToFit: true,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                paramText:      {
	                disable:true,
                  style: StyleText.popups.rules.portrait,
                  text:  core.getTranslation("rules", "ruleMenu"),
	                landscape: {
		                x: 0,
		                y: 0,
		                updateStyle:true,
		                style:StyleText.popups.rules.portrait,
	                },
	                portrait: {
		                x: 0,
		                y: 0,
		                updateStyle:true,
		                style:StyleText.popups.rules.portrait,
	                },
                },
	              
              },
              {
                name:           "closeButton",
                type:           core.display.Button,
                animations:     {
                  show: {
                    setup: {
                      alpha: 0,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    1,
                        ease:     core.tween.Quad.easeIn,
                      },
                    ],
                  },
                  hide: {
                    setup: {
                      alpha: 1,
                    },
                    this:  [
                      {
                        duration: 0.6,
                        alpha:    0,
                        ease:     core.tween.Quad.easeOut,
                      },
                    ],
                  },
                },
                enableSceneObj: true,
                landscape:      {
                  x:      0,
                  y:      400,
                  scaleX: 1.4,
                  scaleY: 1.4,
                  scales: {
                    unpressed: 1.4,
                    pressed:   1.2,
                  },
                },
                portrait:       {
                  x:      0,
                  y:      800,
                  scaleX: 1.4,
                  scaleY: 1.4,
                  scales: {
                    unpressed: 1.4,
                    pressed:   1.2,
                  },
                },
                sceneObj:       [
                  {
                    name:            "buttonPopup",
                    type:            core.display.Spine,
                    skin:            "win",
                    animations:      {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    spineAnimations: {
                      idle: {
                        name: "loop",
                        loop: true,
                      },
                    },

                    landscape: {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                    portrait:  {
                      x:           0,
                      y:           -110,
                      scaleX:      1.5,
                      scaleY:      1.5,
                      spineCenter: false,
                    },
                  },
                  {
                    name:           "text",
                    hasLoopAnim:    true,
                    type:           core.display.KeyFrameTextDisplay,
                    animations:     {
                      show: {
                        setup: {
                          alpha: 0,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    1,
                            ease:     core.tween.Quad.easeIn,
                          },
                        ],
                      },
                      loop: {
                        setup: {
                          scale: {
                            x: 1,
                            y: 1,
                          },
                        },
                        loops: 0,
                        this:  [
                          {
                            duration: 0.4,
                            scale:    {
                              x: 1.2,
                              y: 1.2,
                            },
                            ease:     core.tween.Sine.easeIn,
                          }, {
                            duration: 0.4,
                            scale:    {
                              x: 1,
                              y: 1,
                            },
                            ease:     core.tween.Sine.easeOut,
                          },
                        ],
                      },
                      hide: {
                        setup: {
                          alpha: 1,
                        },
                        this:  [
                          {
                            duration: 0.6,
                            alpha:    0,
                            ease:     core.tween.Quad.easeOut,
                          },
                        ],
                      },
                    },
                    dimensions:     {
                      x:      -160,
                      y:      -50,
                      width:  320,
                      height: 100,
                    },
                    debugShape:     false,
                    scaleDownToFit: true,
                    paramText:      {
                      style:     StyleText.popups.buttonText.no,
                      text:      core.getTranslation("close", "buttonText"),
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
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                    portrait:       {
                      x:      0,
                      y:      0,
                      scaleX: 1,
                      scaleY: 1,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  }

  /**
   * @getter
   * popup paramaters
   */
  get config() {
    return {
      key:   "popup",
      value: this._config.popup,
    };
  }
}
