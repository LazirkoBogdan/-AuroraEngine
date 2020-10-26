export default class twentyOne extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for twentyOne
   */
  createConfig() {
    this._config.twentyOne = {
      id:     "TwentyOne",
      type:   "twentyone",
      config: {
      	name:'twentyone',
        visible:     false,
        needMask:    false,
        parentGroup: "DEFAULT",
        testText:    {
          on:   false,
          text: "TwentyOne",
        },
        sceneObj:    [
          {
            name:           "field",
            enableSceneObj: false,
            type:           core.display.SceneObject,
            landscape:      {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
            },
            portrait:       {
              x:      0,
              y:      -100,
              scaleX: 1,
              scaleY: 1,
            },
            sceneObj:       [
              {
                name:               "cardfield",
                enableSceneObj:     false,
                type:               logic.components.cardField,
                landscape:          {
                  x:                  0,
                  y:                  -130,
                  scaleX:             1,
                  scaleY:             1,
                  shufflerOffsets:    {
                    x:        0,
                    y:        0,
                    rotation: 0,
                  },
                  responsivePosition: {
                    position: "center",
                  },
                },
                portrait:           {
                  x:                  0,
                  y:                  0,
                  scaleX:             1,
                  scaleY:             1,
                  shufflerOffsets:    {
                    x:        0,
                    y:        0,
                    rotation: 0,
                  },
                  responsivePosition: {
                    position: "center",
                  },
                },
                deskConfig:         {
                  landscape:  {
                    x:               800,
                    y:               0,
                    scaleX:          0.9,
                    scaleY:          0.9,
                    dealerOffsetX:   130,
                    dealerOffsetY:   500,
                    dealerScaleCard: 0.7,
                  },
                  portrait:   {
                    x:               500,
                    y:               -500,
                    scaleX:          1,
                    scaleY:          1,
                    dealerOffsetX:   130,
                    dealerOffsetY:   500,
                    dealerScaleCard: 0.7,
                  },
                  size:       10,
                  cardConfig: {
                    name:            "cards",
                    type:            core.display.Spine,
                    skin:            "c_2",
                    spineAnimations: {
                      idle: {
                        name: "0",
                        loop: false,
                      },
                    },
                    landscape:       {
                      x:           0,
                      y:           500,
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
                    offsetCard:      100,
                    rotation:        -30,
                    scale:           1,
                  },
                },
                sceneObj:           [
                  {
                    texture:   "Card_holder_bottom",
                    name:      "Card_holder_bottom",
                    type:      core.display.Sprite,
                    landscape: {
                      x:       835,
                      y:       -17,
                      scaleX:  0.9,
                      scaleY:  0.9,
                      anchor:  0.5,
                      texture: "Card_holder_bottom",
                    },
                    portrait:  {
                      x:       535,
                      y:       -515,
                      scaleX:  0.9,
                      scaleY:  0.9,
                      anchor:  0.5,
                      texture: "Card_holder_bottom",
                    },
                  },
                  {
                    name:      "field",
                    type:      core.display.Graphics,
                    landscape: {
                      x:           0,
                      y:           0,
                      scaleX:      1,
                      scaleY:      1,
                      rectAlpha:   0.01,
                      color:       0xff0000,
                      rect:        { x: -400, y: -300, width: 800, height: 550 },
                      pivotCenter: true,
                    },
                    portrait:  {
                      x:           0,
                      y:           0,
                      scaleX:      1,
                      scaleY:      1,
                      rectAlpha:   0.01,
                      color:       0xff0000,
                      rect:        { x: -550, y: -300, width: 1100, height: 600 },
                      pivotCenter: true,
                    },
                  },
                  {
                    name:       "shuffler",
                    type:       core.display.Spine,
                    animations: {
                      show: {
                        name: "show",
                        loop: false,
                      },
                    },
                    landscape:  {
                      x:           840,
                      y:           35,
                      scaleX:      1,
                      scaleY:      1,
                      rotation:    -30,
                      spineCenter: false,
                    },
                    portrait:   {
                      x:           535,
                      y:           -450,
                      scaleX:      1,
                      scaleY:      1,
                      rotation:    -30,
                      spineCenter: false,
                    },
                  },
                ],
                suitType:           ["d_", "c_", "h_", "s_"],
                cardType:           ["6", "7", "8", "9", "10", "J", "Q", "K", "A"],
                cardsValue:         [6, 7, 8, 9, 10, 2, 3, 4, 11],
                cardDealSpeed:      0.5,
                cardDealScaleSpeed: 0.3,
                cardSortSpeed:      0.3,
                easeMove:           "Back.easeIn",
                easeScale:          "Elastic.easeIn",
                easeSort:           "Expo.easeInOut",
              },
              {
                name:           "Card_holderTop",
                enableSceneObj: false,
                type:           core.display.SceneObject,
                landscape:      {
                  x:                  800,
                  y:                  -130,
                  scaleX:             1,
                  scaleY:             1,
                  responsivePosition: {
                    position: "center",
                  },
                },
                portrait:       {
                  x:                  500,
                  y:                  -500,
                  scaleX:             1,
                  scaleY:             1,
                  responsivePosition: {
                    position: "center",
                  },
                },
                sceneObj:       [
                  {
                    texture:   "Card_holder_top",
                    name:      "Card_holder",
                    type:      core.display.Sprite,
                    landscape: {
                      x:       0,
                      y:       0,
                      scaleX:  0.9,
                      scaleY:  0.9,
                      anchor:  0.5,
                      texture: "Card_holder_top",
                    },
                    portrait:  {
                      x:       0,
                      y:       0,
                      scaleX:  0.9,
                      scaleY:  0.9,
                      anchor:  0.5,
                      texture: "Card_holder_top",
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
   * twentyOne paramaters
   */
  get config() {
    return {
      key:   "twentyOne",
      value: this._config.twentyOne,
    };
  }
}
