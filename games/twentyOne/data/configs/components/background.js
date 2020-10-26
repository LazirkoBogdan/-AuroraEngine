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
            cacheAsBitmap: false,
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
          }
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
