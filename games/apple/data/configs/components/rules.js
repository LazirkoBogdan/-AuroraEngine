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
      key: 'rules',
      value: this._config.rules
    };
  }
}
