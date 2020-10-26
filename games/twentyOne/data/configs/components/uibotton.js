export default class Uibotton extends core.manager.Config {
	constructor(model, textures) {
		super(model, textures);
		this.createConfig();
	}
	
	generateChipStyle(color) {
		return new PIXI.TextStyle({
			fill: `#${color}`,
			fontSize: 45,
			fontWeight: '900',
			fontFamily: 'Noto Serif SC',
		});
	}
	
	/**
	 * @public
	 * create config for Ui
	 */
	createConfig() {
		const buttonMenuStyle = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'NotoSans-Bold',
			fontSize: 120,
			strokeThickness: 1,
		});
		
		const fieldStyle      = new PIXI.TextStyle({
			fill: '#FFCE06',
			fontFamily: 'NotoSans-Bold',
			fontSize: 35,
			strokeThickness: 0.5,
		});
		const scoreWhiteStyle = new PIXI.TextStyle({
			fill: '#eaeaea',
			fontFamily: 'NotoSans-Bold',
			fontSize: 40,
		});
		const playerBalance   = new PIXI.TextStyle({
			fill: '#ffffff',
			fontFamily: 'NotoSans-Light',
			fontSize: 40,
			fontWeight: '200',
			strokeThickness: 1,
		});
		const inputStyle      = new PIXI.TextStyle({
			fill: '#274024',
			fontFamily: 'NotoSans-Bold',
			fontWeight: 'bold',
			letterSpacing: 0,
			fontSize: 20,
			strokeThickness: 0.5,
		});
		const inputLabelStyle = new PIXI.TextStyle({
			fill: '#274024',
			fontFamily: 'NotoSans-Bold',
			fontWeight: 'bold',
			letterSpacing: 0,
			fontSize: 30,
			strokeThickness: 0.5,
		});
		const chipState       = {
			initialGame: {
				enable: true,
				status: 'disable',
			},
			introGame: {
				enable: false,
				status: 'disable',
			},
			betGame: {
				enable: true,
				status: 'active',
			},
			startGame: {
				enable: false,
				status: 'disable',
			},
			selectGame: {
				enable: false,
				status: 'disable',
			},
			hit: {
				enable: false,
				status: 'disable',
			},
			stand: {
				enable: false,
				status: 'disable',
			},
			recovery: {
				enable: false,
				status: 'disable',
			},
			gameOver: {
				enable: false,
				status: 'disable',
			},
		};
		const betButton       = {
			initialGame: {
				status: 'active',
				enable: true,
				texture: 'BTN_Enabled_Green',
				textStyle: StyleText.ui.button.fieldButton,
			},
			introGame: {
				enable: false,
				status: 'disable',
				texture: 'BTN-_Disabled_Green',
				textStyle: StyleText.ui.button.fieldButtonDisable,
			},
			betGame: {
				status: 'active',
				enable: true,
				texture: 'BTN_Enabled_Green',
				textStyle: StyleText.ui.button.fieldButton,
			},
			startGame: {
				enable: false,
				status: 'disable',
				texture: 'BTN-_Disabled_Green',
				textStyle: StyleText.ui.button.fieldButtonDisable,
			},
			selectGame: {
				enable: false,
				status: 'disable',
				texture: 'BTN-_Disabled_Green',
				textStyle: StyleText.ui.button.fieldButtonDisable,
			},
			hit: {
				enable: false,
				status: 'disable',
				texture: 'BTN-_Disabled_Green',
				textStyle: StyleText.ui.button.fieldButtonDisable,
			},
			stand: {
				enable: false,
				status: 'disable',
				texture: 'BTN-_Disabled_Green',
				textStyle: StyleText.ui.button.fieldButtonDisable,
			},
			gameOver: {
				enable: false,
				status: 'disable',
				texture: 'BTN-_Disabled_Green',
				textStyle: StyleText.ui.button.fieldButtonDisable,
			},
		};
		const translation     = this._model.libary.translation;
		this._config.uibotton = {
			id: 'UIBotton',
			type: 'uibotton',
			config: {
				visible: false,
				needMask: false,
				testText: {
					on: false,
					text: 'UI Botton component',
				},
				sceneObj: [
					{
						name: 'input_sum_place',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: -195,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 960,
							y: -470,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'sprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									alpha: 0,
									texture: 'landscape_input_sum_place',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									alpha: 0,
									texture: 'portret_input_sum_place',
									anchor: 0.5,
								},
							}, {
								name: 'min',
								type: core.display.DisplayText,
								dimensions: {
									x: -100,
									y: -50,
									width: 200,
									height: 100,
								},
								hAlign: -1,
								vAlign: -1,
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: inputStyle,
									text: core.core.getTranslation('min', 'buttonText') +
											` ${this._model.minBet}` +
											` ${this._model.user.userBalance.currencyCode}`,
									landscape: {
										x: 0,
										y: 0,
									},
									portrait: {
										x: 0,
										y: 0,
									},
								},
								landscape: {
									x: -180,
									y: -85,
									alpha: 0.7,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: -180,
									y: -75,
									alpha: 0.7,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'bet',
								type: core.display.DisplayText,
								dimensions: {
									x: -75,
									y: -50,
									width: 150,
									height: 100,
								},
								debugShape: false,
								
								vAlign: -1,
								scaleDownToFit: true,
								paramText: {
									style: inputLabelStyle,
									text: core.core.getTranslation('bet'),
									landscape: {
										x: 0,
										y: 0,
									},
									portrait: {
										x: 0,
										y: 0,
									},
								},
								
								landscape: {
									x: -5,
									y: -85,
									scaleX: 1,
									scaleY: 1,
									alpha: 0.7,
								},
								portrait: {
									x: -5,
								y: -75,
									scaleX: 1,
									scaleY: 1,
									alpha: 0.7,
								},
							}, {
								name: 'max',
								type: core.display.DisplayText,
								dimensions: {
									x: -100,
									y: -50,
									width: 200,
									height: 100,
								},
								debugShape: false,
								hAlign: 1,
								vAlign: -1,
								scaleDownToFit: true,
								paramText: {
									disable: false,
									style: inputStyle,
									text: core.core.getTranslation('max', 'buttonText') +
											` ${core.getFormattedNum(this._model.maxBet)}` +
											` ${this._model.user.userBalance.currencyCode}`,
									landscape: {
										x: 0,
										y: 0,
									},
									portrait: {
										x: 0,
										y: 0,
									},
								},
								landscape: {
									x: 170,
									y: -85,
									scaleX: 1,
									scaleY: 1,
									alpha: 0.7,
								},
								portrait: {
									x: 170,
										y: -75,
									scaleX: 1,
									scaleY: 1,
									alpha: 0.7,
								},
							},
						],
					},
				],
			},
		};
	}
	
	/**
	 * @getter
	 * Ui paramaters
	 */
	get config() {
		return {
			key: 'uibotton',
			value: this._config.uibotton,
		};
	}
}
