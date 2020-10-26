import atlasesConfig from "./atlases/atlasesConfig.js";
import preloader     from "./components/preloader.js";
import ui            from "./components/ui.js";
import testGame     from "./components/testGame.js";
import background    from "./components/background.js";


export default class TestConfigManager extends core.manager.ConfigManager {
  constructor(model, textures) {
    super(model, textures);
    this._configs.loader = {};
    this._configs.atlas  = {};
    this._list           = [
	    background,
		   preloader,
		    ui,
		    testGame
    ];
  }

  /**
   * @public
   * @return preloader config
   */
  getPreloaderConfig() {
    const config                        = new preloader(this._model, this._textures);
    const parameter                     = config.getConfig();
    this._configs.loader[parameter.key] = parameter.value;
    return this._configs.loader;
  }

  /**
   * @public
   * @return atlas config
   */
  getAtlasConfig() {
    const atlas         = new atlasesConfig(this._model, this._textures);
    this._configs.atlas = atlas.getAtlasConfig();
    return this._configs.atlas;

  }

  getResources() {
    const atlas             = new atlasesConfig(this._model, this._textures);
    this._configs.resources = atlas.getResources();
    return this._configs.resources;

  }

  /**
   * @public
   * create configs for componets
   */
  buildConfigs() {
    this._list.forEach(config => {
      const element              = new config(this._model, this._textures);
      const elParam              = element.config;
      this._configs[elParam.key] = elParam.value;
      this._components.push(elParam.key);
    });

    this._configs["componentsType"] = this.componentsType;
  }

  getConfigs() {
    const configs = {
      components: {},
    };
    this._list.forEach(config => {
      const element                   = new config(this._model, this._textures);
      const elParam                   = element.config;
      configs.components[elParam.key] = elParam.value;
    });
    return configs;
  }

  /**
   * @getter
   * @return all configs
   */
  get configs() {
    return this._configs;
  }

  /**
   * @getter
   * @return all componets type
   */
  get componentsType() {
    return this._components;
  }
}
