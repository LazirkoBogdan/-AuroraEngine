import UpdateComponentUI from './UpdateComponentUI';

export default class TextInput extends PIXI.TextInput {
	constructor(config) {
		super(config.style);
		this.name = config.name;
		this._init(config);
		this.updateConfig(false);
		
		core.blockKeyboard = (block) => {

				this.disabled = block;
		};
		
		core.bluerKeyboard = () => {
			this.blur();
		};
	}
	
	addHandlers(config) {
		this.onEnter = config.onEnter;
		this.onExit  = config.onExit;
	}
	
	/**
	 * @private
	 * init config function
	 */
	_init(config) {
		this._config   = config;
		this.isAndroid = /(android)/i.test(navigator.userAgent);
		
	}
	
	_onFocused() {
		super._onFocused();
		if (this.isAndroid) {
			if (this._config.shiftSceneObj) {
				game.mainController.shiftUIElements(this._config.shiftSceneObj);
			}
		}
		this.onEnter();
	}
	
	_onBlurred() {
		super._onBlurred();
		if (this.isAndroid) {
			if (this._config.shiftSceneObj) {
				if(!core.orientationchange) {
					game.application.updateMainContainer();
				}
				
			}
		}
		this.onExit();
	}
	
	set disabled(disabled) {
		this._disabled           = disabled;
		this._dom_input.disabled = disabled;
		
		this._setState(disabled ? 'DISABLED' : 'DEFAULT');
		this._dom_input.style.display = disabled ? 'none' : 'block';
	}
	
	_onAdded() {
		super._onAdded();
	}
	
	_onRemoved() {
		super._onRemoved();
	}
	
	_createDOMInput() {
		if (this._multiline) {
			this._dom_input              = document.createElement('textarea');
			this._dom_input.style.resize = 'none';
			this._dom_input.maxlength = 10
			this._dom_input.maxLength = 10
		} else {
			this._dom_input           = document.createElement('input');
			this._dom_input.type      = 'text'
			this._dom_input.inputMode = 'decimal';
			this._dom_input.maxlength = 10
			this._dom_input.maxLength = 10
			
			
			window.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					this.blur();
				}
			});
		}
		
		for (let key in this._input_style) {
			this._dom_input.style[key] = this._input_style[key];
		}
	}
	
	_setState(state){
		this.state = state
		this._updateBox()
		if(this._substituted)
			this._updateSubstitution()
	}
	
	_onSurrogateFocus() {
		const isMobile = core.isMobile(false);
		
		if (!this._disabled && !game.model.recovery) {
			if (isMobile) {
				this._setDOMInputVisible(true);
				this.focus();
			} else {
				this._setDOMInputVisible(true);
				setTimeout(this._ensureFocus.bind(this), 10);
			}
			
		}
		
	}
	
	_getDOMInputBounds() {
		let remove_after = false;
		
		if (!this._dom_added) {
			document.body.appendChild(this._dom_input);
			remove_after = true;
		}
		
		let org_transform               = this._dom_input.style.transform;
		let org_display                 = this._dom_input.style.display;
		this._dom_input.style.transform = '';
		this._dom_input.style.display   = 'block';
		
		let bounds                      = this._dom_input.getBoundingClientRect();
		this._dom_input.style.transform = org_transform;
		this._dom_input.style.display   = org_display;
		
		if (remove_after) document.body.removeChild(this._dom_input);
		
		return bounds;
	}
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	updateConfig(portrait, scaleRatio, containerOffsets) {
		UpdateComponentUI.updateConfig.call(this, portrait, scaleRatio, containerOffsets);
		
		const orientation = portrait ? 'portrait' : 'landscape';
		if (this._config && this._config.landscape) {
			const config = this._config[orientation];
			if (config.hasOwnProperty('center')) {
				this.x = this.x - this.width / 2;
				this.y = this.y - this.height / 2;
			}
		}
	}
}
