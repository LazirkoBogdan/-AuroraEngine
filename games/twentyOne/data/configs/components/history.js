export default class History extends core.manager.Config {
	constructor(model, textures) {
		super(model, textures);
		this.createConfig();
	}
	
	/**
	 * @public
	 * create config for BGTop
	 */
	createConfig() {
		const fieldStyle       = new PIXI.TextStyle({
			fill: '#274024',
			fontFamily: 'NotoSans-Bold',
			fontSize: 35,
			strokeThickness: 0.5,
		});
		const fieldLabel       = new PIXI.TextStyle({
			fill: '#cdcdcd',
			fontWeight: 'bold',
			wordWrapWidth: 80,
			fontFamily: 'NotoSans-Bold',
			fontSize: 60,
			strokeThickness: 1,
			dropShadow: true,
			dropShadowAlpha: 0.4,
			dropShadowBlur: 4,
			dropShadowDistance: 6,
		});
		const labelDescription = new PIXI.TextStyle({
			fill: '#ffffff',
			fontFamily: 'NotoSans-Bold',
			fontSize: 30,
		});
		const labelBoardStyle  = new PIXI.TextStyle({
			fill: '#dedede',
			fontFamily: 'NotoSans-Bold',
			fontWeight: 'Bold',
			fontSize: 25,
			strokeThickness: 0.5,
		});
		const filterChipStyle  = new PIXI.TextStyle({
			fill: '#dedede',
			fontFamily: 'NotoSans-Bold',
			fontWeight: 'Bold',
			fontSize: 50,
			strokeThickness: 0.5,
		});
		
		const noHistoryStyle = new PIXI.TextStyle({
			fill: '#13503A',
			fontFamily: 'NotoSans-Bold',
			fontSize: 100,
			strokeThickness: 1,
		});
		
		let a               = 'There are no results of the game \n     for this period of time';
		const dataNow       = new Date();
		const dataYesterday = new Date();
		dataYesterday.setDate(dataNow.getDate() - 1);
		const translation    = this._model.libary.translation;
		const getTranslation = core.getTranslation(name,block)
		
		this._config.history = {
			id: 'History',
			type: 'history',
			config: {
				visible: false,
				needMask: false,
				parentGroup: 'DEFAULT',
				testText: {
					on: false,
					text: 'menu component',
				},
				maskHistoryField: {
					landscape: {
						x: 960,
						y: 300,
						scaleX: 1,
						scaleY: 1,
					},
					portrait: {
						x: 960,
						y: -100,
						scaleX: 0.9,
						scaleY: 0.9,
					},
				},
				sceneObj: [
					{
						texture: 'BG',
						width: 1920 * 2,
						height: 1920 * 2,
						name: 'bg',
						type: core.display.TilingSprite,
						landscape: {
							x: -250,
							y: -1000,
							scaleX: 1,
							scaleY: 1,
							texture: 'BG',
						},
						portrait: {
							x: 0,
							y: -1000,
							scaleX: 1,
							scaleY: 1,
							texture: 'BG',
						},
					}, {
						name: 'glow',
						type: core.display.Sprite,
						blendMode: 'SOFT_LIGHT',
						texture: 'soft_light_landscape_bg',
						landscape: {
							x: 0,
							y: -100,
							scaleX: 1.5,
							scaleY: 1.5,
							alpha: 0.2,
							anchor: 0.5,
							blendMode: 'ADD',
							texture: 'soft_light_landscape_bg',
							responsivePosition: {
								position: 'center',
							},
						},
						portrait: {
							x: 0,
							y: 0,
							scaleX: 1.5,
							scaleY: 1.5,
							alpha: 0.2,
							anchor: 0.5,
							blendMode: 'ADD',
							texture: 'soft_light_portret_bg',
							responsivePosition: {
								position: 'center',
							},
						},
					}, {
						name: 'back',
						type: core.display.Button,
						enableSceneObj: true,
						landscape: {
							x: 80,
							y: 6,
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
						portrait: {
							x: 500,
							y: 6,
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
									texture: 'ic_back',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -7,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_back',
									anchor: 0.5,
								},
							},
						],
					}, {
						name: 'filter',
						type: core.display.Button,
						enableSceneObj: true,
						landscape: {
							x: 1840,
							y: 6,
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
						portrait: {
							x: 1430,
							y: 6,
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
									texture: 'ic_filter',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -7,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_filter',
									anchor: 0.5,
								},
							},
						],
					}, {
						name: 'filterField',
						enableSceneObj: true,
						type: core.display.SceneObject,
						landscape: {
							x: 200,
							y: 50,
							alpha: 0,
							changeAlpha: 1,
							scaleX: 1,
							scaleY: 1,
							responsivePosition: {
								position: 'top',
							},
						},
						portrait: {
							x: 600,
							y: 200,
							alpha: 0,
							changeAlpha: 1,
							scaleX: 0.8,
							scaleY: 0.8,
							responsivePosition: {
								position: 'top',
							},
						},
						sceneObj: [
							{
								name: 'weekFilter',
								enableSceneObj: true,
								type: core.display.Button,
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
									scales: {
										unpressed: 1,
										pressed: 1.2,
									},
								},
								sceneObj: [
									{
										name: 'selector',
										type: core.display.Graphics,
										landscape: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											alpha: 1,
											rectAlpha: 0.3,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
										portrait: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											alpha: 1,
											rectAlpha: 0.3,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
									},
									{
										name: 'bgFilter',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Red',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Red',
										},
									}, {
										name: 'logo',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_one_week',
											anchor: 0.5,
										},
										portrait: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_one_week',
											anchor: 0.5,
										},
									}, {
										name: 'title',
										type: core.display.DisplayText,
										dimensions: {
											x: -150,
											y: -45,
											width: 300,
											height: 90,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: filterChipStyle,
											disable: true,
											text: core.getTranslation('filterWeek', 'historyMenu'),
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
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
									}, {
										name: 'descriptions',
										type: core.display.DisplayText,
										dimensions: {
											x: -125,
											y: -25,
											width: 250,
											height: 50,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: labelDescription,
											disable: true,
											text: '10.05.2020 - 20.05.20',
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
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
									},
								],
							}, {
								name: 'twoWeekFilter',
								enableSceneObj: true,
								type: core.display.Button,
								landscape: {
									x: 0,
									y: 250,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 250,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.2,
									},
								},
								sceneObj: [
									{
										name: 'selector',
										type: core.display.Graphics,
										landscape: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											alpha: 1,
											rectAlpha: 0.3,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
										portrait: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											rectAlpha: 0.3,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
									}, {
										name: 'bgFilter',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Green',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Green',
										},
									}, {
										name: 'logo',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_two_week',
											anchor: 0.5,
										},
										portrait: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_dialog_purse',
											anchor: 0.5,
										},
									}, {
										name: 'title',
										type: core.display.DisplayText,
										dimensions: {
											x: -150,
											y: -45,
											width: 300,
											height: 90,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: filterChipStyle,
											disable: true,
											text: core.getTranslation('filterTwoWeek', 'historyMenu'),
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
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
									}, {
										name: 'descriptions',
										type: core.display.DisplayText,
										dimensions: {
											x: -125,
											y: -25,
											width: 250,
											height: 50,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: labelDescription,
											disable: true,
											text: '10.05.2020 - 20.05.20',
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
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
									},
								],
							}, {
								name: 'filterMonth',
								enableSceneObj: true,
								type: core.display.Button,
								landscape: {
									x: 1160,
									y: 0,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 600,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.2,
									},
								},
								sceneObj: [
									{
										name: 'selector',
										type: core.display.Graphics,
										landscape: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											alpha: 1,
											rectAlpha: 0.3,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
										portrait: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											alpha: 1,
											rectAlpha: 0.3,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
									}, {
										name: 'bgFilter',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Lilov',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Lilov',
										},
									}, {
										name: 'logo',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_month',
											anchor: 0.5,
										},
										portrait: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_month',
											anchor: 0.5,
										},
									}, {
										name: 'title',
										type: core.display.DisplayText,
										dimensions: {
											x: -150,
											y: -45,
											width: 300,
											height: 90,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: filterChipStyle,
											disable: true,
											text: core.getTranslation('filterMonth', 'historyMenu'),
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
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
									}, {
										name: 'descriptions',
										type: core.display.DisplayText,
										dimensions: {
											x: -125,
											y: -25,
											width: 250,
											height: 50,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: labelDescription,
											disable: true,
											text: '10.05.2020 - 20.05.20',
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
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
									},
								],
							}, {
								name: 'filterSet',
								enableSceneObj: true,
								type: core.display.Button,
								landscape: {
									x: 1160,
									y: 250,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.2,
									},
								},
								portrait: {
									x: 600,
									y: 250,
									scaleX: 1,
									scaleY: 1,
									scales: {
										unpressed: 1,
										pressed: 1.2,
									},
								},
								sceneObj: [
									{
										name: 'selector',
										type: core.display.Graphics,
										landscape: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											rectAlpha: 0.3,
											alpha: 1,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
										portrait: {
											x: 160,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											rectAlpha: 0.3,
											alpha: 1,
											color: 0x000000,
											rect: {
												x: -250,
												y: -80,
												width: 500,
												height: 180,
											},
										},
									}, {
										name: 'bgFilter',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Orange',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 0.5,
											scaleY: 0.5,
											anchor: 0.5,
											texture: 'Orange',
										},
									}, {
										name: 'logo',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_set_period',
											anchor: 0.5,
										},
										portrait: {
											x: 0,
											y: -10,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_set_period',
											anchor: 0.5,
										},
									}, {
										name: 'title',
										type: core.display.DisplayText,
										dimensions: {
											x: -150,
											y: -45,
											width: 300,
											height: 90,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: filterChipStyle,
											disable: true,
											text: core.getTranslation('filterPeriod', 'historyMenu'),
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
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 250,
											y: -30,
											scaleX: 1,
											scaleY: 1,
										},
									}, {
										name: 'descriptions',
										type: core.display.DisplayText,
										dimensions: {
											x: -125,
											y: -25,
											width: 250,
											height: 50,
										},
										debugShape: false,
										scaleDownToFit: true,
										hAlign: 1,
										vAlign: 0,
										paramText: {
											style: labelDescription,
											disable: true,
											text: '10.05.2020 - 20.05.20',
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
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
										portrait: {
											x: 225,
											y: 15,
											scaleX: 1,
											scaleY: 1,
										},
									},
								],
							},
						],
					}, {
						name: 'boardHistory',
						enableSceneObj: false,
						scrollConfig: {
							x: 0,
							y: 0,
							rect: new PIXI.Rectangle(-1800 / 2, 80, 1750, 700),
							height: 0,
							itemHeight: 15,
							landscape: {
								x: 0,
								y: 0,
								rect: new PIXI.Rectangle(-1800 / 2, 80, 1750, 700),
								height: -20,
								itemHeight: 100,
							},
							portrait: {
								x: 0,
								y: 0,
								rect: new PIXI.Rectangle(-1800 / 2, 80, 1750, 980),
								height: -20,
								itemHeight: 30,
							},
						},
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 250,
							scaleX: 1,
							scaleY: 1,
							changePosX: 0,
							changePosY: 500,
							
						},
						portrait: {
							x: 960,
							y: -50,
							scaleX: 1.1,
							scaleY: 1.1,
							changePosX: 0,
							changePosY: 500,
						},
						sceneObj: [
							{
								name: 'bg',
								type: core.display.Graphics,
								landscape: {
									x: 0,
									y: 385,
									scaleX: 1,
									scaleY: 1,
									rectAlpha: 0.5,
									color: 0x000000,
									rect: {
										x: -900,
										y: -400,
										width: 1800,
										height: 800,
									},
									pivotCenter: true,
								},
								portrait: {
									x: 0,
									y: 585,
									scaleX: 1,
									scaleY: 1,
									rectAlpha: 0.5,
									color: 0x000000,
									rect: {
										x: -490,
										y: -540,
										width: 980,
										height: 1080,
									},
									pivotCenter: true,
								},
							}, {
								name: 'labelBG',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									anchor: 0.5,
									scaleX: 1,
									scaleY: 1,
									texture: 'landscape_results_BG',
								},
								portrait: {
									x: 0,
									y: 0,
									anchor: 0.5,
									scaleX: 1,
									scaleY: 1,
									texture: 'portret_results_BG',
								},
							}, {
								name: 'gameID',
								type: core.display.DisplayText,
								dimensions: {
									x: -60,
									y: -45,
									width: 120,
									height: 90,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: labelBoardStyle,
									text: core.getTranslation('gameID', 'historyMenu'),
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
									x: -770,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -110,
										y: -60,
										width: 220,
										height: 120,
									},
								},
								portrait: {
									x: -400,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -60,
										y: -45,
										width: 120,
										height: 90,
									},
								},
							}, {
								name: 'time',
								type: core.display.DisplayText,
								dimensions: {
									x: -125,
									y: -60,
									width: 250,
									height: 120,
								},
								scaleDownToFit: true,
								paramText: {
									style: labelBoardStyle,
									text: core.getTranslation('timeTitle', 'historyMenu'),
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
									x: -490,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -110,
										y: -60,
										width: 220,
										height: 120,
									},
								},
								portrait: {
									x: -260,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -60,
										y: -45,
										width: 120,
										height: 90,
									},
								},
							}, {
								name: 'playerBet',
								type: core.display.DisplayText,
								dimensions: {
									x: -60,
									y: -45,
									width: 120,
									height: 90,
								},
								debugShape: false,
								hAlign: 0,
								vAlign: 0,
								scaleDownToFit: true,
								paramText: {
									style: labelBoardStyle,
									text: core.getTranslation('playerBet', 'historyMenu'),
									landscape: {
										x: 0,
										y: 0,
										updateText: true,
										text: core.getTranslation('playerBet', 'historyMenu'),
									},
									portrait: {
										x: 0,
										y: 0,
										updateText: true,
										text: core.getTranslation('playerBetPortrait', 'historyMenu'),
									},
								},
								landscape: {
									x: -170,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -110,
										y: -60,
										width: 220,
										height: 120,
									},
								},
								portrait: {
									x: -70,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -60,
										y: -45,
										width: 120,
										height: 90,
									},
								},
							}, {
								name: 'playerCards',
								type: core.display.DisplayText,
								dimensions: {
									x: -80,
									y: -45,
									width: 160,
									height: 90,
								},
								debugShape: false,
								updateText: true,
								scaleDownToFit: true,
								paramText: {
									style: labelBoardStyle,
									text: core.getTranslation('playerCards', 'historyMenu'),
									landscape: {
										updateText: true,
										text: core.getTranslation('playerCards', 'historyMenu'),
										x: 0,
										y: 0,
									},
									portrait: {
										updateText: true,
										text: core.getTranslation('playerCardsPortrait', 'historyMenu'),
										x: 0,
										y: 0,
									},
								},
								landscape: {
									x: 150,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -110,
										y: -60,
										width: 220,
										height: 120,
									},
								},
								portrait: {
									x: 90,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -60,
										y: -45,
										width: 120,
										height: 90,
									},
								},
							}, {
								
								name: 'dealerCards',
								type: core.display.DisplayText,
								dimensions: {
									x: -80,
									y: -45,
									width: 160,
									height: 90,
								},
								debugShape: false,
								updateText: true,
								scaleDownToFit: true,
								paramText: {
									style: labelBoardStyle,
									updateText: true,
									text: core.getTranslation('dealerCards', 'historyMenu'),
									landscape: {
										x: 0,
										y: 0,
										updateText: true,
										text: core.getTranslation('dealerCards', 'historyMenu'),
									},
									portrait: {
										x: 0,
										y: 0,
										updateText: true,
										text: core.getTranslation('DealerPortrait', 'historyMenu'),
									},
								},
								landscape: {
									x: 450,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -110,
										y: -60,
										width: 220,
										height: 120,
									},
								},
								portrait: {
									x: 250,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -60,
										y: -45,
										width: 120,
										height: 90,
									},
								},
							}, {
								name: 'gameResult',
								type: core.display.DisplayText,
								dimensions: {
									x: -85,
									y: -45,
									width: 170,
									height: 90,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: labelBoardStyle,
									text: '',
									landscape: {
										x: 0,
										y: 0,
										updateText: true,
										text: core.getTranslation('gameResult', 'historyMenu'),
									},
									
									portrait: {
										x: 0,
										y: 0,
										updateText: true,
										text: core.getTranslation('gameResultPortrait', 'historyMenu'),
									},
								},
								landscape: {
									x: 750,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -110,
										y: -60,
										width: 220,
										height: 120,
									},
								},
								portrait: {
									x: 400,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									dimensions: {
										x: -60,
										y: -45,
										width: 120,
										height: 90,
									},
								},
							}, {
								name: 'chipLoader',
								type: core.display.Spine,
								animations: {
									show: {
										name: 'show',
										loop: true,
									},
								},
								landscape: {
									x: 0,
									y: 400,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: 500,
									scaleX: 1,
									scaleY: 1,
								},
							}, {
								name: 'logoEmpty',
								type: core.display.SceneObject,
								landscape: {
									x: 0,
									y: -200,
									scaleX: 1,
									scaleY: 1,
									responsivePosition: {
										position: 'top',
									},
								},
								portrait: {
									x: 0,
									y: 0,
									scaleX: 1.1,
									scaleY: 1.1,
									responsivePosition: {
										position: 'top',
									},
								},
								sceneObj: [
									{
										name: 'logo',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 200,
											anchor: 0.5,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_no_found',
										},
										portrait: {
											x: 0,
											y: 400,
											anchor: 0.5,
											scaleX: 1,
											scaleY: 1,
											texture: 'ic_no_found',
										},
									}, {
										name: 'logoText',
										type: core.display.DisplayText,
										dimensions: {
											x: -1000,
											y: -1000,
											width: 2000,
											height: 2000,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: noHistoryStyle,
											text: core.getTranslation('noPeriod', 'historyMenu'),
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
											y: 400,
											scaleX: 1,
											scaleY: 1,
											dimensions: {
												x: -500,
												y: -200,
												width: 1000,
												height: 400,
											},
										},
										portrait: {
											x: 0,
											y: 600,
											scaleX: 1,
											scaleY: 1,
											dimensions: {
												x: -400,
												y: -100,
												width: 800,
												height: 200,
											},
										},
									},
								],
							},
						],
					}, {
						name: 'titleMenu',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 0,
							scaleX: 1,
							scaleY: 1,
						},
						portrait: {
							x: 960,
							y: 0,
							scaleX: 1,
							scaleY: 1,
						},
						sceneObj: [
							{
								name: 'labelText',
								type: core.display.DisplayText,
								dimensions: {
									x: -300,
									y: -45,
									width: 600,
									height: 90,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									style: fieldLabel,
									text: core.getTranslation('title', 'historyMenu'),
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
									y: 30,
									scaleX: 1,
									scaleY: 1,
									responsivePosition: {
										position: 'top',
									},
								},
								portrait: {
									x: 0,
									y: 30,
									scaleX: 1,
									scaleY: 1,
									responsivePosition: {
										position: 'top',
									},
								},
							}, {
								name: 'description',
								type: core.display.DisplayText,
								dimensions: {
									x: -225,
									y: -25,
									width: 450,
									height: 50,
								},
								debugShape: false,
								scaleDownToFit: true,
								paramText: {
									disable: true,
									style: labelDescription,
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
									y: 125,
									scaleX: 1,
									scaleY: 1,
									alpha: 0.5,
									responsivePosition: {
										position: 'top',
									},
								},
								portrait: {
									x: 0,
									y: 125,
									scaleX: 1,
									scaleY: 1,
									alpha: 0.5,
									responsivePosition: {
										position: 'top',
									},
								},
							},
						],
					}, {
						name: 'bgPopup',
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
								type: core.display.Graphics,
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
								},
							}, {
								name: 'shine',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: 0,
									scaleX: 1.1,
									scaleY: 1.1,
									blendMode: 'SOFT_LIGHT',
									alpha: 0.3,
									texture: 'dialog_shine',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -100,
									scaleX: 1.1,
									scaleY: 1.1,
									blendMode: 'SOFT_LIGHT',
									alpha: 0.3,
									texture: 'dialog_shine',
									anchor: 0.5,
								},
							},
						],
					}, {
						name: 'SetPeriodPopup',
						type: core.display.SceneObject,
						landscape: {
							x: 960,
							y: 500,
							scaleX: 1,
							scaleY: 1,
						},
						portrait: {
							x: 960,
							y: 400,
							scaleX: 1.5,
							scaleY: 1.5,
						},
						sceneObj: [
							{
								name: 'bgHomePopup',
								type: core.display.Sprite,
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
								name: 'topLabelBg',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: -255,
									scaleX: 0.5,
									scaleY: 0.5,
									texture: 'Orange',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -255,
									scaleX: 0.5,
									scaleY: 0.5,
									anchor: 0.5,
									texture: 'Orange',
								},
							}, {
								texture: 'ic_dialog_home',
								name: 'topLabelLogo',
								type: core.display.Sprite,
								landscape: {
									x: 0,
									y: -260,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_set_period',
									anchor: 0.5,
								},
								portrait: {
									x: 0,
									y: -260,
									scaleX: 1,
									scaleY: 1,
									texture: 'ic_set_period',
									anchor: 0.5,
								},
							}, {
								name: 'title',
								type: core.display.SceneObject,
								landscape: {
									x: 0,
									y: -145,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: 0,
									y: -145,
									scaleX: 1,
									scaleY: 1,
								},
								sceneObj: [
									{
										name: 'text',
										type: core.display.DisplayText,
										dimensions: {
											x: -225,
											y: -30,
											width: 450,
											height: 60,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.label.default,
											text: core.getTranslation('filterPeriod', 'historyMenu'),
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
								name: 'iconCalendarOne',
								type: core.display.Sprite,
								landscape: {
									x: -150,
									y: -65,
									scaleX: 0.8,
									scaleY: 0.8,
									texture: 'ic_line',
									anchor: 0.5,
								},
								portrait: {
									x: -150,
									y: -65,
									scaleX: 0.8,
									scaleY: 0.8,
									texture: 'ic_line',
									anchor: 0.5,
								},
							}, {
								texture: 'ic_line',
								name: 'iconCalendarTwo',
								type: core.display.Sprite,
								landscape: {
									x: -150,
									y: 20,
									scaleX: 0.8,
									scaleY: 0.8,
									texture: 'ic_line',
									anchor: 0.5,
								},
								portrait: {
									x: -150,
									y: 20,
									scaleX: 0.8,
									scaleY: 0.8,
									texture: 'ic_line',
									anchor: 0.5,
								},
							}, {
								name: 'dataOneText',
								enableSceneObj: true,
								type: core.display.Button,
								landscape: {
									x: -20,
									y: -65,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: -20,
									y: -65,
									scaleX: 1,
									scaleY: 1,
								},
								sceneObj: [
									{
										name: 'text',
										type: core.display.DisplayText,
										dimensions: {
											x: -100,
											y: -20,
											width: 200,
											height: 40,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.description.default,
											disable: true,
											text: dataYesterday.toLocaleDateString('en-US'),
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
										name: 'calendarInput',
										textType: 'number',
										
										type: core.display.CalendarInput,
										style: {
											input: {
												fontFamily: 'Noto Sans SC',
												fontSize: '30px',
												padding: '12px',
												width: '200px',
												textAlign: 'center',
												color: '#FFFFFF',
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
							}, {
								name: 'dataTwoText',
								enableSceneObj: true,
								type: core.display.Button,
								landscape: {
									x: -20,
									y: 20,
									scaleX: 1,
									scaleY: 1,
								},
								portrait: {
									x: -20,
									y: 20,
									scaleX: 1,
									scaleY: 1,
								},
								sceneObj: [
									{
										name: 'text',
										type: core.display.DisplayText,
										dimensions: {
											x: -100,
											y: -20,
											width: 200,
											height: 40,
										},
										debugShape: false,
										scaleDownToFit: true,
										paramText: {
											style: StyleText.popups.description.default,
											disable: true,
											text: dataNow.toLocaleDateString('en-US'),
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
										name: 'calendarInput',
										textType: 'number',
										
										type: core.display.CalendarInput,
										style: {
											input: {
												fontFamily: 'Noto Sans SC',
												fontSize: '30px',
												padding: '12px',
												width: '200px',
												textAlign: 'center',
												color: '#FFFFFF',
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
							}, {
								name: 'yesButton',
								type: core.display.Button,
								enableSceneObj: true,
								landscape: {
									x: -125,
									y: 140,
									scaleX: 0.5,
									scaleY: 0.5,
									scales: {
										unpressed: 0.5,
										pressed: 0.7,
									},
								},
								portrait: {
									enableSceneObj: true,
									x: -125,
									y: 140,
									scaleX: 0.5,
									scaleY: 0.5,
									scales: {
										unpressed: 0.5,
										pressed: 0.7,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'BTN_Pressed_Brown_Light',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											anchor: 0.5,
											scaleY: 1,
											texture: 'BTN_Pressed_Brown_Light',
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
											style: StyleText.popups.buttonText.yes,
											text: core.getTranslation('yes', 'buttonText'),
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
								enableSceneObj: true,
								landscape: {
									x: 125,
									y: 140,
									scaleX: 0.5,
									scaleY: 0.5,
									scales: {
										unpressed: 0.5,
										pressed: 0.7,
									},
								},
								portrait: {
									x: 125,
									y: 140,
									scaleX: 0.5,
									scaleY: 0.5,
									scales: {
										unpressed: 0.5,
										pressed: 0.7,
									},
								},
								sceneObj: [
									{
										name: 'buttonSprite',
										type: core.display.Sprite,
										landscape: {
											x: 0,
											y: 0,
											scaleX: 1,
											scaleY: 1,
											anchor: 0.5,
											texture: 'BTN_Pressed_Brown_Light',
										},
										portrait: {
											x: 0,
											y: 0,
											scaleX: 1,
											anchor: 0.5,
											scaleY: 1,
											texture: 'BTN_Pressed_Brown_Light',
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
											style: StyleText.popups.buttonText.yes,
											text: core.getTranslation('no', 'buttonText'),
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
	 * bgTop paramaters
	 */
	get config() {
		return {
			key: 'history',
			value: this._config.history,
		};
	}
}
