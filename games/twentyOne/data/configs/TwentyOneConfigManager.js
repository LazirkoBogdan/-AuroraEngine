import atlasesConfig from "./atlases/atlasesConfig.js";
import preloader     from "./components/preloader.js";
import ui            from "./components/ui.js";
import uibotton      from "./components/uibotton.js";
import popup         from "./components/popup.js";
import twentyOne     from "./components/twentyOne.js";
import background    from "./components/background.js";
import backgroundTop from "./components/backgroundTop.js";
import history       from "./components/history.js";
import rules         from "./components/rules.js";
import settings      from "./components/settings.js";
import loading       from "./components/loading.js";

export default class TwentyOneConfigManager extends core.manager.ConfigManager {
  constructor(model, textures) {
    super(model, textures);
    this._configs.loader = {};
    this._configs.atlas  = {};
    this._list           = [
      background,
      backgroundTop,
      uibotton,
      ui,
      twentyOne,
      history,
      rules,
      settings,
      popup,
      loading,
      preloader,
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
    const atlas         = new atlasesConfig(this._model, this._textures);
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
