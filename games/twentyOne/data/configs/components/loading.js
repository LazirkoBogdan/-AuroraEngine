export default class Loading extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for BG
   */
  createConfig() {
    this._config.loading = {
      id: 'Loading',
      type: 'loading',
      config: {
        visible: true,
        needMask: false,
        parentGroup: 'DEFAULT',
        testText: {
          on: true,
          text: 'Loading'
        },

        sceneObj: [
          {
            name: 'chipLoader',
            type: core.display.Spine,
            animations: {
              show: {
                name: 'show',
                loop: true
              }
            },
            landscape: {
              x: 0,
              y: -150,
              scaleX: 1,
              scaleY: 1,
              alpha: 0,
              responsivePosition: {
                position: 'center'
              }
            },
            portrait: {
              x: 0,
              y: -300,
              scaleX: 1,
              scaleY: 1,
              alpha: 0,
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
      key: 'loading',
      value: this._config.loading
    };
  }
}
