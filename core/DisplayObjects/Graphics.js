/*global PIXI:true*/
import UpdateComponentUI from '../Components/UpdateComponentUI';

export default class Graphics extends PIXI.Graphics {
	name    = '';
	
	handler = null;
	
	scales  = {
		unpressed: 1, pressed: 1.1,
	};
	
	constructor(config) {
		super();
		if (config) {
			this.name = config.name;
			this._init(config);
		}
		this.handler = () => {};
	}
	
	set interactivity(value) {
		this.interactive = value;
		this.buttonMode  = value;
		this.enabled     = value;
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
		UpdateComponentUI.updateConfig.call(this, portrait, scaleRatio, containerOffsets);
		const orientation = portrait ? 'portrait' : 'landscape';
		if (this._config && this._config[orientation]) {
			const config = this._config[orientation];
			this.clear();
			if (config.mask) {
				this.beginFill();
			} else {
				this.beginFill(config.color, config.rectAlpha || 1);
			}
			this.drawRoundedRect(config.rect.x, config.rect.y, config.rect.width, config.rect.height, 20);
			this.endFill();
		}
	}
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	setResponsivePosition(config) {
		UpdateComponentUI.setResponsivePosition.call(this, config);
	}
	
	/**
	 * @public
	 * add Button Listeners
	 */
	addButtonListeners() {
		this.on('pointerdown', this.onButtonPressed);
		this.on('pointerup', this.onButtonUnPressed.bind(this, true));
		this.on('pointerupoutside', this.onButtonUnPressed.bind(this, false));
		this.on('pointercancel', this.onButtonUnPressed.bind(this, false));
		this.on('pointermove', this.onMove);
	}
	
	/**
	 * @public
	 * @param  {event} event
	 * when player move mouse from button
	 */
	onMove(event) {
	}
	
	/**
	 * @public
	 * @param  {boolean} state
	 * press
	 */
	press(state) {
	}
	
	/**
	 * @public
	 * on Button Pressed
	 */
	onButtonPressed() {
		if (this.alpha === 0 || !this.visible) return;
		if (!core.buttonsAvailable || this.handler === undefined) return;
		core.buttonsAvailable = false;
		this._pressed         = true;
		this.scale.set(this.scales.pressed);
		this.press(true);
		
	}
	
	/**
	 * @public
	 * @param  {boolean} callHandler
	 */
	onButtonUnPressed(callHandler) {
		if (!this._pressed) return;
			core.buttonsAvailable = true;
		
		this.scale.set(this.scales.unpressed);
		
		this.press(false);
		
		if (this._pressed && callHandler && this.handler) {
			if (this.handlerArg != null) {
				this.handler(this.handlerArg);
			} else {
				this.handler();
			}
		}
		
		this._pressed = false;
	}
	
	_init(config) {
		this._config = config;
	}
}
