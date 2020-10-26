export default class BGTop extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for BGTop
   */
  createConfig() {
    const fieldStyle = new PIXI.TextStyle({
      fill: '#274024',
      fontFamily: 'NotoSans-Light',
      fontSize: 35,
      fontWeight: '200'
    });
    const fieldLabel = new PIXI.TextStyle({
      fill: '#2a3e29',
      fontFamily: 'NotoSans-Bold',
      fontWeight: '700',
      fontSize: 50
    });
    const translation = this._model.libary.translation;

    this._config.bgTop = {
      id: 'BackgroundTop',
      type: 'backgroundtop',
      config: {
        visible: false,
        needMask: false,
        parentGroup: 'DEFAULT',
        testText: {
          on: false,
          text: 'backgroundTop component'
        },

        // DisplayText
        sceneObj: [
          {
            name: 'center',
            enableSceneObj: false,
            type: core.display.SceneObject,
            landscape: {
              x: 960,
              y: 400,
              scaleX: 0.7,
              scaleY: 0.7
            },
            portrait: {
              x: 960,
              y: 320,
              scaleX: 0.8,
              scaleY: 0.8
            },
            sceneObj: [
              {
                texture: 'bg_ribbon',
                name: 'bgText',
                type: core.display.Sprite,
                landscape: {
                  x: 0,
                  y: 0,
                  scaleX: 0.7,
                  scaleY: 0.7,
                  anchor: 0.5,
                  texture: 'bg_ribbon'
                },
                portrait: {
                  x: 0,
                  y: 0,
                  scaleX: 1,
                  scaleY: 1,
                  anchor: 0.5,
                  texture: 'bg_ribbon'
                }
              },
              {
                name: 'leftPaysTo',
                type: core.display.DisplayText,
                dimensions: { x: -100, y: -50, width: 200, height: 100 },
                debugShape: false,
                scaleDownToFit: true,
                paramText: {
                  style: fieldStyle,
                  text: core.getTranslation('paysTo'),
                  landscape: {
                    x: 0,
                    y: 0
                  },
                  portrait: {
                    x: 0,
                    y: 0
                  }
                },
                landscape: {
                  x: 270,
                  y: 0,
                  rotation: -7,
                  scaleX: 1,
                  scaleY: 1,
                  alpha: 0.7
                },
                portrait: {
                  x: 390,
                  y: 0,
                  rotation: -6,
                  scaleX: 1.6,
                  scaleY: 1.6,
                  alpha: 0.7
                }
              },
              {
                name: 'rightPaysTo',
                type: core.display.DisplayText,
                dimensions: { x: -100, y: -50, width: 200, height: 100 },
                debugShape: false,
                scaleDownToFit: true,
                paramText: {
                  style: fieldStyle,
                  text: core.getTranslation('paysTo'),
                  landscape: {
                    x: 0,
                    y: 0
                  },
                  portrait: {
                    x: 0,
                    y: 0
                  }
                },

                landscape: {
                  x: -270,
                  y: 0,
                  rotation: 7,
                  scaleX: 1,
                  scaleY: 1,
                  alpha: 0.7
                },
                portrait: {
                  x: -390,
                  y: 0,
                  rotation: 6,
                  scaleX: 1.6,
                  scaleY: 1.6,
                  alpha: 0.7
                }
              },
              {
                name: 'dealerStand',
                type: core.display.DisplayText,
                dimensions: { x: -200, y: -50, width: 400, height: 100 },
                debugShape: false,
                scaleDownToFit: true,
                paramText: {
                  style: fieldStyle,
                  text: `${core.getTranslation('dealerStand')} 17`,
                  landscape: {
                    x: 0,
                    y: 0
                  },
                  portrait: {
                    x: 0,
                    y: 0
                  }
                },
                landscape: {
                  x: 0,
                  y: -90,

                  scaleX: 1,
                  scaleY: 1,
                  alpha: 0.7
                },
                portrait: {
                  x: 0,
                  y: -110,
                  scaleX: 1.2,
                  scaleY: 1.2,
                  alpha: 0.7
                }
              },
              {
                name: 'insurance',
                type: core.display.DisplayText,
                dimensions: { x: -150, y: -50, width: 300, height: 100 },
                debugShape: false,
                scaleDownToFit: true,
                landscape: {
                  x: 0,
                  y: 15,
                  scaleX: 1,
                  scaleY: 1,
                  alpha: 0.7
                },
                portrait: {
                  x: 0,
                  y: 20,
                  scaleX: 1.4,
                  scaleY: 1.4,
                  alpha: 0.7
                },
                paramText: {
                  style: fieldLabel,
                  text: core.getTranslation('insurance'),
                  landscape: {
                    x: 0,
                    y: 0
                  },
                  portrait: {
                    x: 0,
                    y: 0
                  }
                }
              }
            ]
          },
          {
            texture: 'Chips_holder',
            name: 'Chips_holder',
            type: core.display.Sprite,
            landscape: {
              x: 0,
              y: 170,
              scaleX: 1,
              scaleY: 1,
              anchor: 0.5,
              texture: 'Chips_holder',
              responsivePosition: {
                position: 'top'
              }
            },
            portrait: {
              x: -500,
              y: -600,
              scaleX: 1,
              scaleY: 1,
              anchor: 0.5,
              texture: 'Chips_holder',
              responsivePosition: {
                position: 'center'
              }
            }
          },
          {
            name: 'bottom_bar',
            type: core.display.Sprite,
            landscape: {
              x: -255,
              y: 130,
              scaleX: 2.03,
              scaleY: 2,
              texture: 'landscape_bottom_bar',
              responsivePosition: {
                position: 'bottom',
                shift: { x: 0, y: 0 }
              }
            },
            portrait: {
              x: 250,
              y: 190,
              scaleX: 1,
              scaleY: 1,
              texture: 'portret_bottom_bar',
              responsivePosition: {
                position: 'bottom',
                shift: { x: 0, y: 0 }
              }
            }
          }
        ]
      }
    };
  }

  /**
   * @getter
   * bgTop paramaters
   */
  get config() {
    return {
      key: 'backgroundtop',
      value: this._config.bgTop
    };
  }
}
