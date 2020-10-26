export default class Settings extends core.manager.Config {
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
      fontFamily: 'Noto Sans SC',
      fontWeight: 'lighter',
      fontSize: 35,
      strokeThickness: 0.5
    });
    const fieldLabel = new PIXI.TextStyle({
      fill: '#cdcdcd',
      fontFamily: 'Noto Sans SC',
      fontWeight: 'bold',
      wordWrapWidth: 80,
      fontSize: 60,
      strokeThickness: 1,
      dropShadow: true,
      dropShadowAlpha: 0.4,
      dropShadowBlur: 4,
      dropShadowDistance: 6
    });
    const labelDescription = new PIXI.TextStyle({
      fill: '#b4b2b2',
      fontFamily: 'Noto Sans SC',
      fontSize: 30
    });
    const labelBoardStyle = new PIXI.TextStyle({
      fill: '#dedede',
      fontFamily: 'Noto Sans SC',
      fontWeight: 'Bold',
      fontSize: 30,
      strokeThickness: 0.5
    });
    const filterChipStyle = new PIXI.TextStyle({
      fill: '#dedede',
      fontFamily: 'Noto Sans SC',
      fontWeight: 'Bold',
      fontSize: 50,
      strokeThickness: 0.5
    });

    const translation = this._model.libary.translation;

    this._config.settings = {
      id: 'Settings',
      type: 'settings',
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
            name: 'back',
            type: core.display.Button,
            enableSceneObj: true,
            landscape: {
              x: 80,
              y: 6,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed: 0.6
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
                pressed: 0.8
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
            name: 'titleMenu',
            type: core.display.SceneObject,
            landscape: {
              x: 960,
              y: 0,
              scaleX: 1,
              scaleY: 1
            },
            portrait: {
              x: 960,
              y: 0,
              scaleX: 1,
              scaleY: 1
            },
            sceneObj: [
              {
                name: 'labelText',
                type: core.display.DisplayText,
                dimensions: { x: -300, y: -45, width: 600, height: 90 },
                debugShape: false,
                scaleDownToFit: true,
                paramText: {
                  style: fieldLabel,
                  text: 'Settings',
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
                  y: 30,
                  scaleX: 1,
                  scaleY: 1,
                  responsivePosition: {
                    position: 'top'
                  }
                },
                portrait: {
                  x: 0,
                  y: 30,
                  scaleX: 1,
                  scaleY: 1,
                  responsivePosition: {
                    position: 'top'
                  }
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
      key: 'settings',
      value: this._config.settings
    };
  }
}
