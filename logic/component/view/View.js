/*global core:true*/
/*global PIXI:true*/
/*global game:true*/
/*eslint no-undef: 2*/

export default class ComponentView extends core.display.ResizeContainer {
	parentGame = null;
	
	sceneObj = [];
	
	spineObj = [];
	
	_config;
	
	_assets;
	
	onInitialize() {
		if (this._config.name) {
			this.name = this._config.name;
		}
		
		if (this._config.sceneObj) {
			const sceneObj = this._config.sceneObj;
			sceneObj.forEach(obj => {
				this._createSceneObj(obj);
			});
		}
		
		setTimeout(()=>{
			if (this._config.sceneObj) {
				const sceneObj = this._config.sceneObj;
				sceneObj.forEach(obj => {
					this._addToSpine(obj);
				});
			}
		},1000)
		

		
	}
	
	reset() {
	}
	
	destroy() {
	}
	
	show(config, cb) {
		this.visible = true;
	}
	
	hide(config, cb) {
		this.visible = false;
	}
	
	create(config) {
		this.visible = false;
		this._config = config;
	}
	
	propagation(visible) {
		this.container.visible = visible;
	}
	
	initialize(assets) {
		this.visible = this.config.visible;
		this._assets = assets;
		
		if (this._config.needMask) this._addMask();
		if (this._config.testText.on)
			this._createTestText();
		this.onInitialize();
	}
	
	_createTestText() {
		const style = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'Helvetica',
			fontSize: 50,
			strokeThickness: 2,
		});
		
		this.config.testText.style = style;
		const text                 = new core.display.Text(this.config.testText);
		text.x                     = 100;
		text.y                     = 100;
		
		this.addChild(text);
	}
	
	_addMask() {
		const graphics = new core.display.Graphics();
		graphics.beginFill(0x000000);
		graphics.drawRect(0, 0, 1920, 1080);
		graphics.endFill();
		
		this.mask = graphics;
		this.addChild(graphics);
	}
	
	_createSceneObj(config) {
		if (config.texture) config.texture = game.getTexture(config.texture);
		const sceneObj = new config.type(config);
		if (config.includeParameters) {
			this.spineObj.push(sceneObj);
		} else {
			this.addChild(sceneObj);
		}
		
		this.sceneObj.push(sceneObj);
	}
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
		const orientation = this.orientation ? 'portrait' : 'landscape';
		this.spineObj.forEach((obj)=>{
			obj.updateConfig(this.orientation)
		})
	}
	
	_addToSpine(config) {
		if (config.includeParameters) {
			const mainSpine       = this.getObjChildByName(config.includeParameters.mainSpineContainer,
					config.includeParameters.mainSpine);
			let node              = null;
			let includeParameters = config.includeParameters;
			
			if (includeParameters.addContainer) {
				node = this._getChildByName(config.name);
			} else if (config.includeParameters.addPart) {
					node = this.getObjChildByName(config.name, config.sceneObj);
				}
			const attachContainer = mainSpine.attach(includeParameters.slotName, node,includeParameters.removeTexture,includeParameters.slotsChange  );
			
			if (includeParameters.swapParts) {
				const swapParameters               = includeParameters.swapParameters;
				const swapSpine                    = this.getObjChildByName(swapParameters.mainSwapContainerSpine,
						swapParameters.mainSwapSpine);
				swapParameters.part                = part;
				swapParameters.attachContainer     = attachContainer;
				swapParameters.swapAttachContainer = null;
				
				const slotSwapName = swapSpine.getSpineChildByName(swapParameters.slotSwapName);
				if (slotSwapName && slotSwapName.children.length) {
					const firstSwapAttachContainer     = slotSwapName.children.first;
					swapParameters.swapAttachContainer = firstSwapAttachContainer;
				}
				
				mainSpine.addSwapChild(swapParameters);
			}
		}
	}
	
	_getChildByName(name) {
		let child = null;
		this.sceneObj.forEach(obj => {
			if (obj.name === name) {
				child = obj;
			}
		});
		return child;
	}
	
	getObjChildByName(sceneObj, sceneObjChild) {
		let child = null;
		this.sceneObj.forEach(obj => {
			if (obj.name === sceneObj) {
				obj.sceneObj.forEach((objChild) => {
					if (objChild.name === sceneObjChild) {
						child = objChild;
					}
				});
			}
		});
		return child;
	}
}
