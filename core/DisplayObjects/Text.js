import UpdateComponentUI from '../Components/UpdateComponentUI';

/**
 * Text
 * Class create Text for games
 * @extends PIXI.Text
 * @exports Text
 */
export default class Text extends PIXI.Text {
	_config;
	
	constructor(config) {
		super(config.text, config.style);
		this.name = config.name;

		this.disableUpdateConfig = config.disable ? config.disable : false;
		this._init(config);
	}
	
	/**
	 *@private
	 * init config
	 * @param  {obj} config
	 */
	_init(config) {
		this._config = config;
		
		// if(window.devicePixelRatio=== 2){
		// 	this.resolution = 1
		// }else{
		// 	this.resolution = window.devicePixelRatio;
		// }

		// this.dirty = true;
		// this.updateText(true)
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
	 * Get Spine Data from atlas
	 */
	updateConfig(portrait, scaleRatio = 1, containerOffsets) {
		if (this.disableUpdateConfig) return;
		UpdateComponentUI.updateConfig.call(this, portrait, scaleRatio, containerOffsets);
		const orientation = portrait ? 'portrait' : 'landscape';
		if (this._config && this._config.landscape) {
			const config = this._config[orientation];
			if (config.updateText) {
				this.text = config.text;
			}
			if (config.updateStyle) {
				this.style = config.style;
			}
			

			
		}
	}
	
	/**
	 * Get the bounds of the text
	 * @private
	 */
	getBounds(matrix) {
		if (this.dirty) {
			this.updateText();
			this.dirty = false;
		}
	};
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	setResponsivePosition(config) {
		UpdateComponentUI.setResponsivePosition.call(this, config);
	}
	
	_render(renderer) {
		if (this._autoResolution && this._resolution !== renderer.resolution) {
			this._resolution = renderer.resolution;
			this.dirty       = false;
		}
		this.updateText(true);
		super._render(renderer);
	}
}
