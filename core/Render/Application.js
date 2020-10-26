/**
 * Application.js
 * main render Application
 * @Class Application
 * @extends PIXI.Application
 * @param width
 * @param height
 */

export default class Application extends PIXI.Application {
	stage;
	
	mainContainer;
	
	scaleRatio = 1;
	
	faceID = false;
	
	orientation = '';
	previouslyOrintation = ''
	
	isGameResize = false;
	
	_viewPortAtr = 'viewport-fit=cover, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1,height=device-height,width=device-width,minimal-ui';
	
	constructor(width, height) {
		super({
			width,
			height,
			forceCanvas: false,
			transparent: false,
			backgroundColor: '#000000',
			view: document.getElementById('app-canvas'),
			resolution: window.devicePixelRatio,
		});
		
		this.stage         = new PIXI.Container();
		this.mainContainer = new core.display.ResizeContainer();
		this.stage.addChild(this.mainContainer);
		
		this.renderer.plugins.interaction.autoPreventDefault = true;
		this.renderer.plugins.interaction.moveWhenInside     = true;
		this.renderer.view.style.touchAction                 = 'auto';
		
			 window.addEventListener('orientationchange', () => {
					 core.needUpdateState = false;
						 this.scaleScene(true);
			
			 });
			window.addEventListener('resize', () => {
				core.needUpdateState = false;
				this.scaleScene(true);
			});
			const isIphoneFaceID = core.getIPhoneModel();
			this.updateViewPort(isIphoneFaceID);
	}
	
	updateViewPort(iphoneFaceID) {
		let output = '';
		for (let prop in iphoneFaceID) {
			if (iphoneFaceID.hasOwnProperty(prop)) output += prop + ': ' + iphoneFaceID[prop] + '; ';
		}
		
		if (iphoneFaceID.faceID) {
			const viewport = document.querySelector('meta[name=viewport]');
			viewport.setAttribute('content', this._viewPortAtr);
			this.faceID                    = true;
			game.constants.size.topOffsets = 120;
		} else {
			this.scaleScene();
		}
	}
	
	updateViewAndroid(top) {
		
		const viewport = document.querySelector('meta[name=viewport]');
		viewport.setAttribute('content', this._viewPortAtr);
		this.faceID                    = true;
		game.constants.size.topOffsets = top;
		
		this.scaleScene();
	}
	
	scaleScene() {
		const isMobile                = core.isMobile();
		game.constants.size.isDesktop = !isMobile;
		
		const orientation = core.getOrientation() ? "portrait" : "landscape";
		
		if (game.loadingFinish) {
			this.enableLoader();
		}
		
		const resize = ()=>{

			const renderer       = this.renderer;
			const sceneContainer = this.mainContainer;
			const gameWidth      = game.constants.size.width;
			const gameHeight     = game.constants.size.height;
			
			core.scaleDown = game.constants.size.scaleDownAssets;
			
			const gameOrientation  = this.previouslyOrintation  = gameWidth > gameHeight ? 'landscape' : 'portrait';
			const gameLandscapeScreenRatio = gameWidth / gameHeight;
			const gamePortraitScreenRatio  = gameHeight / gameWidth;
			const isScreenPortrait         = window.innerHeight >= window.innerWidth;
			const isScreenLandscape        = !isScreenPortrait;
			const screenRatio              = window.innerWidth / window.innerHeight;
			
			let newWidth;
			let newHeight;
			
			if ((gameOrientation === 'landscape' && isScreenLandscape) || (gameOrientation === 'portrait' && isScreenPortrait)) {
				if (screenRatio < gameLandscapeScreenRatio) {
					newWidth  = gameWidth;
					newHeight = Math.round(gameWidth / screenRatio);
				} else {
					newWidth  = Math.round(gameHeight * screenRatio);
					newHeight = gameHeight;
				}
			} else {
				if (screenRatio < gamePortraitScreenRatio) {
					newWidth  = gameHeight;
					newHeight = Math.round(gameHeight / screenRatio);
				} else {
					newWidth  = Math.round(gameWidth * screenRatio);
					newHeight = gameWidth;
				}
			}
			
			
			if (window.webkit && window.webkit.messageHandlers.callbackHandler) {
				if (gameOrientation === 'landscape' && isScreenLandscape) {
					document.body.style.height = '100vh';
					document.body.style.width  = '100vw';
				} else {
					document.body.style.height = '100vh';
					document.body.style.width  = '100vw';
				}
				document.body.style.padding = '0';
				document.body.style.margin  = '0';
				
				renderer.view.style.height = window.innerHeight + 'px';
				renderer.view.style.width  = window.innerWidth + 'px';
				
			} else {
				
				document.body.style.padding = '0';
				document.body.style.margin  = '0';
				
				renderer.view.style.height = document.body.style.height + 'px';
				renderer.view.style.width  = document.body.style.width + 'px';
			}
			
			renderer.resize(newWidth, newHeight);
			
			sceneContainer.x = ((newWidth) - gameWidth) / 2;
			sceneContainer.y = ((newHeight) - gameHeight) / 2;
			sceneContainer.scale.set(1, 1);
			
			
		
			this.scaleRatio = screenRatio;
			
			this.updateVersionPosition();
			
			sceneContainer.updateConfig(screenRatio);
			
			setTimeout(() => {
				sceneContainer.updateConfig(screenRatio);
				if (game.loadingFinish) {
					this.disableLoader();
					core.orientationchange = false;
				}
			}, 1000);
			
		
			
			
		}
		
		const checkAnimation = ()=>{
					resize();
		}
		
		
		checkAnimation();
	}
	
	enableLoader() {
		if (!core.blockLoader) {
			game.htmlElement.iconBG.style.display = 'block';
			game.logo.style.display               = 'block';
			game.logoLoading.style.display        = 'block';
		}
	}
	
	disableLoader() {
		if (!core.disableLoaderAfterResize) {
			game.htmlElement.iconBG.style.display   = 'none';
			game.logo.style.display                 = 'none';
			game.logoLoading.style.display          = 'none';
			game.htmlElement.logoIcon.style.display = 'none';
		}
	}
	
	createVersion() {
		const style       = new PIXI.TextStyle({fill: 'white', fontSize: 10});
		this.versionTxt   = new PIXI.Text('version ' + this.version, style);
		this.versionTxt.x = 5;
		this.stage.addChild(this.versionTxt);
		
	}
	
	updateVersionPosition() {
		if (this.versionTxt) {
			this.versionTxt.y = this.renderer.screen.height - 10;
		}
	}
	
	/**
	 * @public
	 * Create FPS
	 */
	updateMainContainer() {
		this.mainContainer.updateConfig(this.scaleRatio);
	}
	
	/**
	 * @public
	 * Create FPS
	 */
	createFPSMeter() {
		const element = document.getElementById('fps-meter');
		this.fpsmeter = new FPSMeter(element, this.fpsMeterOptions);
		
		this.ticker.add(this.fpsmeter.tick);
		this.fpsmeter.show();
	}
	
	/**
	 * getter for  FPS
	 */
	get FPS() {
		return this.ticker.FPS;
	}
	
	/**
	 * getter for  FPS option
	 */
	get fpsMeterOptions() {
		return {
			theme: 'transparent', heat: 1, graph: 1, history: 20, zIndex: 100,
		};
	}
}
