export default class PreloaderView extends game.component.View {
	
	onInitialize() {
		super.onInitialize();
		
		this.preloaderAnimate  = false;
		this.preloader         = this._getChildByName('preloader');
		this.preloader.visible = false;
		this.visible           = false;
		this.updateConfig(1);
		
	}
	
	show() {
		this.visible = true;
	}
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
	}
	
	showPreloader(config, cb) {
		this.alpha                = 0;
		this.visible              = true;
		this.preloaderAnimate     = true;
		this.preloader.visible    = true;
		this.preloaderSpine       = this.preloader.getChildByName('preloader');
		if( this.preloaderSpine !== null){
			this.preloaderSpineConfig = this.preloaderSpine.config;
			this.tweenAlpha(this, true, 0.2);
			this.preloaderSpine.play(this.preloaderSpineConfig.spineAnimations.show.name, false, () => {
				this.preloaderAnimate = false;
				this.preloaderSpine.play(this.preloaderSpineConfig.spineAnimations.loop.name, true);
			});
		}
		
		this.preloaderBar       = this._getChildByName('progressBar');
	
		//this.preloader         = this._getChildByName('preloader');
		if(this.preloaderBar !== null){
			const parameter = {
				progress:0
			}
			this.barTweenElemnt       = this.preloaderBar.getChildByName('barTop');
			this._maskContent              = this.addChild(new PIXI.Graphics());
			this._maskContent.x = 510
			this._maskContent.y = 450
			this._maskContent.updateConfig = () => {};
			this._drawMask()
			this.barTweenElemnt.mask = this._maskContent;
		
			const tween = core.tween.TweenMax.to(parameter, 1, {progress: 100,
				onUpdate: () => {
					this.updateMask(parameter.progress)
				}
			});
			tween.eventCallback('onComplete', () => {
				this.preloaderAnimate = false
				
				tween.kill();
			});

			
			
		}


	}
	
	_drawMask() {
		this._maskContent.beginFill(0).drawRect(this.barTweenElemnt.x, this.barTweenElemnt.y, this.barTweenElemnt.width, this.barTweenElemnt.height).endFill();

	}
	
	updateMask(progress){
		const newBarWidth  = this.barTweenElemnt.width * progress / 100
		this._maskContent.clear();
		this._maskContent.beginFill(0).drawRect(this.barTweenElemnt.x, this.barTweenElemnt.y, newBarWidth, this.barTweenElemnt.height).endFill();
	}
	
	hidePreloader(config, cb) {
		this.alpha = 1;
		this.moveToTop();
		if (this.preloaderAnimate) {
			core.call(() => {
				this.hidePreloader(config, cb);
			}, 10);
		} else {
			this.preloader = this._getChildByName('preloader');
			this.tweenAlpha(this, false, 0.2);
			core.call(() => {
				if(this.preloaderSpine!==null) {
					this.preloaderSpine.reset();
					const children = this.preloader.children;
					if (children) {
						children.forEach(child => {
							child.reset();
						});
					}
				}
	
				if (cb) cb();
			}, 300);
		}
	}
	
	tweenAlpha(obj, on, duration, delay = 0) {
		const tween = core.tween.TweenMax.to(obj, duration, {alpha: on ? 1 : 0});
		tween.delay(delay);
		tween.eventCallback('onComplete', () => {
			this.visible = on;
			tween.kill();
		});
	}
	
	moveToTop() {
		if (this.parent) {
			let parent = this.parent;
			parent.removeChild(this);
			parent.addChild(this);
		}
	}
}
