export default class ComponentView extends game.component.View {
	parentGame  = null;
	
	sceneObj    = [];
	
	loaderSpine = null;
	
	onInitialize() {
		super.onInitialize();
		this.show();
	}
	
	destroy() {}
	
	show(config, cb) {}
	
	hide(config, cb) {
		this.visible = false;
	}
	
	create(config) {
		this._config = config;
	}
	
	propagation(visible) {
		this.container.visible = visible;
	}
	
	initialize(assets) {
		this.visible = this._config.visible;
		this.onInitialize();
	}
	
	showLoading(config) {
		this.loaderSpine       = this.getChildByName(config.name);
		this.loaderSpine.alpha = 1;
		this.loaderSpine.play(this.loaderSpine.config.animations.show.name, true);
	}
	
	hideLoading(config) {
		if (this.loaderSpine !== null) {
			this.loaderSpine.alpha = 0;
			this.loaderSpine.reset();
		}
		
	}
	
	_createTestText() {
		const style = new PIXI.TextStyle({
			fill: '#e2fdf9',
			fontFamily: 'Helvetica',
			fontSize: 50,
			strokeThickness: 2,
		});
		
		this._config.testText.style = style;
		// eslint-disable-next-line no-redeclare
		const text                  = new core.display.Text(this._config.testText);
		text.x                      = 100;
		text.y                      = 100;
		
		this.addChild(text);
	}
	
	_addMask() {
		const graphics = new PIXI.Graphics();
		graphics.beginFill(0x000000);
		graphics.drawRect(0, 0, this.parentGame.screen.width,
				this.parentGame.application.canvasHeight);
		graphics.endFill();
		
		const localPos = this.toLocal(new PIXI.Point(0, 0));
		
		graphics.x = localPos.x;
		graphics.y = localPos.y;
		
		this.mask = graphics;
		this.addChild(graphics);
	}
}
