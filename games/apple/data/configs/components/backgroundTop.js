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
