import currencyToSymbolMap from 'currency-symbol-map';

export default class RulesView extends game.components.UI.src.View {
	prevMinBet = null;
	
	prevMaxBet = null;
	
	show() {
		super.show();
		this.visible = false;
		this.lines   = [];
		
		this.ruleBoard         = this._getChildByName('ruleBoard');
		const labelBoardStyle  = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'Noto Sans',
			fontSize: 25,
			strokeThickness: 1,
		});
		const translation      = game.model.libary.translation;
		const rulesTextConfigs = [];
		const ruleTranslation  = translation.ruleMenu.rules;
		const ruleOffsets      = 150;
		
		const scrollboxOptions = this.scrollboxOptions = {
			'boxWidth': 1050,
			'boxHeight': 1000,
			'scrollbarSize': 10,
			'scrollbarBackground': 14540253,
			'scrollbarBackgroundAlpha': 1,
			'scrollbarForeground': 8947848,
			'scrollbarForegroundAlpha': 1,
			'dragScroll': true,
			'stopPropagation': true,
			'scrollbarOffsetHorizontal': 0,
			'scrollbarOffsetVertical': 0,
			'underflow': 'top-left',
			'fadeScrollbar': false,
			'fadeScrollbarTime': 1000,
			'fadeScrollboxWait': 3000,
			'fadeScrollboxEase': 'easeInOutSine',
			'passiveWheel': false,
			'clampWheel': true,
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			
			landscape: {
				boxHeight: 850,
				boxWidth: 1100,

				scale:1,
				x:-500,
				y:100
				
			},
			
			portrait: {
				boxHeight: 1350,
				boxWidth: 1100,
				scale:0.85,
				x:-450,
				y:100
			},
		};
		
		const updateScroll = this.updateScroll = new ScrollBox(scrollboxOptions);

		
		let currencyLogo = currencyToSymbolMap(game.model.user.userBalance.currencyCode);
		
		if (currencyLogo === undefined) currencyLogo = '$ ';
		
		let nf = core.Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: game.model.user.userBalance.currencyCode,
		});
		
		let maxBet = nf.format(game.model.maxBet).replace(game.model.user.userBalance.currencyCode, currencyLogo);
		let minBet = nf.format(game.model.minBet).replace(game.model.user.userBalance.currencyCode, currencyLogo);
		
		ruleTranslation.forEach((translation, i) => {
			
			let text = translation.lineText;
			if (i == 3) {
				text = this.replaceAll(text, '$', `${maxBet}`);
				
				text            = this.replaceAll(text, '#', `${minBet}`);
				this.prevMaxBet = maxBet;
				this.prevMinBet = minBet;
			}
			
			const rule = {
				name: 'rule_' + i,
				type: core.display.DisplayText,
				dimensions: {
					x: 0,
					y: 0,
					width: 1000,
					height: 80,
				},
				debugShape: false,
				scaleDownToFit: true,
				multiStyle: true,
				hAlign: 1,
				vAlign: 0,
				paramText: {
					style: StyleText.rule.line,
					text: text,
					disable: true,
				},
				landscape: {
					x: 0,
					y: 140 + 60 * i,
					scaleX: 1,
					scaleY: 1,
					dimensions: {
						x: 0,
						y: -50,
						width: 1000,
						height: 100,
					},
				},
				portrait: {
					x: 0,
					y: 150 + 70 * i,
					scaleX: 1,
					scaleY: 1,
					dimensions: {
						x: 0,
						y: -50,
						width: 1000,
						height: 100,
					},
				},
			};
			
			const section = new core.display.DisplayText(rule);
			this.lines.push(section);
			
			rulesTextConfigs.push(rule);
			
			updateScroll.content.addChild(section);
			
		});
		
		this.bg                 = this._getChildByName('bg');
		this.buttonBack         = this._getChildByName('backRule');
		this.buttonBack.handler = () => {
			this.tweenRule(false, 0.5);
		};
		
		updateScroll.update();
		
		this.ruleBoard.addChild(updateScroll);
	}
	
	replaceAll(target, search, replacement) {
		return target.split(search).join(replacement);
	};
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
		const orientation = this.orientation;
		this.lines.forEach((line, i) => {
			
			line.updateConfig(orientation);
		});
		
		 const isPortrait = this.orientation ? 'portrait' : 'landscape';
		 
		 if(this.scrollboxOptions){
			
			 this.updateScroll.boxHeight = 	 this.scrollboxOptions[isPortrait].boxHeight
			 this.updateScroll.boxWidth = 	this.scrollboxOptions[isPortrait].boxWidth
			 this.updateScroll.x = 	 this.scrollboxOptions[isPortrait].x
			 this.updateScroll.y = 	this.scrollboxOptions[isPortrait].y
			 this.updateScroll.scale.set(this.scrollboxOptions[isPortrait].scale)


		 	
		 }
		// if (isPortrait) {
		// 	this.scrollbox.itemHeight = 2;
		// } else {
		// 	this.scrollbox.itemHeight = 10;
		// }
		// console.error(orientation);
	}
	
	updateUI() {
		
		let currencyLogo = currencyToSymbolMap(game.model.user.userBalance.currencyCode);
		
		if (currencyLogo === undefined) currencyLogo = '$ ';
		
		let nf = core.Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: game.model.user.userBalance.currencyCode,
		});
		
		let maxBet = nf.format(game.model.maxBet).replace(game.model.user.userBalance.currencyCode, currencyLogo);
		let minBet = nf.format(game.model.minBet).replace(game.model.user.userBalance.currencyCode, currencyLogo);
		
		this.lines.forEach((line, i) => {
			let lineText = line.text;
			
			if (i == 3) {
				
				lineText        = this.replaceAll(lineText, this.prevMaxBet, `${maxBet}`);
				lineText        = this.replaceAll(lineText, this.prevMinBet, `${minBet}`);
				line.text       = lineText;
				this.prevMaxBet = maxBet;
				this.prevMinBet = minBet;
				
			}
		});
		
	}
	
	showRules(cb) {
		this.alpha   = 0;
		this.visible = true;
		this.tweenRule(true, 0.5);
		if (cb) cb();
	}
	
	hideRules(cb) {
		const config = {
			name: 'input_sum_place',
			state: false,
		};
		game.mainController.components.ui.disableSceneInput(config);
		this.tweenRule(false, 0.5);
		if (cb) cb();
	}
	
	tweenRule(on, duration) {
		this.bg.cacheAsBitmap = false;
		const tween           = core.tween.TweenMax.to(this, duration, {alpha: on ? 1 : 0});
		tween.eventCallback('onComplete', () => {
			this.visible          = on;
			this.bg.interactive   = on;
			this.bg.cacheAsBitmap = true;
			tween.kill();
		});
	}
}
