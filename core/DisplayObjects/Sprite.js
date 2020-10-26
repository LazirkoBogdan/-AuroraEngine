import UpdateComponentUI from '../Components/UpdateComponentUI';

/**
 * Button
 * Class create Button for games
 * @extends Container
 * @exports SceneObject
 */
export default class Sprite extends PIXI.Sprite {
  name = '';
  _config;

  /**
   *@static
   * Get sprite texture from atlas
   */
  static getTexture(tex) {
    return game.getTexture(tex);
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  constructor(config) {
    let texture;
    if (typeof config.texture !== 'object') {
      texture = Sprite.getTexture(config.texture);
    } else {
      texture = config.texture;
    }
    super(texture);
    this.name = config.name;

    this._init(config);
    this.updateConfig(false);
    if (config.cacheAsBitmap) this.cacheAsBitmap = config.cacheAsBitmap;
  }

  /**
   *@public
   * reset Sprite
   */
  reset() {}

  /**
   * @getter
   * get config
   */
  get config() {
    return this._config;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  updateConfig(portrait, scaleRatio = 1, containerOffsets) {
    this.cacheAsBitmap = false;
    UpdateComponentUI.updateConfig.call(
      this,
      portrait,
      scaleRatio,
      containerOffsets
    );
    if (this._config.cacheAsBitmap)
      this.cacheAsBitmap = this._config.cacheAsBitmap;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  setResponsivePosition(config) {
    UpdateComponentUI.setResponsivePosition.call(this, config);
  }

  /**
   *@private
   * @param  {obj} config
   * Mixing UpdateComponentUI
   */
  _init(config) {
    this._config = config;
  }
}
