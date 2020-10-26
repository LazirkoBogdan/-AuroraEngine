export default class Ui extends core.manager.Config {
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
		const currency        = new PIXI.TextStyle({
			fill: '#ffffff',
			fontFamily: 'NotoSans-Light',
			fontSize: 30,
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
			fontSize: 45,
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
		
		this._config.ui = {
			id: 'UI',
			type: 'ui',
			config: {
				name:"ui",
				visible: false,
				needMask: false,
				parentGroup: 'UI',
				chipsOffsets: {
					landscape: {
						width: 60,
						offsetX: 10,
						height: 5,
						scale: 0.4,
					},
					portrait: {
						width: 120,
						offsetX: 50,
						scale: 0.8,
						height: 5,
					},
				},
				testText: {
					on: false,
					text: 'UI',
				},
				sceneObj: [
					{
						name: 'center',
						enableSceneObj: false,
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 410,
							scaleX: 0.7,
							scaleY: 0.7,
							alpha: 0,
						},
						portrait: {
							x: 1030,
							y: 340,
							scaleX: 0.8,
							scaleY: 0.8,
							alpha: 0,
						},
						sceneObj: [
							{
								texture: 'bg_ribbon',
								name: 'bgText',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									anchor: 0.5,
									texture: 'bg_ribbon',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'bg_ribbon',
								},
							},
						],
					},
					{
						name: 'buttonHome',
						type: core.display.Button,
						handler: 'onHomeButton',
						states: {
							initialGame: {
								status: 'active',
								enable: true,
							},
							introGame: {
								status: 'active',
								enable: true,
							},
							betGame: {
								status: 'active',
								enable: true,
							},
							startGame: {
								status: 'active',
								enable: true,
							},
							selectGame: {
								status: 'active',
								enable: true,
							},
							hit: {
								status: 'active',
								enable: true,
							},
							stand: {
								status: 'active',
								enable: true,
							},
							gameOver: {
								status: 'active',
								enable: true,
							},
						},
						landscape: {
							x: 80,
							y: 6,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 0.6,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 500,
							y: 0,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 0.8,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								texture: 'BTN_Enabled_Green',
								name: 'buttonHomeSprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									texture: 'BTN_Enabled_Green',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									texture: 'BTN_Enabled_Green',
									anchor: 0.5,
								},
							}, {
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: -7,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_home',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -7,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_home',
									anchor: 0.5,
								},
							},
						],
					},
					{
						name: 'buttonMenu',
						type: core.display.Button,
						handler: 'onMenu',
						states: {
							initialGame: {
								status: 'active',
								enable: true,
							},
							introGame: {
								enable: false,
								status: 'disable',
							},
							betGame: {
								enable: false,
								status: 'disable',
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
							gameOver: {
								enable: false,
								status: 'disable',
							},
						},
						enableSceneObj: true,
						debug: {
							property: ['landscape', 'portrait'],
						},
						landscape: {
							x: 1840,
							y: 6,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 0.8,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 1430,
							y: 0,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 0.8,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								texture: 'BTN_Enabled_Green',
								name: 'buttonMenuSprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Enabled_Green',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Enabled_Green',
								},
							}, {
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: -7,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_menu_vertical',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -7,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_menu_vertical',
									anchor: 0.5,
								},
							},
						],
					},
					{
						name: 'buttonMin',
						handler: 'onMinButton',
						states: betButton,
						type: core.display.Button,
						landscape: {
							x: 80,
							y: -225,
							scaleX: 1,
							scaleY: 1,
							texture: 'BTN_Enabled_Green',
							scales: {
								unpressed: 1,
								pressed: 0.8,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 500,
							y: -450,
							scaleX: 1,
							scaleY: 1,
							texture: 'BTN_Enabled_Green',
							scales: {
								unpressed: 1,
								pressed: 0.6,
							},
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
									texture: 'BTN_Enabled_Green',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Enabled_Green',
								},
							},
							{
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -50,
									width: 100,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.fieldButton,
									text: core.getTranslation('min', 'buttonText'),
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
									x: 0,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'buttonMultiplier',
						handler: 'onButtonMultiplier',
						states: betButton,
						type: core.display.Button,
						landscape: {
							x: 212,
							y: -205,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 0.6,
							},
							texture: 'BTN_Enabled_Green',
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 630,
							y: -420,
							scaleX: 1,
							scaleY: 1,
							texture: 'BTN_Enabled_Green',
							scales: {
								unpressed: 1,
								pressed: 0.6,
							},
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
									anchor: 0.5,
									scaleX: 1,
									scaleY: 1,
									texture: 'BTN_Enabled_Green',
								},
								portrait: {
									x: 0,
									y: 0,
									anchor: 0.5,
									scaleX: 1,
									scaleY: 1,
									texture: 'BTN_Enabled_Green',
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -50,
									width: 100,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.fieldButton,
									text: 'X2',
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
									x: 0,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'buttonMax',
						handler: 'onMaxButton',
						type: core.display.Button,
						states: betButton,
						landscape: {
							x: 1840,
							y: -225,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 0.6,
							},
							texture: 'BTN_Enabled_Green',
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 1430,
							y: -450,
							scaleX: 1,
							scaleY: 1,
							texture: 'BTN_Enabled_Green',
							scales: {
								unpressed: 1,
								pressed: 0.6,
							},
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
									texture: 'BTN_Enabled_Green',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Enabled_Green',
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -50,
									width: 100,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.fieldButton,
									text: core.getTranslation('max', 'buttonText'),
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
									x: 0,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'buttonDivider',
						handler: 'onButtonDivider',
						type: core.display.Button,
						states: betButton,
						landscape: {
							x: 1710,
							y: -205,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							texture: 'BTN_Enabled_Green',
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 1300,
							y: -420,
							scaleX: 1,
							scaleY: 1,
							texture: 'BTN_Enabled_Green',
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
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
									anchor: 0.5,
									scaleX: 1,
									scaleY: 1,
									texture: 'BTN_Enabled_Green',
								},
								portrait: {
									x: 0,
									y: 0,
									anchor: 0.5,
									scaleX: 1,
									scaleY: 1,
									texture: 'BTN_Enabled_Green',
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -45,
									y: -45,
									width: 90,
									height: 90,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.fieldButton,
									text: 'X/2',
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
									x: 1,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 1,
									y: -4,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'input_sum_place',
						type: core.display.ButtonInputText,
						states: {
							initialGame: {
								getterUpdate: false,
								inputTextEnable: false,
								text: core.getTranslation('enterBet'),
							},
							introGame: {
								enable: false,
								inputTextEnable: true,
								getterUpdate: true,
							},
							recovery: {
								getterUpdate: false,
								enable: false,
								inputTextEnable: false,
							},
							betGame: {
								getterUpdate: false,
								inputTextEnable: false,
							},
							gameOver: {
								getterUpdate: false,
								inputTextEnable: true,
							},
							startGame: {
								inputTextEnable: true,
							},
							selectGame: {
								getterUpdate: true,
								inputTextEnable: true,
							},
							hit: {
								getterUpdate: true,
								inputTextEnable: true,
							},
							stand: {
								getterUpdate: true,
								inputTextEnable: true,
							},
						},
						tweenText: {
							customUpdate: true,
							duration: 1,
							delay: 0,
						},
						getter: 'userBet',
						handler: 'onInputBet',
						landscape: {
							x: 960,
							y: -220,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 960,
							y: -470,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
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
									texture: 'landscape_input_sum_place',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									texture: 'portret_input_sum_place',
									anchor: 0.5,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -200,
									y: -25,
									width: 400,
									height: 50,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: fieldStyle,
									text: core.getTranslation('enterBet'),
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'inputText',
								textType: 'number',
								
								type: core.display.TextInput,
								style: {
									input: {
										fontFamily: 'NotoSans-Bold',
										fontSize: '33px',
										padding: '12px',
										width: '360px',
										textAlign: 'center',
										color: '#FFCE06',
									},
								},
								
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									center: true,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									center: true,
								},
							},
						],
					},
					{
						name: 'info_left',
						type: core.display.Button,
						getter: 'lastWin',
						landscape: {
							x: 610,
							y: 20,
							scaleX: 1,
							scaleY: 1,
							texture: 'info_results_place',
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 670,
							y: 30,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								texture: 'info_results_place',
								name: 'info_leftSprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
							}, {
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_win',
									anchor: 0.5,
								},
								portrait: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_win',
									anchor: 0.5,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -35,
									width: 100,
									height: 70,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.boxYellow,
									text: '0',
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
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'info_middle',
						getter: 'lastLose',
						type: core.display.Button,
						landscape: {
							x: 860,
							y: 20,
							scaleX: 1,
							scaleY: 1,
							texture: 'info_results_place',
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 870,
							y: 30,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								texture: 'info_results_place',
								name: 'info_leftSprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
							}, {
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									
									texture: 'ic_losse',
									anchor: 0.5,
								},
								
								portrait: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_losse',
									anchor: 0.5,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -35,
									width: 100,
									height: 70,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.boxYellow,
									text: '0',
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
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'info_right',
						getter: 'lastDraw',
						type: core.display.Button,
						landscape: {
							x: 1100,
							y: 20,
							scaleX: 1,
							scaleY: 1,
							texture: 'info_results_place',
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 1070,
							y: 30,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								texture: 'info_results_place',
								name: 'info_leftSprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
							}, {
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_draw',
									anchor: 0.5,
								},
								
								portrait: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_draw',
									anchor: 0.5,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -35,
									width: 100,
									height: 70,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.boxYellow,
									text: '0',
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
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'info_last',
						getter: 'gameCount',
						type: core.display.Button,
						landscape: {
							x: 1340,
							y: 20,
							scaleX: 1,
							scaleY: 1,
							texture: 'info_results_place',
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 1270,
							y: 30,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								texture: 'info_results_place',
								name: 'info_leftSprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'info_results_place',
								},
							}, {
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_cards',
									anchor: 0.5,
								},
								portrait: {
									x: -60,
									y: 0,
									scaleX: 0.9,
									scaleY: 0.9,
									texture: 'ic_cards',
									anchor: 0.5,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -35,
									width: 100,
									height: 70,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.boxYellow,
									text: '0',
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
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 30,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'leftMainButton',
						debug: {
							property: ['landscape', 'portrait'],
						},
						type: core.display.Button,
						handler: 'onLeftMainButton',
						states: {
							initialGame: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('clearBet', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							introGame: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('clearBet', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							betGame: {
								enable: true,
								status: 'active',
								texture: 'BTN_Enabled_Brown_Dark',
								text: core.getTranslation('clearBet', 'buttonText'),
								textStyle: StyleText.ui.button.main,
							},
							startGame: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('clearBet', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							selectGame: {
								enable: true,
								status: 'active',
								texture: 'BTN_Enabled_Brown_Dark',
								text: core.getTranslation('stand', 'buttonText'),
								textStyle: StyleText.ui.button.main,
							},
							hit: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('stand', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							stand: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('stand', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							gameOver: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('stand', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
						},
						landscape: {
							x: 300,
							y: -30,
							scaleX: 0.8,
							scaleY: 0.8,
							texture: 'BTN_Disabled_Brown',
							scales: {
								unpressed: 0.8,
								pressed: 1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 680,
							y: 70,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							texture: 'BTN_Enabled_Brown_Light',
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								texture: 'BTN_Disabled_Brown',
								name: 'sprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Disabled_Brown',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Disabled_Brown',
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -225,
									y: -60,
									width: 450,
									height: 120,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.mainDisable,
									text: core.getTranslation('clearBet', 'buttonText'),
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'rightMainButton',
						handler: 'onRigthMainButton',
						type: core.display.Button,
						landscape: {
							x: 1620,
							y: -30,
							scaleX: 0.8,
							scaleY: 0.8,
							scales: {
								unpressed: 0.8,
								pressed: 1,
							},
							texture: 'BTN_Disabled_Brown',
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 1230,
							y: 70,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						states: {
							initialGame: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('deal', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							introGame: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('deal', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							betGame: {
								enable: true,
								status: 'active',
								texture: 'BTN_Enabled_Brown_Dark',
								text: core.getTranslation('deal', 'buttonText'),
								textStyle: StyleText.ui.button.main,
							},
							startGame: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('deal', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							selectGame: {
								enable: true,
								status: 'active',
								texture: 'BTN_Enabled_Brown_Dark',
								text: core.getTranslation('hit', 'buttonText'),
								textStyle: StyleText.ui.button.main,
							},
							hit: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('hit', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							stand: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('hit', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
							},
							gameOver: {
								enable: false,
								status: 'disable',
								texture: 'BTN_Disabled_Brown',
								text: core.getTranslation('hit', 'buttonText'),
								textStyle: StyleText.ui.button.mainDisable,
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
									texture: 'BTN_Disabled_Brown',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'BTN_Disabled_Brown',
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -225,
									y: -60,
									width: 450,
									height: 120,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.button.mainDisable,
									text: core.getTranslation('deal', 'buttonText'),
									landscape: {
										x: 0,
										y: 0,
									},
									portrait: {
										x: 0,
										y: 0,
									},
								},
								text: core.getTranslation('deal', 'buttonText'),
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'chip_0',
						handler: 'onChipBet',
						states: chipState,
						enableSceneObj: true,
						getter: 'userChip',
						chipId: 0,
						type: logic.feature.Chip,
						landscape: {
							x: 610,
							y: -10,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 545,
							y: -240,
							scaleX: 1.1,
							scaleY: 1.1,
							scales: {
								unpressed: 1.1,
								pressed: 1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'chipMove',
								type: core.display.Spine,
								skin: 'Blue',
								animations: {
									show: {
										name: 'show',
										loop: false,
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -45,
									width: 100,
									height: 90,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.chip.blue,
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'chip_1',
						handler: 'onChipBet',
						states: chipState,
						enableSceneObj: true,
						getter: 'userChip',
						chipId: 1,
						type: logic.feature.Chip,
						landscape: {
							x: 755,
							y: -10,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 705,
							y: -225,
							scaleX: 1.1,
							scaleY: 1.1,
							scales: {
								unpressed: 1.1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'chipMove',
								type: core.display.Spine,
								skin: 'red',
								animations: {
									show: {
										name: 'show',
										loop: false,
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -45,
									width: 100,
									height: 90,
								},
								
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.chip.red,
									
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'chip_2',
						handler: 'onChipBet',
						states: chipState,
						enableSceneObj: true,
						getter: 'userChip',
						chipId: 2,
						type: logic.feature.Chip,
						landscape: {
							x: 895,
							y: -10,
							scaleX: 1,
							scaleY: 1,
							texture: 'Blue',
							scales: {
								unpressed: 1,
								pressed: 1.1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 865,
							y: -220,
							scaleX: 1.1,
							scaleY: 1.1,
							texture: 'Blue',
							scales: {
								unpressed: 1.1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'chipMove',
								type: core.display.Spine,
								skin: 'Green',
								animations: {
									show: {
										name: 'show',
										loop: false,
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -45,
									width: 100,
									height: 90,
								},
								
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.chip.green,
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'chip_3',
						handler: 'onChipBet',
						states: chipState,
						enableSceneObj: true,
						getter: 'userChip',
						chipId: 3,
						type: logic.feature.Chip,
						landscape: {
							x: 1035,
							y: -10,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 1025,
							y: -215,
							scaleX: 1.1,
							scaleY: 1.1,
							scales: {
								unpressed: 1.1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'chipMove',
								type: core.display.Spine,
								skin: 'Lilov',
								animations: {
									show: {
										name: 'show',
										loop: false,
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -45,
									width: 100,
									height: 90,
								},
								
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.chip.violet,
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'chip_4',
						handler: 'onChipBet',
						states: chipState,
						enableSceneObj: true,
						getter: 'userChip',
						chipId: 4,
						type: logic.feature.Chip,
						landscape: {
							x: 1175,
							y: -10,
							scaleX: 1,
							scaleY: 1,
							scales: {
								unpressed: 1,
								pressed: 1.1,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 1185,
							y: -225,
							scaleX: 1.1,
							scaleY: 1.1,
							scales: {
								unpressed: 1.1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'chipMove',
								type: core.display.Spine,
								skin: 'Orange',
								animations: {
									show: {
										name: 'show',
										loop: false,
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -45,
									width: 100,
									height: 90,
								},
								
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.chip.yellow,
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'chip_5',
						handler: 'onChipBet',
						states: chipState,
						enableSceneObj: true,
						getter: 'userChip',
						chipId: 5,
						type: logic.feature.Chip,
						landscape: {
							x: 1315,
							y: -10,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 1345,
							y: -244,
							scaleX: 1.1,
							scaleY: 1.1,
							scales: {
								unpressed: 1.1,
								pressed: 1.2,
							},
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'chipMove',
								type: core.display.Spine,
								skin: 'Black',
								animations: {
									show: {
										name: 'show',
										loop: false,
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -45,
									width: 100,
									height: 90,
								},
								
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: StyleText.ui.chip.black,
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'playerScore',
						type: core.display.Button,
						getter: 'playerScore',
						getterDelay: 1200,
						states: {
							initialGame: {
								visible: false,
								getterUpdate: true,
								text: '',
							},
							introGame: {
								visible: false,
							},
							betGame: {
								visible: false,
								getterUpdate: true,
							},
							startGame: {
								visible: false,
								getterUpdate: false,
							},
							selectGame: {
								getterUpdate: false,
								visible: true,
							},
							recovery: {
								getterUpdate: false,
								visible: false,
							},
							hit: {
								getterUpdate: false,
								visible: true,
							},
							stand: {
								getterUpdate: false,
								visible: true,
							},
							gameOver: {
								getterUpdate: false,
								visible: true,
							},
						},
						x: 960,
						landscape: {
							x: 960,
							y: 440,
							scaleX: 0.6,
							scaleY: 0.6,
							cardWidth: 90,
							cardOffsetX: -55,
						},
						portrait: {
							x: 960,
							y: 460,
							scaleX: 0.9,
							scaleY: 0.9,
							cardWidth: 105,
							cardOffsetX: -50,
						},
						sceneObj: [
							{
								texture: 'info_results_place',
								name: 'sprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									alpha: 0.7,
									texture: 'scoreBG',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									alpha: 0.7,
									texture: 'scoreBG',
								},
							}, {
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -40,
									width: 100,
									height: 80,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: scoreWhiteStyle,
									text: '',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					}, {
						name: 'dealerScore',
						debug: {
							property: ['landscape', 'portrait'],
						},
						x: 960,
						type: core.display.Button,
						states: {
							initialGame: {
								visible: false,
								getterUpdate: true,
								text: '',
							},
							introGame: {
								visible: false,
							},
							betGame: {
								visible: false,
								getterUpdate: true,
							},
							startGame: {
								visible: false,
								getterUpdate: false,
							},
							selectGame: {
								getterUpdate: false,
								visible: true,
							},
							recovery: {
								getterUpdate: false,
								visible: false,
							},
							hit: {
								getterUpdate: false,
								visible: true,
							},
							stand: {
								getterUpdate: false,
								visible: true,
							},
							gameOver: {
								getterUpdate: false,
								visible: true,
							},
						},
						getterDelay: 1200,
						getter: 'dealerScore',
						landscape: {
							x: 960,
							y: 130,
							scaleX: 0.5,
							scaleY: 0.5,
							cardWidth: 65,
							cardOffsetX: -50,
						},
						portrait: {
							x: 960,
							y: -10,
							scaleX: 0.6,
							scaleY: 0.6,
							cardWidth: 75,
							cardOffsetX: -35,
						},
						sceneObj: [
							{
								texture: 'info_results_place',
								name: 'sprite',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									alpha: 0.7,
									texture: 'scoreBG',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									alpha: 0.7,
									texture: 'scoreBG',
								},
							},
							{
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -50,
									y: -40,
									width: 100,
									height: 80,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: scoreWhiteStyle,
									text: '',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'userBalance',
						states: {
							initialGame: {
								getterUpdate: false,
							},
							betGame: {
								getterUpdate: true,
							},
							gameOver: {
								getterUpdate: true,
							},
							introGame: {
								getterUpdate: true,
							},
							startGame: {
								getterUpdate: false,
							},
							selectGame: {
								getterUpdate: true,
							},
							hit: {
								getterUpdate: true,
							},
							stand: {
								getterUpdate: true,
							},
						},
						type: core.display.Button,
						tweenText: {
							customUpdate: true,
							duration: 1,
							delay: 0,
						},
						
						getter: 'playerBalance',
						landscape: {
							x: 960,
							y: 15,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 960,
							y: -200,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -200,
									y: -25,
									width: 400,
									height: 50,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: playerBalance,
									text: '0',
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
									x: 10,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -150,
										y: -35,
										width: 300,
										height: 70,
									},
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -160,
										y: -40,
										width: 320,
										height: 80,
									},
								},
							},
						],
					},
					{
						
						name: 'currencyChange',
						states: {
							initialGame: {
								status: 'active',
								getterUpdate: false,
								enable: true,
							},
							introGame: {
								status: 'disable',
								getterUpdate: false,
								enable: false,
							},
							betGame: {
								status: 'disable',
								getterUpdate: false,
								enable: false,
							},
							recovery: {
								status: 'disable',
								enable: false,
								getterUpdate: false,
							},
							startGame: {
								status: 'disable',
								enable: false,
								getterUpdate: false,
							},
							selectGame: {
								status: 'disable',
								enable: false,
								getterUpdate: false,
							},
							hit: {
								status: 'disable',
								enable: false,
								getterUpdate: false,
							},
							stand: {
								status: 'disable',
								getterUpdate: false,
								enable: false,
							},
							gameOver: {
								status: 'disable',
								getterUpdate: false,
								enable: false,
							},
						},
						handler: 'onCurrencyMenu',
						enableSceneObj: true,
						type: core.display.Button,
						getter: 'currency',
						landscape: {
							x: 795,
							y: 15,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						portrait: {
							x: 760,
							y: -205,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'bottom',
							},
						},
						sceneObj: [
							{
								name: 'logo',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									texture: 'change',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									texture: 'change',
									anchor: 0.5,
								},
							},
							
							{
								name: 'text',
								type: core.display.DisplayText,
								dimensions: {
									x: -15,
									y: -15,
									width: 30,
									height: 30,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: currency,
									text: '1',
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
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									
								},
							},
						],
					}, {
						name: 'buttonMenuBackground',
						type: core.display.SceneObject,
						states: {
							initialGame: {
								status: 'disable',
								enable: false,
							},
							introGame: {
								enable: false,
								status: 'disable',
							},
							betGame: {
								enable: false,
								status: 'disable',
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
							gameOver: {
								enable: false,
								status: 'disable',
							},
						},
						landscape: {
							x: 960,
							y: 500,
							scaleX: 1,
							scaleY: 1,
						},
						portrait: {
							x: 960,
							y: 500,
							scaleX: 1,
							scaleY: 1,
						},
						sceneObj: [
							{
								name: 'graphics',
								type: core.display.KeyFrameGraphics,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.2,
												alpha: 0.6,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 0.6,
										},
										this: [
											{
												duration: 0.2,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									
									rectAlpha: 0.7,
									color: 0x000000,
									rect: {
										x: -1920,
										y: -1080,
										width: 1920 * 2,
										height: 1080 * 2,
									},
									pivotCenter: true,
								},
								portrait: {
									x: 0,
									y: 0,
									
									scaleX: 1,
									scaleY: 1,
									rectAlpha: 0.7,
									color: 0x000000,
									rect: {
										x: -1080,
										y: -1920,
										width: 1080 * 2,
										height: 1920 * 2,
									},
									pivotCenter: true,
								},
							},
						],
					}, {
						name: 'buttonMenuOpen',
						enableSceneObj: false,
						type: core.display.MultiButton,
						states: {
							initialGame: {
								status: 'active',
								enable: true,
							},
							introGame: {
								enable: false,
								status: 'disable',
							},
							betGame: {
								enable: false,
								status: 'disable',
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
							gameOver: {
								enable: false,
								status: 'disable',
							},
						},
						interactiveText: ['results', 'rules'],
						landscape: {
							x: 1650,
							y: 135,
							scaleX: 0.5,
							scaleY: 0.5,
							scales: {
								unpressed: 0.5,
								pressed: 0.7,
							},
							
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 1250,
							y: 130,
							scaleX: 0.5,
							scaleY: 0.5,
							scales: {
								unpressed: 0.5,
								pressed: 0.7,
							},
							responsivePosition: {
								position: 'top',
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
									texture: 'dialog_bg',
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									anchor: 0.5,
									texture: 'dialog_bg',
								},
							}, {
								name: 'results',
								type: core.display.DisplayText,
								dimensions: {
									x: -390,
									y: -90,
									width: 780,
									height: 180,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: buttonMenuStyle,
									text: core.getTranslation('name', 'historyMenu'),
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
									x: 0,
									y: -160,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.1,
									},
								},
								portrait: {
									x: 0,
									y: -140,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.1,
									},
								},
							}, {
								name: 'rules',
								type: core.display.DisplayText,
								dimensions: {
									x: -390,
									y: -90,
									width: 780,
									height: 180,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: buttonMenuStyle,
									text: core.getTranslation('name', 'ruleMenu'),
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
									x: 0,
									y: 120,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.1,
									},
								},
								portrait: {
									x: 0,
									y: 120,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.1,
									},
								},
							},
						],
					},
				],
			},
		};
	}
	
	/**
	/**
	 * @getter
	 * Ui paramaters
	 */
	get config() {
		return {
			key: 'ui',
			value: this._config.ui,
		};
	}
}
