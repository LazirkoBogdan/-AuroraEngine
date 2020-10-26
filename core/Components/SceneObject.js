/**
 * Button
 * Class create Button for games
 * @extends Container
 * @exports SceneObject
 */

import UpdateComponentUI from './UpdateComponentUI';
import Graphics from '../DisplayObjects/Graphics';
import Core from '../index';

export default class SceneObject extends PIXI.Container {
	name;
	
	sceneObj = [];
	
	scales = {
		unpressed: 1,
		pressed: 1.1,
	};
	
	bone = null;
	
	handlerArg = null;
	
	getterValue = 0;
	
	_handler;
	
	_config;
	
	_lastState;
	
	isPositionChange = false;
	
	_blockGetters = false;
	
	constructor(config) {
		super(config);
		this.name             = config.name;
		this.isPositionChange = false;
		
		this._init(config);
		this.updateConfig(false);
		this.addButtonListeners();
		
		if (config.enableSceneObj) this.enable(config.enableSceneObj);
		if (config.debug) this._debugGUI(config.debug.property);
	}
	
	/**
	 * @public
	 * reset scene object
	 */
	reset() {
	}
	
	/**
	 * set function
	 * @param  {obj} handler
	 */
	set handler(handler) {
		if (typeof handler !== 'function') console.error('Handler must be a function!');
		this._handler = handler;
	}
	
	/**
	 * @handler
	 */
	get handler() {
		return this._handler;
	}
	
	/**
	 * get config
	 */
	get config() {
		return this._config;
	}
	
	/**
	 * @param  {boolean} value
	 * change interactivity in scene object
	 */
	set interactivity(value) {
		this.interactive = value;
		this.buttonMode  = value;
		this.enabled     = value;
	}
	
	/**
	 * getter orientation
	 */
	get orientation() {
		const query = window.matchMedia('(orientation:landscape)');
		return !query.matches;
	}
	
	/**
	 * @public
	 * @param  {Object} config
	 * Change position in config
	 */
	changePosition(config) {
		if (this.isPositionChange) {
			if (config.changePosX) {
				this.x = this.x + config.changePosX;
			}
			if (config.changePosY) {
				this.y = this.y + config.changePosY;
			}
			
			if (config.changeAlpha) {
				this.alpha = config.changeAlpha;
			}
		}
	}
	
	/**
	 * @public
	 * @param  {boolean} state
	 * change interactivity in scene object
	 */
	enable(state) {
		this.interactivity = state;
	}
	
	/**
	 * @public
	 * update function
	 */
	update() {
	}
	
	/**
	 * @public
	 * @param  {string} name
	 * get Child By Name
	 */
	getChildByName(name) {
		let child = null;
		this.sceneObj.forEach(obj => {
			if (obj.name === name) {
				child = obj;
			}
		});
		return child;
	}
	
	/**
	 * @public
	 * @param  {string} state
	 * update State
	 */
	updateState(state) {
		const config = this._config;
		if(!core.needUpdateState)return
		if (config.states && config.states[state]) {
			
			this._lastState = state;
			
			const paramState = config.states[state];
			
			if (paramState.hasOwnProperty('enable')) this.enable(paramState.enable);
			
			if (paramState.hasOwnProperty('status')) this.status = paramState.status;
			
			if (paramState.hasOwnProperty('visible')) this.visible = paramState.visible;
			
			if (paramState.texture) {
				const buttonSprite   = this.getChildByName('sprite');
				buttonSprite.texture = this._getTexture(paramState.texture);
			}
			
			if (paramState.hasOwnProperty('getterUpdate')) {
				
				this._blockGetters = paramState.getterUpdate;
				
				if (config.hasOwnProperty('getterDelay')) {
					core.call(() => this.update(), config.getterDelay);
					
				} else {
					
					this.update();
				}
			}
			
			if (paramState.text) {
				const buttonText = this.getChildByName('text');
				buttonText.text  = paramState.text;
				
				if (paramState.textStyle) buttonText.style = paramState.textStyle;
			}
		}
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
		console.log(this.name)
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
	
	/**
	 * @private
	 * init config function
	 */
	_init(config) {
		this._config = config;
		this._onInitialize();
	}
	
	/**
	 * @private
	 * on Initialize create sceneObj
	 */
	_onInitialize() {
		if (this._config.sceneObj) {
			const sceneObj = this._config.sceneObj;
			sceneObj.forEach(obj => {
				this._createSceneObj(obj);
			});
		}
	}
	
	/**
	 * @private
	 * create Scene Obj
	 */
	_createSceneObj(config) {
		const sceneObj = new config.type(config);
		this.addChild(sceneObj);
		this.sceneObj.push(sceneObj);
	}
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	updateConfig(portrait, scaleRatio = 1, containerOffsets) {
		UpdateComponentUI.updateConfig.call(this, portrait, scaleRatio, containerOffsets);
		
		this.sceneObj.forEach(obj => {
			obj.updateConfig(portrait, scaleRatio, containerOffsets);
		});
		
		const orientation = portrait ? 'portrait' : 'landscape';
		if (this._config && this._config.landscape) {
			const config = this._config[orientation];
			this.changePosition(config);

		}
		
		if (this._lastState) this.updateState(this._lastState);
		
	}
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	setResponsivePosition(config) {
		UpdateComponentUI.setResponsivePosition.call(this, config);
	}
	
	/**
	 * @private
	 * Get sprite texture from atlas
	 */
	_getTexture(tex) {
		return game.getTexture(tex);
	}
	
	/**
	 * @private
	 * add element to GUI parameters
	 * @param  {object} property
	 */
	_debugGUI(property) {
		const folderName = this.name ? this.name : 'sceneObj';
		const mainFolder = gUI.addFolder(folderName);
		const config     = this._config;
		property.forEach(key => {
			for (const prop in config) {
				if (config.hasOwnProperty(prop)) {
					if (prop === key) {
						const subFolder = mainFolder.addFolder(prop);
						if (config[prop]) for (const child in config[prop]) {
							if (child === 'scales' || child === 'responsivePosition') {
								const subsubFolder = subFolder.addFolder(child);
								for (const p in config[key][child]) {
									subsubFolder.add(config[key][child], p).onChange(() => {
										this.updateConfig(this.orientation);
									});
								}
							} else {
								subFolder.add(config[prop], child, -2000, 2000).onChange(() => {
									this.updateConfig(this.orientation);
								});
							}
						}
					}
				}
			}
		});
	}
}
