import Core from '../../../../../../core';

export default class AppleUIView extends game.components.UI.src.View {
	constructor() {
		super();
		this.modelBalance = game.model.allBalance.payload;

		

		
	}
	
	init({getters, handlers}) {
		super.init({getters, handlers});
		
		
		this.currencyPanel         = this._getChildByName('currencyPanelContainer');
		this.currencyFlag          = this._getChildByName('userBalance');
		this.snowWhiteContainer    = this._getChildByName('snowWhiteContainer');
		this.logoContainer         = this._getChildByName('logoContainer');
		this.coinsHorizontal       = this._getChildByName('coinsHorizontal');
		this.coins                 = this._getChildByName('coins');
		this.branchesAll           = this._getChildByName('branchesAll');
		this.branchesAllHorizontal = this._getChildByName('branchesAllHorizontal');
		this.buttonHome            = this._getChildByName('buttonHome');
		this.buttonRule            = this._getChildByName('buttonRule');
		
		this.buttonRule.alpha = 0;
		
		//this.changeButtonRuleLine();
		
		this.animationParameters = this._config.animationParameters;
		this.animationsState = 'disable'
		
		this.initParameter()
	}
	
	initParameter(){
		this._currencyPanelSpeed  = 1;
		this._snowWhiteSpeed       = 1;
		this._logoSpeed            = 1;
		this._coinsHorizontalSpeed = 1;
		this._coinsSpeed           = 1;
		this._branchesSpeed        = 1;
		this._branchesAllSpeed     = 1;
		this._ruleSpeed            = 1;
		this._flagSpeed            = 1;
		
		
		let folder1 = gUI.addFolder('UI Anim');
		
		let parameter = {
			currencyPanel: 1,
			snowWhiteSpeed: 1,
			logoSpeed: 1,
			coinsHorizontalSpeed: 1,
			coinsSpeed: 1,
			branchesSpeed: 1,
			branchesAllSpeed: 1,
			ruleSpeed: 1,
			flagSpeed:1
		};
		
		
		folder1.add(parameter, 'currencyPanel', 0, 100).onChange((param) => {

			this._currencyPanelSpeed  = param;
			let spine = this.currencyPanel.getChildByName('currencyPanel')
			setInterval(()=>{
				spine.speed = this._currencyPanelSpeed
			},100)
	
		});
		
		folder1.add(parameter, 'snowWhiteSpeed', 0, 100).onChange((param) => {
			this._snowWhiteSpeed  = param;
			let spine = this.snowWhiteContainer.getChildByName('snowWhite')
			setInterval(()=>{
			spine.speed = this._snowWhiteSpeed
			},100)
		});
		
		folder1.add(parameter, 'logoSpeed', 0, 100).onChange((param) => {
			this._logoSpeed  = param;
			let spine = this.logoContainer.getChildByName('horisontalLogo')
			setInterval(()=>{
			spine.speed = this._logoSpeed
			},100)
		});
		folder1.add(parameter, 'coinsHorizontalSpeed', 0, 100).onChange((param) => {
			this._coinsHorizontalSpeed  = param;
			
			setInterval(()=>{
			 this.coinsHorizontal.speed =   		this._coinsHorizontalSpeed
			},100)
		});
		folder1.add(parameter, 'coinsSpeed', 0, 100).onChange((param) => {
			this._coinsSpeed  = param;
			setInterval(()=>{
			this.coins.speed = this._coinsSpeed
			},100)
		});
		folder1.add(parameter, 'branchesSpeed', 0, 100).onChange((param) => {
			this._branchesSpeed  = param;
			setInterval(()=>{
			this.branchesAll.speed = 	this._branchesSpeed;
			this.branchesAllHorizontal.speed = 	this._branchesSpeed;
			},100)
			
		});
		
		folder1.add(parameter, 'flagSpeed', 0, 100).onChange((param) => {
			this._flagSpeed  = param;
			let spine = this.getObjChildByName('userBalance', 'flag_currency');
			setInterval(()=>{
			spine.speed = this._flagSpeed
			},100)
		});
		
		folder1.add(parameter, 'ruleSpeed', 0, 100).onChange((param) => {
			this._ruleSpeed  = param;
			setInterval(()=>{
			this.animationParameters.buttonAnimationSpeed = this._ruleSpeed;
			},100)
		});
	}
	
	updateConfig(screenRatio) {
			super.updateConfig(screenRatio);
		//	this.changeButtonRuleLine();
	}
	
	changeButtonRuleLine() {
		if (this.buttonRule) {
			const buttonRuleText                         = this.buttonRule.getChildByName('text');
			const buttonRuleLine                         = this.buttonRule.getChildByName('selector');
			const buttonRuleWidth                        = buttonRuleText.width;
			const buttonRuleLineConfig                   = buttonRuleLine.config;
			const orientation                            = core.getOrientation() ? 'portrait' : 'landscape';
			buttonRuleLineConfig[orientation].rect.x     = -(buttonRuleWidth / 2);
			buttonRuleLineConfig[orientation].rect.width = buttonRuleWidth;
			buttonRuleLine.updateConfig(core.getOrientation());
		}
	}
	
	initSlider(config) {
		this.currencyFlag = this._getChildByName('userBalance');
		
		this.currencySpineFlag = this.getObjChildByName('userBalance', 'flag_currency');
		this.currencySelector  = this.getObjChildByName('userBalance', 'selector');
		
		this.currencyFlag.balances = this.modelBalance;
		
		this.currencyFlag.createSliderElement();
		this.currencyFlag.setFunctionAfterSlide(config.onChangeCurrency);
		
		this.currencyFlag.setRightButton(this.currencySpineFlag.buttons.rightButton);
		this.currencyFlag.setLeftButton(this.currencySpineFlag.buttons.leftButton);
		
		this.currencySelector.addButtonListeners();
		this.currencySelector.interactivity = true;
		
		this.currencySelector.handler       = () => {
			this.interactivitySlider();
		};
	}
	
	interactivitySlider() {
		if (this.currencyFlag.isSliderOpen && !this.currencyFlag.disableSlider) {
			this.currencySelector.interactivity = false;

      game.mainController._changeState("initialGame");

			this.currencyFlag.hideSliderPanel(() => {
				this.currencySelector.config.landscape.rect = this.currencySelector.config.oldRect;
				this.currencySelector.updateConfig(false);
				this.currencyFlag.isSliderOpen      = false;
				this.currencySelector.interactivity = true;
			});
		} else {
	
			if (this.currencyFlag.disableSlider || !this.currencyFlag.isEnoughCurrency) return;
			this.currencySelector.interactivity = false;

			game.mainController._changeState("stateCurrency");

			this.currencyFlag.showSliderPanel(() => {
				this.currencySelector.config.landscape.rect = this.currencySelector.config.newRect;
				this.currencySelector.updateConfig(false);
				this.currencyFlag.isSliderOpen      = true;
				this.currencySelector.interactivity = true;
			});
			
		}
	}
	
	resetUI(parentAlpha) {
		const currencySpine = this.currencyPanel.getChildByName('currencyPanel');
		const logoSpine     = this.logoContainer.getChildByName('horisontalLogo').resetParent(parentAlpha);
		
		currencySpine.resetParent(parentAlpha);
		const showWhiteSpine = this.snowWhiteContainer.getChildByName('snowWhite');

		showWhiteSpine.setFirstFrame()
		showWhiteSpine.resetParent(parentAlpha);
		
		if (core.getOrientation()) {
			const coinsSpine  = this.coins.resetParent(parentAlpha);
			const branchesAll = this.branchesAll.resetParent(parentAlpha);
		} else {
			const branchesAllHorizontal = this.branchesAllHorizontal.resetParent(parentAlpha);
			const coinsHorizontalSpine  = this.coinsHorizontal.resetParent(parentAlpha);
		}
		
	}
	
	showUI(cb) {
	
		this.visible = true
		core.gameIsAnimate = true;
		this.currencyPanel.visible = true
		core.buttonsAvailable = false;
		
		const currencySpine  = this.currencyPanel.getChildByName('currencyPanel');
		currencySpine.setFirstFrame()
		const showWhiteSpine =this.showWhiteSpine = this.snowWhiteContainer.getChildByName('snowWhite');

		this.updateConfig(core.getOrientation())
		showWhiteSpine.resetParent(0);
		
		const logoSpine      = this.logoContainer.getChildByName('horisontalLogo');
		
		const coinsSpine           = this.coins;
		const coinsHorizontalSpine = this.coinsHorizontal;
		
		const branchesAll           = this.branchesAll;
		const branchesAllHorizontal = this.branchesAllHorizontal;
		
		core.showHideTween(this.buttonRule, true, this.animationParameters.buttonAnimationSpeed);
		
		logoSpine.play('show', false, () => {
			logoSpine.play('loop', true);
		});
		
		branchesAll.play('show', false, () => {
			branchesAll.play('loop', true);
		});
		
		branchesAllHorizontal.play('show', false, () => {
			branchesAllHorizontal.play('loop', true);
		});
		
		coinsSpine.play('show', false, () => {
			coinsSpine.play('loop', true);
		});
		
		coinsHorizontalSpine.play('show', false, () => {
			coinsHorizontalSpine.play('loop', true);
		});
		
		this.currencyFlag.showPanel(() => {
			core.buttonsAvailable = true;
			core.gameIsAnimate = false;
			if (cb) cb();
		});
		
	
		currencySpine.play('show', false, () => {
			showWhiteSpine.resetParent(1);
			showWhiteSpine.play('show', false, () => {
				showWhiteSpine.play('loop', true);
			});
			
			this.currencySelector.interactivity = true;
	
		});
		
	}
	
	hideUI(cb) {
		core.buttonsAvailable       = false;
		core.gameIsAnimate          = true;
		const currencySpine         = this.currencyPanel.getChildByName('currencyPanel');
		const showWhiteSpine        = this.snowWhiteContainer.getChildByName('snowWhite');
		const logoSpine             = this.logoContainer.getChildByName('horisontalLogo');
		const coinsSpine            = this.coins;
		const coinsHorizontalSpine  = this.coinsHorizontal;
		const branchesAll           = this.branchesAll;
		const branchesAllHorizontal = this.branchesAllHorizontal;
		
		showWhiteSpine.play('hide', false,()=>{
			showWhiteSpine.resetParent(0);
			this.currencyFlag.hidePanel();
			
			logoSpine.play('hide', false);
			
			branchesAll.play('hide', false);
			
			branchesAllHorizontal.play('hide', false);
			
			coinsSpine.play('hide', false);
			
			coinsHorizontalSpine.play('hide', false);
			
			
			core.showHideTween(this.buttonRule, true, this.animationParameters.buttonAnimationSpeed, () => {
				this.buttonRule.alpha = 0;
			});
			
			this.currencySelector.interactivity = false;
			
			currencySpine.play('hide', false, () => {
				
				this.currencyPanel.visible          = false;
				currencySpine.setFirstFrame()
				core.buttonsAvailable = true;
				core.gameIsAnimate = false;
				if (cb) cb();
			});
		})
			
		
	
		
	}
	
	show(config, cb) {
		super.show(config, cb);
		this.visible          = true;
		if(game.model.recovery){
			this.resetUI(0)
		}else{
			this.resetUI(1)
		}

	}
	
	hide(config, cb) {
		super.hide(config, cb);
		this.visible          = true;
	}
	
}
