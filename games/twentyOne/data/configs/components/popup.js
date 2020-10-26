export default class Popup extends core.manager.Config {
	constructor(model, textures) {
		super(model, textures);
		this.createConfig();
	}
	
	/**
	 * @public
	 * create config for popup
	 */
	createConfig() {
		const buttonStyle = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'Noto Sans',
			fontSize: 50,
			fontWeight: 'bold',
			strokeThickness: 1,
		});
		const titleStyle  = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'Noto Sans',
			fontSize: 40,
			fontWeight: 'bold',
			strokeThickness: 1,
		});
		
		const descriptionStyle = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'Noto Sans',
			fontSize: 35,
			fontWeight: 'bold',
			strokeThickness: 1,
		});
		const chipStyle        = new PIXI.TextStyle({
			dropShadow: true,
			dropShadowAlpha: 0.5,
			dropShadowBlur: 3,
			dropShadowDistance: 8,
			fontFamily: 'Noto Sans',
			fill: 'white',
			fontSize: 200,
			fontWeight: 'bold',
			strokeThickness: 3,
		});
		const translation      = this._model.libary.translation;
		const getTranslation   = (name, block) => {
			let text;
			if (block) {
				text = translation[block][name];
			} else {
				text = translation[name].toUpperCase();
			}
			return text;
		};
		
		this._config.popup = {
			id: 'Popup',
			type: 'popup',
			config: {
				visible: false,
				needMask: false,
				parentGroup: 'DEFAULT',
				animationSpeed: 1,
				simpleOffset: 800,
				testText: {
					on: false,
					text: 'popup component',
				},
				sceneObj: [
					{
						name: 'bg',
						type: core.display.SceneObject,
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
								name: 'bg',
								type: core.display.KeyFrameGraphics,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												delay: 0.6,
												duration: 0.6,
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
							}, {
								name: 'shine',
								type: core.display.KeyFrameSprite,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0.4,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 0.4,
										},
										this: [
											{
												duration: 0.6,
												delay: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1.4,
									scaleY: 1.4,
									blendMode: 'SOFT_LIGHT',
									texture: 'dialog_shine',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -100,
									scaleX: 1.8,
									scaleY: 1.8,
									blendMode: 'SOFT_LIGHT',
									texture: 'dialog_shine',
									anchor: 0.5,
								},
							},
						],
					},
					{
						name: 'gameOver',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 540,
							scaleX: 1,
							scaleY: 1,
						},
						portrait: {
							x: 960,
							y: 540,
							scaleX: 1,
							scaleY: 1,
						},
						sceneObj: [
							{
								name: 'winLine',
								type: core.display.KeyFrameSprite,
								animations: {
									show: {
										setup: {
											scale: {
												x: 0,
												y: 1,
											},
											alpha: 1,
										},
										
										this: [
											{
												duration: 0.3,
												alpha: 1,
												scale: {
													x: 1,
													y: 1,
												},
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.2,
												alpha: 1,
												scale: {
													x: 1.2,
													y: 1.2,
												},
												ease: core.tween.Quad.easeOut,
											}, {
												duration: 0.2,
												alpha: 0,
												scale: {
													x: 0,
													y: 1.2,
												},
												ease: core.tween.Quad.easeIn,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'bg_win_animation',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'bg_win_animation',
									anchor: 0.5,
								},
							},
							{
								name: 'description',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -30,
									width: 450,
									height: 60,
								},
								animations: {
									show: {
										setup: {
											scale: {
												x: 1,
												y: 1,
											},
											alpha: 0,
										},
										this: [
											{
												duration: 0.5,
												alpha: 1,
												ease: core.tween.Bounce.easeInOut,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
											scale: {
												x: 1,
												y: 1,
											},
										},
										this: [
											{
												duration: 0.2,
												alpha: 1,
												scale: {
													x: 1.2,
													y: 1.2,
												},
												ease: core.tween.Quad.easeOut,
											}, {
												duration: 0.2,
												alpha: 0,
												scale: {
													x: 0,
													y: 0,
												},
												ease: core.tween.Quad.easeIn,
											},
										],
									},
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: buttonStyle,
									text: getTranslation('description', 'popupGameOver').lose,
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
							{
								name: 'text',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -500,
									y: -200,
									width: 1000,
									height: 400,
								},
								animations: {
									show: {
										setup: {
											scale: {
												x: 0,
												y: 0,
											},
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												scale: {
													x: 1.2,
													y: 1.2,
												},
												ease: core.tween.Quad.easeOut,
											}, {
												duration: 0.2,
												alpha: 1,
												scale: {
													x: 0.9,
													y: 0.9,
												},
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.2,
												alpha: 1,
												scale: {
													x: 1,
													y: 1,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									hide: {
										setup: {
											scale: {
												x: 1,
												y: 1,
											},
											alpha: 1,
										},
										this: [
											{
												duration: 0.2,
												alpha: 1,
												scale: {
													x: 1.2,
													y: 1.2,
												},
												ease: core.tween.Quad.easeOut,
											}, {
												duration: 0.5,
												alpha: 0,
												scale: {
													x: 0,
													y: 0,
												},
												ease: core.tween.Quad.easeIn,
											},
										],
									},
								},
								debugShape: false,
								hAlign: 0,
								vAlign: -1,
								scaleDownToFit: true,
								paramText: {
									style: chipStyle,
									text: getTranslation('title', 'popupGameOver').win,
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
									y: -250,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -250,
									scaleX: 1,
									scaleY: 1,
								},
							},
						],
					},
					{
						name: 'home',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 500,
							scaleX: 1.4,
							scaleY: 1.4,
						},
						portrait: {
							x: 960,
							y: 400,
							scaleX: 1.7,
							scaleY: 1.7,
						},
						sceneObj: [
							{
								texture: 'dialog_bg',
								name: 'bg',
								type: core.display.KeyFrameSprite,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
							}, {
								texture: 'Red',
								name: 'labelBg',
								hasLoopAnim: true,
								animations: {
									show: {
										setup: {
											alpha: 1,
											rotation: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.3,
												scale: {
													x: 1,
													y: 1,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.3,
												scale: {
													x: 0.6,
													y: 0.6,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									loop: {
										loops: 0,
										setup: {
											alpha: 1,
											scale: {
												x: 0.6,
												y: 0.6,
											},
											rotation: 0,
										},
										this: [
											{
												duration: 0,
												rotation: 0,
											}, {
												duration: 6,
												rotation: 180 * (Math.PI / 180),
											}, {
												duration: 6,
												rotation: 360 * (Math.PI / 180),
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
											scale: {
												x: 0.6,
												y: 0.6,
											},
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												scale: {
													x: 0,
													y: 0,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -230,
									scaleX: 0.6,
									scaleY: 0.6,
									texture: 'popupRed',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -230,
									scaleX: 0.6,
									scaleY: 0.6,
									texture: 'popupRed',
									anchor: 0.5,
								},
							}, {
								texture: 'ic_dialog_home',
								name: 'labelLogo',
								animations: {
									show: {
										setup: {
											alpha: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.4,
												scale: {
													x: 1.4,
													y: 1.4,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.2,
												scale: {
													x: 1,
													y: 1,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -235,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_dialog_home',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -235,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_dialog_home',
									anchor: 0.5,
								},
							}, {
								name: 'title',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -50,
									width: 450,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.label.default,
									text: getTranslation('title', 'popupBack'),
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
									y: -80,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -80,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'description',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -60,
									width: 450,
									height: 120,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.description.default,
									text: getTranslation('description', 'popupBack'),
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
									y: -0,
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
								name: 'yesButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: -125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								portrait: {
									enableSceneObj: true,
									x: -125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.yes,
											text: getTranslation('yes', 'buttonText'),
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
								name: 'noButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: 125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								portrait: {
									x: 125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.no,
											text: getTranslation('no', 'buttonText'),
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
						],
					},
					{
						name: 'internet',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 500,
							scaleX: 1.4,
							scaleY: 1.4,
						},
						portrait: {
							x: 960,
							y: 400,
							scaleX: 1.7,
							scaleY: 1.7,
						},
						sceneObj: [
							{
								texture: 'dialog_bg',
								name: 'bg',
								type: core.display.KeyFrameSprite,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
							},
							{
								texture: 'Red',
								name: 'labelBg',
								hasLoopAnim: true,
								animations: {
									show: {
										setup: {
											alpha: 1,
											rotation: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.3,
												scale: {
													x: 1,
													y: 1,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.3,
												scale: {
													x: 0.6,
													y: 0.6,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									loop: {
										loops: 0,
										setup: {
											alpha: 1,
											scale: {
												x: 0.6,
												y: 0.6,
											},
											rotation: 0,
										},
										this: [
											{
												duration: 0,
												rotation: 0,
											}, {
												duration: 6,
												rotation: 180 * (Math.PI / 180),
											}, {
												duration: 6,
												rotation: 360 * (Math.PI / 180),
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
											scale: {
												x: 0.6,
												y: 0.6,
											},
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												scale: {
													x: 0,
													y: 0,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -230,
									scaleX: 0.6,
									scaleY: 0.6,
									texture: 'popupRed',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -230,
									scaleX: 0.6,
									scaleY: 0.6,
									texture: 'popupRed',
									anchor: 0.5,
								},
							},
							{
								texture: 'ic_dialog_home',
								name: 'labelLogo',
								animations: {
									show: {
										setup: {
											alpha: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.4,
												scale: {
													x: 1.4,
													y: 1.4,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.2,
												scale: {
													x: 1,
													y: 1,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -235,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_dialog_wifi_off',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -235,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_dialog_wifi_off',
									anchor: 0.5,
								},
							},
							{
								name: 'title',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -50,
									width: 450,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.label.default,
									text: getTranslation('title', 'popupConnection'),
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
									y: -80,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -80,
									scaleX: 1,
									scaleY: 1,
								},
							},
							{
								name: 'description',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -60,
									width: 450,
									height: 120,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.description.default,
									text: getTranslation('description', 'popupConnection'),
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
									y: -0,
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
							{
								name: 'yesButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: -125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								portrait: {
									enableSceneObj: true,
									x: -125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.yes,
											text: getTranslation('yes', 'buttonText'),
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
								name: 'noButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: 125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								portrait: {
									x: 125,
									y: 130,
									scaleX: 0.9,
									scaleY: 0.9,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.no,
											text: getTranslation('no', 'buttonText'),
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
						],
					},
					{
						name: 'limit',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 500,
							scaleX: 1.4,
							scaleY: 1.4,
						},
						portrait: {
							x: 960,
							y: 400,
							scaleX: 1.7,
							scaleY: 1.7,
						},
						sceneObj: [
							{
								texture: 'dialog_bg',
								name: 'bg',
								type: core.display.KeyFrameSprite,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 0.7,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
							}, {
								texture: 'Red',
								name: 'labelBg',
								hasLoopAnim: true,
								animations: {
									show: {
										setup: {
											alpha: 1,
											rotation: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.3,
												scale: {
													x: 1,
													y: 1,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.3,
												scale: {
													x: 0.6,
													y: 0.6,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									loop: {
										loops: 0,
										setup: {
											alpha: 1,
											scale: {
												x: 0.6,
												y: 0.6,
											},
											rotation: 0,
										},
										this: [
											{
												duration: 0,
												rotation: 0,
											}, {
												duration: 6,
												rotation: 180 * (Math.PI / 180),
											}, {
												duration: 6,
												rotation: 360 * (Math.PI / 180),
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
											scale: {
												x: 0.6,
												y: 0.6,
											},
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												scale: {
													x: 0,
													y: 0,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -230,
									scaleX: 0.6,
									scaleY: 0.6,
									texture: 'popupRed',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -230,
									scaleX: 0.6,
									scaleY: 0.6,
									texture: 'popupRed',
									anchor: 0.5,
								},
							}, {
								texture: 'ic_dialog_purse',
								name: 'labelLogo',
								animations: {
									show: {
										setup: {
											alpha: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.4,
												scale: {
													x: 1.4,
													y: 1.4,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.2,
												scale: {
													x: 1,
													y: 1,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -235,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_dialog_purse',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -235,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_dialog_purse',
									anchor: 0.5,
								},
							}, {
								name: 'title',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -50,
									width: 450,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.label.default,
									text: getTranslation('title', 'popupLimits'),
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
									y: -80,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -80,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'description',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -30,
									width: 450,
									height: 60,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.description.default,
									text: getTranslation('description', 'popupLimits').min,
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
									y: -0,
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
								name: 'okButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: 0,
									y: 120,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 0.6,
									},
								},
								portrait: {
									x: 0,
									y: 120,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 0.6,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.ok,
											text: getTranslation('ok', 'buttonText'),
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
						],
					},
					{
						name: 'currency',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 550,
							scaleX: 1.4,
							scaleY: 1.4,
						},
						portrait: {
							x: 960,
							y: 400,
							scaleX: 1.7,
							scaleY: 1.7,
						},
						sceneObj: [
							{
								texture: 'dialog_bg',
								name: 'bg',
								type: core.display.KeyFrameSprite,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 1,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 0.7,
									scaleY: 1,
									texture: 'dialog_bg',
									anchor: 0.5,
								},
							}, {
								name: 'box',
								type: core.display.KeyFrameGraphics,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								landscape: {
									x: 0,
									y: -40,
									scaleX: 1,
									scaleY: 1,
									rectAlpha: 0.4,
									color: 0x000000,
									rect: {
										x: -240,
										y: -170,
										width: 480,
										height: 370,
									},
									pivotCenter: true,
								},
								portrait: {
									x: 0,
									y: -40,
									scaleX: 1,
									scaleY: 1,
									rectAlpha: 0.4,
									color: 0x000000,
									rect: {
										x: -240,
										y: -170,
										width: 480,
										height: 370,
									},
									pivotCenter: true,
								},
							}, {
								name: 'animateScroll',
								type: core.display.KeyFrameContainer,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
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
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								texture: 'Red',
								name: 'labelBg',
								hasLoopAnim: true,
								animations: {
									show: {
										setup: {
											alpha: 1,
											rotation: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.3,
												scale: {
													x: 0.6,
													y: 0.6,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.3,
												scale: {
													x: 0.4,
													y: 0.4,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									loop: {
										loops: 0,
										setup: {
											alpha: 1,
											scale: {
												x: 0.4,
												y: 0.4,
											},
											rotation: 0,
										},
										this: [
											{
												duration: 0,
												rotation: 0,
											}, {
												duration: 6,
												rotation: 180 * (Math.PI / 180),
											}, {
												duration: 6,
												rotation: 360 * (Math.PI / 180),
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
											scale: {
												x: 0.4,
												y: 0.4,
											},
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												scale: {
													x: 0,
													y: 0,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -330,
									scaleX: 0.4,
									scaleY: 0.4,
									texture: 'popupRed',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -330,
									scaleX: 0.4,
									scaleY: 0.4,
									texture: 'popupRed',
									anchor: 0.5,
								},
							}, {
								texture: 'ic_dialog_purse',
								name: 'labelLogo',
								animations: {
									show: {
										setup: {
											alpha: 0,
											scale: {
												x: 0,
												y: 0,
											},
										},
										this: [
											{
												duration: 0.4,
												scale: {
													x: 1,
													y: 1,
												},
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											}, {
												duration: 0.2,
												scale: {
													x: 0.5,
													y: 0.5,
												},
												ease: core.tween.Quad.easeOut,
											},
										],
									},
									hide: {
										setup: {
											scale: {
												x: 0.5,
												y: 0.5,
											},
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												scale: {
													x: 0,
													y: 0,
												},
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								type: core.display.KeyFrameSprite,
								landscape: {
									x: 0,
									y: -335,
									scaleX: 0.5,
									scaleY: 0.5,
									texture: 'ic_dialog_purse',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -335,
									scaleX: 0.5,
									scaleY: 0.5,
									texture: 'ic_dialog_purse',
									anchor: 0.5,
								},
							}, {
								name: 'title',
								type: core.display.KeyFrameTextDisplay,
								dimensions: {
									x: -225,
									y: -50,
									width: 450,
									height: 100,
								},
								debugShape: false,
								scaleDownToFit: true,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								paramText: {
									style: StyleText.popups.label.default,
									text: getTranslation('title', 'popupCurrency'),
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
									y: -240,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -240,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'yesButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: -125,
									y: 220,
									scaleX: 0.9,
									scaleY: 0.8,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								portrait: {
									enableSceneObj: true,
									x: -125,
									y: 220,
									scaleX: 0.9,
									scaleY: 0.8,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.yes,
											text: getTranslation('yes', 'buttonText'),
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
								name: 'noButton',
								type: core.display.Button,
								animations: {
									show: {
										setup: {
											alpha: 0,
										},
										this: [
											{
												duration: 0.6,
												alpha: 1,
												ease: core.tween.Quad.easeIn,
											},
										],
									},
									hide: {
										setup: {
											alpha: 1,
										},
										this: [
											{
												duration: 0.6,
												alpha: 0,
												ease: core.tween.Quad.easeOut,
											},
										],
									},
								},
								enableSceneObj: true,
								landscape: {
									x: 125,
									y: 220,
									scaleX: 0.9,
									scaleY: 0.8,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								portrait: {
									x: 125,
									y: 220,
									scaleX: 0.9,
									scaleY: 0.8,
									scales: {
										unpressed: 0.9,
										pressed: 0.8,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										type: core.display.KeyFrameSprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'btnPopup',
										},
									}, {
										name: 'text',
										hasLoopAnim: true,
										type: core.display.KeyFrameTextDisplay,
										animations: {
											show: {
												setup: {
													alpha: 0,
												},
												this: [
													{
														duration: 0.6,
														alpha: 1,
														ease: core.tween.Quad.easeIn,
													},
												],
											},
											loop: {
												setup: {
													scale: {
														x: 1,
														y: 1,
													},
												},
												loops: 0,
												this: [
													{
														duration: 0.4,
														scale: {
															x: 1.2,
															y: 1.2,
														},
														ease: core.tween.Sine.easeIn,
													}, {
														duration: 0.4,
														scale: {
															x: 1,
															y: 1,
														},
														ease: core.tween.Sine.easeOut,
													},
												],
											},
											hide: {
												setup: {
													alpha: 1,
												},
												this: [
													{
														duration: 0.6,
														alpha: 0,
														ease: core.tween.Quad.easeOut,
													},
												],
											},
										},
										dimensions: {
											x: -160,
											y: -50,
											width: 320,
											height: 100,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.buttonText.no,
											text: getTranslation('no', 'buttonText'),
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
						],
					},
				],
			},
		};
	}
	
	/**
	 * @getter
	 * popup paramaters
	 */
	get config() {
		return {
			key: 'popup',
			value: this._config.popup,
		};
	}
}
