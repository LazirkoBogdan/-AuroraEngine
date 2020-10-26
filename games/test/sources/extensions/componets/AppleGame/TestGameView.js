export default class TestGameView extends game.component.View {
	floor = [];
	
	speed = 10;
	
	speedBox = 3;
	
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
		this.floor = [];
		this.show();
		core.buttonsAvailable = true
	}
	
	show(config, cb) {
		
		super.show(config, cb);
		this.rotation = 2 * (Math.PI / 180);
		this.createField();
		this.createBox();
		this.createPersJump();
		
		core.call(() => {
			game.application.ticker.add(() => {
				this.moveFloor();
			});
		}, 2000);
		this.test()
	}
	
	test(){
	
	}
	
	createBox() {
		const configBox = {
			texture: 'stopper_idle',
		};
		
		this.box        = new core.display.Sprite(configBox);
		this.box.x      = 2000;
		this.box.y      = core.getOrientation() ? 1150 : 850;
		
		this.addChild(this.box);
	}
	
	createField() {
		const configField = {
			texture: 'floor',
		};
		this.floor        = [];
		
		for (let i = 0; i < 5; i++) {
			const field = new core.display.Sprite(configField);
			field.x     = 500 * i;
			field.y = core.getOrientation() ? 1300 : 1000;
			this.addChild(field);
			this.floor.push(field);
		}
		
	}
	
	moveFloor() {
		this.floor.forEach((element) => {
			element.x = element.x - this.speed;
			if (element.x === -1000) {
				element.x = 2000;
			}
			
			this.box.x = this.box.x - this.speedBox;
			if (this.box.x === -1000) {
				this.box.x = 2000;
			}
			
		});
	}
	
	createPersJump() {
		this.pers               = this._getChildByName('bunny');
		this.persSprite         = this.pers.getChildByName('pers');
		this.persText           = this.pers.getChildByName('text');
		this.pers.interactivity = true;

		
		window.addEventListener('keydown', (event) => {
			if (event.code === 'Space') {
				if (!core.buttonsAvailable) return;
				this.pers.jump();
			}
		});
		
		this.pers.jump    = () => {
			this.persText.visible = false;
			
			core.buttonsAvailable = false;
			
			this.persSprite.texture = game.getTexture('persJump');
			const tweenUP           = core.tween.TweenMax.to(this.pers, 0.7, {y: core.getOrientation() ? 0 : -300});
			
			tweenUP.eventCallback('onComplete', () => {
				tweenUP.kill();
				
				const tweenDown = core.tween.TweenMax.to(this.pers, 0.5, {y: core.getOrientation() ? 300 : 0});
				tweenDown.eventCallback('onComplete', () => {
					core.buttonsAvailable   = true;
					this.persSprite.texture = game.getTexture('persIdle');
					this.persText.visible   = true;
					tweenDown.kill();
				});
				
			});
		};
		this.pers.handler = () => {
			
			this.pers.jump();
			
			console.log('CLICK');
		};
		
	}
	
	hide(config, cb) {
	
	}
}
