/**
 * An animation which can play
 * @class {Config}
 * @param {Object} model
 * @param {Object} textures
 */
export default class Config {
  /**
   * Config Game component
   * @type {Object}
   * @private
   */
  _config;
  /**
   * Texture manager
   * @type {Object}
   * @private
   */
  _textures;
  /**
   * Game Model
   * @type {Object}
   * @private
   */
  _model;
  constructor(model, textures) {
    this._model = model;
    this._textures = textures;
    this._config = {};
  }

  /**
   * @public
   * create Config
   */
  createConfig() {}
}
