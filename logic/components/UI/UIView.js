export default class UIView extends game.component.View {
	show() {
		super.show();
	}
	
	init({getters, handlers}) {
		const config   = this.config;
		const sceneObj = this.sceneObj;
		sceneObj.forEach((obj, i) => {
			if (obj.name === config.sceneObj[i].name) {
				const element = config.sceneObj[i];
				
				if (element.handler) {
					obj.handler = handlers[element.handler].bind(obj, obj.name);
				}
				if (element.getter) {
					obj.getter      = getters[element.getter];
					obj.getterValue = getters[element.getter]();
					obj.update();
				}
			}
		});
	}
	
	updateInputText() {
	
	}
	
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
		const orientation = this.orientation;
	}
	
	reset() {
		super.reset();
	}
	
	updateUI() {
		const sceneObj = this.sceneObj;
		sceneObj.forEach(obj => {
			if (obj.getter) obj.update();
		});
		this.updateInputText();
	}
	
	
	addHandlers(config) {
		const menu    = this._getChildByName(config.name);
		menu.handlers = config.handlers;
		menu.alpha    = 0;
	}

	
	getSpine(name) {
		if (game.assetsStore.spine[name]) return game.assetsStore.spine[name];
	}
	
	
	clearBet() {
	
	}
	
	
	tweenAlphaObj(obj, on, duration) {
		const tween = core.tween.TweenMax.to(obj, duration, {alpha: on ? 1 : 0});
		tween.eventCallback('onComplete', () => {
			obj.visible = on ? 1 : 0;
			tween.kill();
		});
	}
	
	async tweenMove(obj, param, duration) {
		const moveChipTween = core.tween.TweenMax.to(obj, duration, {
			x: param.x,
			y: param.y,
			ease: core.tween.Expo.easeInOut,
		});
		
		moveChipTween.eventCallback('onComplete', () => {
			core.call(() => {
				moveChipTween.kill();
			}, 50);
		});
	}
	
	async tweenScale(obj, param, duration, easeIn, cb) {
		const tweenScale = core.tween.TweenMax.to(obj.scale, duration, {
			x: param.x,
			y: param.y,
			ease: easeIn
					? core.tween.Expo.easeIn
					: core.tween.Bounce.easeOut,
		});
		
		tweenScale.eventCallback('onComplete', () => {
			core.call(() => {
				tweenScale.kill();
				if (cb) cb();
			}, 50);
		});
	}
	
	shiftUIElements(config) {
		if(config){
			const mode = this.orientation?  'portrait' : 'landscape'
			const gameHeight = 	game.application.renderer.screen.height /2
			if(config.sceneObj){
				config.sceneObj.forEach((obj)=>{
					const sceneObj =  this._getChildByName(obj.name)
					if(sceneObj){
						if(obj.shift){
							if(obj.shift[mode].x) sceneObj.x += obj.shift[mode].x
							if(obj.shift[mode].y)sceneObj.y += (obj.shift[mode].y) - gameHeight
							if(obj.shift[mode].scale)sceneObj.scale.set(obj.shift[mode].scale)
							if(obj.shift[mode].alpha)sceneObj.alpha = obj.shift[mode].alpha;
						}
					}
				})
			}
			
		}
	}
	

	
	updateStateUI({state}) {
		const sceneObj = this.sceneObj;
		sceneObj.forEach(elem => {
			if (elem.updateState) elem.updateState(state);
		});
	}
}
