import UpdateComponentUI from '../Components/UpdateComponentUI';

/**
 * Button
 * Class create Button for games
 * @extends Container
 * @exports SceneObject
 */
export default class TilingSprite extends PIXI.TilingSprite {
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
    super(texture, config.width, config.height);
    this.name = config.name;

    this._init(config);
    this.updateConfig(false);
  }

  /**
   * @getter
   * get config
   */
  get config() {
    return this._config;
  }

  /**
   *@public
   * reset Sprite
   */
  reset() {}

  /**
   *@public
   * Get Spine Data from atlas
   */
  updateConfig(portrait, scaleRatio = 1, containerOffsets) {
    // this.cacheAsBitmap = false;
    UpdateComponentUI.updateConfig.call(
      this,
      portrait,
      scaleRatio,
      containerOffsets
    );
    this.cacheAsBitmap = false;
    core.call(() => {
      this.cacheAsBitmap = true;
    }, 1000);
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
