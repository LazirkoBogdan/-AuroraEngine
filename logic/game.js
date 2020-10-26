import '../core/utils';
import Constants from './Constants';
import Core from '../core';

/**
 * Main Class
 * @exports Game
 */

export default class Game {
	/**
	 * Keep link on component Class
	 * @type {Object}
	 */
	component = {};
	
	/**
	 * Keep link on componets Classes
	 * @type {Object}
	 */
	components = {};
	
	/**
	 * Main Controller
	 * @type {*}
	 */
	mainController;
	
	/**
	 * Assets config
	 * @type {*}
	 */
	assetsConfig;
	
	/**
	 * screen getter
	 * @type {*}
	 */
	screen;
	
	/**
	 * Enviroment variables
	 * @type {*}
	 */
	env;
	
	/**
	 * Game model
	 * @type {*}
	 */
	model;
	
	/**
	 * assets Store
	 * @type {*}
	 */
	assetsStore;
	
	/**
	 * assets Loader
	 * @type {*}
	 */
	assetsPackLoader;
	
	/**
	 * Game Engine Main Constants
	 * @type {*}
	 */
	constants = Constants;
	
	/**
	 * Render
	 * @type {*}
	 */
	application;
	
	/**
	 * keep classes
	 * @type {*}
	 */
	src;
	
	/**
	 * Network sub controller
	 * @type {*}
	 */
	network;
	
	/**
	 * Config Manager
	 * @type {*}
	 */
	configManager;
	
	/**
	 * Response Manager
	 * @type {*}
	 */
	responseManager;
	
	/**
	 * style Text
	 * @type {*}
	 */
	styleText;
	
	/**
	 * style Text
	 * @type {*}
	 */
	htmlElement = {};
	
	isKeyboardHidden = true;
	
	isGameSleep = false;
	
	version = '0.0.0';
	
	constructor() {
		this.sendLogin   = () => {};
		this.isGameSleep = false;
		
	}
	
	/**
	 *@public
	 * The main function to start game
	 */
	start() {
		
		this.isGameLoading();
		
		this.loadingFinish = false;
		
		this.style = new this.styleText();
		
		this._getHTMLLogo();
		
		this.application = new core.engine.Application(game.constants.size.width, game.constants.size.height);
		
		this.responseManager = new core.manager.ResponseManager();
		
		this.env = new core.env();
		
			this.screen = {
				width: this.application.renderer.screen.width, height: this.application.renderer.screen.height,
			};
			
			this.model = new logic.model();
			
			this.httpRequest = new core.network.HttpRequest(this.env, this.responseManager, game.constants);
			
			this.network = new logic.fms.NetworkSubController(this.env, this.httpRequest);
			
			this.mainController = new logic.fms.MainController(this.model, this.responseManager);
			
			this.assetsStore = new core.loader.AssetsStore();
			
			this.assetsPackLoader = new core.loader.AssetsPackLoader(this.assetsStore, this.env);
			
			this.eventsManager = new core.events.EventManager();
			
			this.configManager = new core.manager.ConfigManager(this.model, this.assetsStore);
			
			this.assetsConfig = this.configManager.getAtlasConfig();
			
			this._showDebugElements();
			
			this.assetsPackLoader.loadFont(this.assetsConfig.font, () => {

					this.load();
				
				
			});
		
		var b = 3;
		for (var i = 0; i < 4; i++) {
			setTimeout(() => console.log(b), 100)
		}
		var b = 4;

		
	}
	

	
	load() {
		
				this.assetsPackLoader.loadManifest(() => {
					
					this.assetsStore.componentsConfig      = this.configManager.getConfigs();
					this.assetsStore.componentsResources   = this.configManager.getResources();
					this.assetsStore.componentsAtlasConfig = this.configManager.getAtlasConfig();
					
					this.createComponents();
					
					this.loadAllComponents(() => {
						this.application.scaleScene(true);
						this._disableHtmlLoader();
						
						this.mainController.showPreloader();
						core.needUpdateState = true;
						this.loadingFinish   = true;
						this.startMainController();
					});
				});

	}
	
	loadAllComponents(cb) {
		const components = this.componentsForLoading;
		
		this.loadComponentsResources(components, () => {
			cb();
		});
	}
	
	get componentsForLoading() {
		return Object.keys(this.assetsStore.componentsConfig.components).filter((name) => {
			let needToLoad = true;
			
			if (['hello'].includes(name)) {
				needToLoad = false;
			} else {
				const component = this.mainController.components[name.toLowerCase()];
				if (component) needToLoad = component.needToLoad;
			}
			
			return needToLoad;
		});
	}
	
	showPreloader(cb) {
		this.loadComponentsResources(['preloader'], () => {
			this.mainController.showPreloader();
			cb();
		});
	}
	
	// create component(classes only) with config and resources config
	createComponent(name, type, config, resources) {
		const component = this.component.manager.createComponent(name, type);
		component.component.create(config, resources);
		this.mainController.components[component.name] = component.component;
	}
	
	// initialize component with loaded resources
	initializeComponent(name, resources) {
		const component = this.component.manager.createdComponents[name.toLowerCase()];
		component.initialize(resources);
	}
	
	isGameLoading() {
		setTimeout(() => {
			if (this.loadingFinish) return;
			this.sendUserAlertMessage('An error occurred while retrieving data. Restart game');
		}, 20000);
	}
	
	sendUserAlertMessage(Message) {
		alert(Message);
	}
	
	createComponents() {
		Object.keys(this.assetsStore.componentsConfig.components).forEach((name) => {
			const componentConfig    = this.assetsStore.componentsConfig.components[name];
			const componentResources = this.assetsStore.componentsResources.components[name];
			
			this.createComponent(name, componentConfig.id, componentConfig.config, componentResources.resources);
		});
	}
	
	/**
	 *@public
	 * loadComponentsResources
   @param names string[]
   @param cb(CallBack)
	 */
	loadComponentsResources(names, cb) {
		const components = {};
		names.forEach((name) => {
			const component = this.mainController.components[name.toLowerCase()];
			if (component) components[name] = component.resourcesToLoad; else components[name] = this.assetsStore.componentsResources.components[name].resources;
		});
		
		this.assetsPackLoader.loadComponentResources(components, (componentsData) => {
			names.forEach((name) => this.initializeComponent(name, componentsData ? componentsData[name].resources : {}));
			cb();
		});
	}
	
	gameGoingSleep() {
		console.log('didEnterBackground');
		this.isGameSleep = true;
		core.bluerKeyboard();
		core.disableLoaderAfterResize = true;
		
		setTimeout(() => {
			core.disableLoaderAfterResize = false;
			this.application.scaleScene(true);
		}, 500);
		
	}
	
	/**
	 *@public
	 * web View update after sleep mode
	 */
	/**
	 *@public
	 * web View update after sleep mode
	 */
	updateGameAfterAppSleep() {
		console.log('willEnterForeground');
		this.isGameSleep              = false;
		core.disableLoaderAfterResize = true;
		core.orientationchange        = true;
		this.application.scaleScene(true);
		this.sendLogin();
		
		setTimeout(() => {
			this.application.scaleScene(true);
			core.buttonsAvailable = true;
			this.sendLogin        = () => {};
		}, 1200);
		
		setTimeout(() => {
			core.disableLoaderAfterResize = false;
			this.application.disableLoader();
		}, 2300);
		
	}
	
	/*
	 * Вызывается когда уже свернулось
	 */
	
	didEnterBackground() {
		console.log('didEnterBackground');
		this.isGameSleep = true;
		core.gameReturnFromSleep = true
		core.bluerKeyboard();
		core.disableLoaderAfterResize = true;
		this.application.enableLoader();
		//this.application.scaleScene(true);
	}
	
	/*
	 * Вызывается когда начинает разворачиваться
	 */
	
	willEnterForeground() {
		console.log('willEnterForeground');
		this.isGameSleep              = false;
		core.disableLoaderAfterResize = true;
		core.orientationchange        = true;
		this.application.enableLoader();
		this.sendLogin();
		
		core.gameReturnFromSleep = true
		core.buttonsAvailable = true;
		setTimeout(()=>{
			this.application.scaleScene(true);
			core.gameReturnFromSleep = false
			setTimeout(()=>{
				core.disableLoaderAfterResize = false;
				this.application.disableLoader();
			},1200)
		},2200)
		
		this.sendLogin = () => {};
		
	}
	
	/**
	 *@public
	 * show Home Popup
	 */
	showHomePopup() {
		this.mainController.showHomePopup();
	}
	
	/**
	 *@public
	 * load Assets
	 */
	loadAssets() {
		this.assetsPackLoader.loadSpineAtlas(this.assetsConfig.preloader, () => {
			
			this._createComponent(this.configManager.getPreloaderConfig(), 'preloader');
			
			this.network.getStatus(() => {
				
				this.style.loadStyle();
				
				Promise.all([this.network.getLimits(), this.network.getUserBalance(), this.network.getTranslations()]).then(results => {
					
					this.model.updateLimits();
					this.configManager.buildConfigs();
					
					this.assetsPackLoader.loadSimpleAtlas(this.assetsConfig.atlases, () => {
						this.assetsPackLoader.loadMultiSpineAtlas(this.assetsConfig.spine, () => {
							this._createAllComponents(this.configManager.configs, () => {
								
								this.application.scaleScene(true);
								this._disableHtmlLoader();
								this.mainController.showPreloader();
								this.loadingFinish = true;
								
								this.startMainController();
							});
						});
					});
				});
			});
		});
	}
	
	/**
	 *@public
	 * web View messege Test
	 */
	webViewTest(...rest) {
		console.log(...rest);
	}
	
	/**
	 *@public
	 * Get Texture from atlas
	 */
	getTexture(name) {
		if (this.assetsStore.texture[name]) return this.assetsStore.texture[name];
	}
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	getSpine(name) {
		if (this.assetsStore.spine[name]) return this.assetsStore.spine[name];
	}
	
	/**
	 *@public
	 * Start Main Controller
	 */
	startMainController() {
		this.application.updateMainContainer();
		setTimeout(() => {
			this.mainController.hidePreloader();
		}, 2000);
		
		this.mainController.start(this);
	}
	
	internetConnectionLost() {
		this.isInternetConnectionLost = true;
		core.buttonsAvailable         = false;
		this.mainController.hidePopups(() => {
			this.mainController.showConnectionPopup();
			core.buttonsAvailable = true;
		});
		
	}
	
	/**
	 *@public
	 * setCutouts for android
	 */
	setCutouts(left, top, right, bottom) {
		this.application.updateViewAndroid(Number.parseInt(top, 10));
	}
	
	/**
	 *@public
	 * keyboardHidden
	 */
	keyboardHidden() {
		if (this.isKeyboardHidden) return;
		this.isKeyboardHidden = true;
		core.bluerKeyboard();
		setTimeout(() => {
			this.isKeyboardHidden = false;
		}, 1000);
		
	}
	
	testBackground() {
		this.updateGameAfterAppSleep();
		this.internetConnectionLost();
	}
	
	/**
	 *@private
	 * create all component from config
	 */
	//TODO: add call back main controller
	_createAllComponents(config, cb) {
		const componentsType = config.componentsType;
		
		componentsType.forEach((usingComponents, i) => {
			
			this._createComponent(config, usingComponents);
			if (componentsType.last === usingComponents) {
				if (cb) cb();
			}
			this.mainController.components.preloader.moveTop();
			
		});
	}
	
	/**
	 *@private
	 * create  component from config
	 */
	_createComponent(config, usingComponents) {
		const componentManager = this.component.manager;
		const api              = logic.components[usingComponents];
		const id               = config[usingComponents].id;
		const type             = config[usingComponents].type;
		
		componentManager.registerComponents(this, id, api);
		
		const component = this.component.manager.createComponent(this, id, type);
		component.component.create(config[usingComponents].config, null);
		component.component.initialize();
		
		this.mainController.components[type] = component.component;
	}
	
	/**
	 *@private
	 * show Debug Elements
	 */
	_showDebugElements() {
		this.application.version = game.version;
		this.application.createVersion();
		if (this.env.debug === 'show') {
			this.application.createFPSMeter();
		}
	}
	
	/**
	 *@private
	 * Get HTML Logo
	 */
	_getHTMLLogo() {
		this.logo        = document.getElementById('logo');
		this.logoLoading = document.getElementById('loading');
		
		this.htmlElement.logoIcon = document.getElementById('logoOrientation');
		
		this.htmlElement.iconBG = document.getElementById('iconBG');
		
	}
	
	/**
	 * @private
	 * disable Html Loader
	 */
	_disableHtmlLoader() {
		this.logo.style.display               = 'none';
		this.logoLoading.style.display        = 'none';
		this.htmlElement.iconBG.style.display = 'none';
	}
	
}

window.game = new Game();
