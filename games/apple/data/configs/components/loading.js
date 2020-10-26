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
