/**
 * Manager configs keep all config on one place
 * @class {ConfigManager}
 * @param {Object} model
 * @param {Object} textures
 */
export default class ConfigManager {
  /**
   * Game Model
   * @type {Object}
   * @private
   */
  _model;

  /**
   *  Texture manger
   * @type {Object}
   * @private
   */
  _textures;
  /**
   * Keep all Configs
   * @type {Object}
   * @private
   */
  _configs;
  /**
   * Keep all componets
   * @type {Object}
   * @private
   */
  _components;
  constructor(model, textures) {
    this._model = model;
    this._textures = textures;
    this._configs = {};
    this._components = [];
  }

  /**
   * @public
   * create Configs
   */
  createConfigs() {}
}
