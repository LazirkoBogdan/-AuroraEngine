import Core from '../index';

/**
 * ResizeContainer
 * A DisplayObjectContainer which attempts to scale and best-fit into the
 * window size dispatched from the RendererStore
 *
 * @extends Container
 * @exports ResizeContainer
 */
export default class Container extends PIXI.Container {
	constructor(config) {
		super(config);
		if (config) {
			this._init(config);
			this.setConfig(config);
		}
	}
	
	setConfig(config) {
		if (config.name) this.name = config.name;
		if (config.x) this.x = config.x
		if (config.y) this.y = config.y
		if (config.anchor) this.anchor.set(config.anchor);
		if (config.scaleY) this.scale.y = config.scaleY
		if (config.scaleX) this.scale.x = config.scaleX
		if (config.scales) this.scales = config.scales;
		if (typeof config.alpha == 'number') this.alpha = config.alpha;
		if (config.blendMode) {
			this.blendMode = PIXI.BLEND_MODES[config.blendMode];
		}
		if (config.rotation) this.rotation = config.rotation ? config.rotation * (Math.PI / 180) : 0;
		
	}
	
	/**
	 * @getter
	 * get config
	 */
	get config() {
		return this._config;
	}
	
	updateConfig(screenRatio) {
		const children    = this.children;
		const orientation = this.orientation;
		const mode = orientation ? 'portrait' : 'landscape';
		  if (this._config && this._config.landscape) {
			  const config = this._config[mode];
			  if (config.hasOwnProperty('alpha')) this.alpha = config.alpha
		}
		
		
	
		
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
