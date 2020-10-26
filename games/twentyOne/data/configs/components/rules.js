export default class Rules extends core.manager.Config {
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
      fontFamily: 'NotoSans-Bold',
      fontSize: 35,
      strokeThickness: 0.5
    });
    const fieldLabel = new PIXI.TextStyle({
      fill: '#cdcdcd',
      fontWeight: 'bold',
      fontFamily: 'NotoSans-Bold',
      wordWrapWidth: 80,
      fontSize: 60,
      strokeThickness: 1,
      dropShadow: true,
      dropShadowAlpha: 0.4,
      dropShadowBlur: 4,
      dropShadowDistance: 6
    });

    const labelBoardStyle = new PIXI.TextStyle({
      fill: '#dedede',
      fontFamily: 'NotoSans-Bold',
      fontWeight: '800',
      fontSize: 30,
      strokeThickness: 0.5
    });

    const translation = this._model.libary.translation;
    const rulesTextConfigs = [];
    const ruleTranslation = translation.ruleMenu.rules;
    const ruleOffsets = 1;
    ruleTranslation.forEach((translation, i) => {
      const rule = {
        name: 'rule_' + i,
        type: core.display.DisplayText,
        dimensions: { x: -500, y: -75, width: 1000, height: 150 },
        debugShape: false,
        scaleDownToFit: true,
        hAlign: 1,
        vAlign: 0,
        paramText: {
          disable: true,
          style: labelBoardStyle,
          text: translation.lineText,
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
          y: ruleOffsets * i,
          scaleX: 1,
          scaleY: 1,
          dimensions: { x: -900, y: -75, width: 1800, height: 150 }
        },
        portrait: {
          x: 0,
          y: ruleOffsets * i,
          scaleX: 1,
          scaleY: 1,
          dimensions: { x: -500, y: -75, width: 1000, height: 150 }
        }
      };
      rulesTextConfigs.push(rule);
    });
    

    this._config.rules = {
      id: 'Rules',
      type: 'rules',
      config: {
        visible: false,
        needMask: false,
        parentGroup: 'DEFAULT',
        testText: {
          on: false,
          text: 'menu component'
        },

        //,
        // DisplayText
        sceneObj: [
          {
            cacheAsBitmap: true,
            texture: 'BG',
            width: 1920 * 2,
            height: 1920 * 2,
            name: 'bg',
            type: core.display.TilingSprite,
            landscape: {
              x: -250,
              y: -1000,
              scaleX: 1,
              scaleY: 1,
              texture: 'BG'
            },
            portrait: {
              x: 0,
              y: -1000,
              scaleX: 1,
              scaleY: 1,
              texture: 'BG'
            }
          },
          {
            name: 'glow',
            type: core.display.Sprite,
            blendMode: 'SOFT_LIGHT',
            texture: 'soft_light_landscape_bg',
            landscape: {
              x: 0,
              y: -100,
              scaleX: 1.5,
              scaleY: 1.5,
              alpha: 0.2,
              anchor: 0.5,
              blendMode: 'ADD',
              texture: 'soft_light_landscape_bg',
              responsivePosition: {
                position: 'center'
              }
            },
            portrait: {
              x: 0,
              y: 0,
              scaleX: 1.5,
              scaleY: 1.5,
              alpha: 0.2,
              anchor: 0.5,
              blendMode: 'ADD',
              texture: 'soft_light_portret_bg',
              responsivePosition: {
                position: 'center'
              }
            }
          },
          {
            name: 'backRule',
            enableSceneObj: true,
            type: core.display.Button,
            landscape: {
              x: 80,
              y: 6,
              scaleX: 1,
              scaleY: 1,
              scales: {
                 unpressed: 1,
                pressed: 0.9
              },
              responsivePosition: {
                position: 'top'
              }
            },
            portrait: {
              x: 500,
              y: 6,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed: 0.9
              },
              responsivePosition: {
                position: 'top'
              }
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
                  texture: 'BTN_Enabled_Green',
                  anchor: 0.5
                },
                portrait: {
                  x: 0,
                  y: 0,
                  scaleX: 1,
                  scaleY: 1,
                  texture: 'BTN_Enabled_Green',
                  anchor: 0.5
                }
              },
              {
                name: 'logo',
                type: core.display.Sprite,
                landscape: {
                  x: 0,
                  y: -7,
                  scaleX: 1,
                  scaleY: 1,
                  texture: 'ic_back',
                  anchor: 0.5
                },
                portrait: {
                  x: 0,
                  y: -7,
                  scaleX: 1,
                  scaleY: 1,
                  texture: 'ic_back',
                  anchor: 0.5
                }
              }
            ]
          },
          {
            name: 'ruleBoard',
            enableSceneObj: true,
            type: core.display.SceneObject,
            landscape: {
              x: 960,
              y: -630,
              scaleX: 1,
              scaleY: 1,
              changePosX: 0,
              changePosY: 500,
              responsivePosition: {
                position: 'top'
              }
            },
            portrait: {
              x: 960,
              y: -490,
              scaleX: 1.1,
              scaleY: 1.1,
              changePosX: 0,
              changePosY: 500,
              responsivePosition: {
                position: 'top'
              }
            },
            sceneObj: [
              {
                name: 'bg',
                type: core.display.Graphics,
                landscape: {
                  x: 0,
                  y: 585,
                  scaleX: 1,
                  scaleY: 1,
                  rectAlpha: 0.5,
                  color: 0x000000,
                  rect: {
                    x: -700,
                    y: -540,
                    width: 1400,
                    height: 1300
                  },
                  pivotCenter: true
                },
                portrait: {
                  x: 0,
                  y: 585,
                  scaleX: 1,
                  scaleY: 1,
                  rectAlpha: 0.5,
                  color: 0x000000,
                  rect: {
                    x: -490,
                    y: -540,
                    width: 980,
                    height: 1300
                  },
                  pivotCenter: true
                }
              },
              {
                name: 'labelBG',
                type: core.display.Sprite,
                landscape: {
                  x: 0,
                  y: 0,
                  anchor: 0.5,
                  scaleX: 0.77,
                  scaleY: 0.77,
                  texture: 'landscape_results_BG'
                },
                portrait: {
                  x: 0,
                  y: 0,
                  anchor: 0.5,
                  scaleX: 1,
                  scaleY: 1,
                  texture: 'portret_results_BG'
                }
              },
              {
                name: 'labelText',
                type: core.display.DisplayText,
                dimensions: { x: -300, y: -45, width: 600, height: 90 },
                debugShape: false,
                scaleDownToFit: true,
                paramText: {
                  style: fieldLabel,
                  text: core.core.getTranslation('title', 'ruleMenu'),
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
                  y: 0,
                  scaleX: 1,
                  scaleY: 1
                },
                portrait: {
                  x: 0,
                  y: 0,
                  scaleX: 1,
                  scaleY: 1
                }
              }
            ]
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
      key: 'rules',
      value: this._config.rules
    };
  }
}
