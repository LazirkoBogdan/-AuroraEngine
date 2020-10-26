import UpdateComponentUI from '../Components/UpdateComponentUI';

/**
 * Display Viewport
 * A DisplayObjectContainer which attempts to scale and best-fit into the
 * window size dispatched from the RendererStore
 *
 * @extends Viewport
 * @exports DisplayViewport
 */
export default class DisplayViewport extends Viewport {
  constructor(options) {
    super(options);
    if (options) {
      this._init(options);
      this.setConfig(options);
    }
  }

  setConfig(config) {
    if (config.name) this.name = config.name;
    if (config.x) this.x = config.x || 0;
    if (config.y) this.y = config.y || 0;
    if (config.anchor) this.anchor.set(config.anchor);
    if (config.scaleY) this.scale.y = config.scaleY || 1;
    if (config.scaleX) this.scale.x = config.scaleX || 1;
    if (config.scales) this.scales = config.scales;
    if (typeof config.alpha == 'number') this.alpha = config.alpha;
    if (config.blendMode) {
      this.blendMode = PIXI.BLEND_MODES[config.blendMode];
    }
    if (config.rotation)
      this.rotation = config.rotation ? config.rotation * (Math.PI / 180) : 0;
  }

  /**
   * @getter
   * get config
   */
  get config() {
    return this._config;
  }

  updateConfig(screenRatio, scaleRatio = 1,) {
	  UpdateComponentUI.updateConfig.call(this, this.orientation, scaleRatio);
	  
    const children = this.children;
    const orientation = this.orientation;
    children.forEach(child => {
      child.updateConfig(orientation, screenRatio);
    });
  }
  get orientation() {
    const query = window.matchMedia('(orientation:landscape)');
    return !query.matches;
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
