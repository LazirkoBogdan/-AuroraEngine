import ResizeContainer from '../DisplayObjects/ResizeContainer';

export default class ScrollContainer extends ResizeContainer {
	name;
	
	_selectedItem = null;
	
	_isItemsInteractive = false;
	
	_handler = () => {};
	
	constructor(config) {
		super(config);
		this._config = config;
		if (config.itemsInteractive) {
			this._isItemsInteractive = true;
		}
		
		this._name = config.name;
		this.po    = new core.display.ResizeContainer();
		this.addChild(this.po);
		this.scrollContainer = new core.display.ResizeContainer();
		this.po.addChild(this.scrollContainer);
		this.items = [];
		this.x     = config.x;
		this.y     = config.y;
		
		this.scrollContainer.x = config.x;
		this.scrollContainer.y = config.y;
		this.height            = config.height;
		this.itemHeight        = config.itemHeight;
		
		this.mask              = new PIXI.Graphics();
		this.mask.updateConfig = () => {};
		this.mask.beginFill(0xffffff).
				drawRect(config.rect.x, config.rect.y, config.rect.width,
						config.rect.height).
				endFill();
		
		this.po.addChild(this.mask);
		this.scrollContainer.mask = this.mask;
		
		this.mousedown   = false;
		this.lastPos     = null;
		this.lastDiff    = null;
		this.scrollTween = null;
		
		this.po.interactive     = true;
		this.po.mousemove       = e => this.onmousemove(e);
		this.po.mousedown       = e => this.onmousedown(e);
		this.po.mouseup         = e => this.onmouseup(e);
		this.po.mouseupoutside  = e => this.onmouseup(e);
		this.po.touchmove       = e => this.onmousemove(e);
		this.po.touchstart      = e => this.onmousedown(e);
		this.po.touchend        = e => this.onmouseup(e);
		this.po.touchendoutside = e => this.onmouseup(e);
	}
	
	set heightContainer(val) {
		this.height = val;
	}
	
	onmousemove(e) {
		const scrollBlock = this.mode === 'portrait' ? 12 : 5;
		if (this.items.length <= scrollBlock) return;
		
		const {originalEvent} = e.data;
		let clientY           = !originalEvent.touches
				? originalEvent.clientY
				: originalEvent.touches[0].clientY;
		
		if (this.mousedown) {
			this.lastDiff  = clientY - this.lastPos.y;
			this.lastPos.y = clientY;
			
			if (-this.scrollContainer.y < 0) {
				this.scrollContainer.y += this.lastDiff / 2;
			} else {
				this.scrollContainer.y += this.lastDiff;
			}
		}
	}
	
	onmousedown(e) {
		const scrollBlock = this.mode === 'portrait' ? 12 : 5;
			if (this.items.length <= scrollBlock) return;
		const {originalEvent} = e.data;
		const clientY         = !originalEvent.touches
				? originalEvent.clientY
				: originalEvent.touches[0].clientY;
		this.mousedown        = true;
		if (this.scrollTween) {
			this.scrollTween.kill();
		}
		this.lastPos = {
			y: clientY,
		};
	}
	
	onmouseup() {
		const scrollBlock = this.mode === 'portrait' ? 12 : 5;

			if (this.items.length <= 	scrollBlock) return;
		if (this.lastDiff) {
			
			let goY  = this.scrollContainer.y + this.lastDiff * 10;
			let ease = core.tween.Quad.easeOut;
			let time = Math.abs(this.lastDiff / 150);
			if (goY < -(this.items.length + 10) * this.itemHeight - this.height +
					this.y) {
				goY  = -(this.items.length + 10) * this.itemHeight + this.height +
						this.y;
				ease = core.tween.Back.easeOut;
				time = 0.1 + Math.abs(this.lastDiff / 150);
				console.log(1);
			}
			
			if (goY > this.y) {
				goY  = this.y;
				ease = core.tween.Back.easeOut;
				time = 0.1 + Math.abs(this.lastDiff / 150);
				console.log(2);
			}
			
			if (this.scrollContainer.y > 0) {
				time = 1 + this.scrollContainer.y / 500;
				ease = core.tween.Elastic.easeOut;
				console.log(3);
			}
			if (this.scrollContainer.y < -(this.items.length + 10) * this.itemHeight -
					this.height) {
				console.log(-this.items.length * this.itemHeight + this.height);
				time = 1 + ((this.items.length + 10) * this.itemHeight + this.height +
						this.scrollContainer.y) / 500;
				ease = core.tween.Elastic.easeOut;
				console.log(4);
			}
			
			this.scrollTween = core.tween.TweenMax.to(this.scrollContainer, time, {
				y: goY,
				ease,
			});
		}
		
		this.mousedown = false;
		this.lastPos   = null;
		this.lastDiff  = null;
	}
	
	// This should be called every tick. Use only for scrolling containers with
	// lots of elements for performance.
	hideOffscreenElements() {
		const startIndex = Math.floor(
				-(this.scrollContainer.y - this.y) / this.itemHeight);
		const endIndex   = Math.floor(startIndex + this.height / this.itemHeight);
		for (let i = 0; i < this.items.length; i++) {
			const item   = this.items[i];
			item.visible = false;
			if (i >= startIndex && i <= endIndex + 1) {
				item.visible = true;
			}
		}
	}
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
		const orientation = this.orientation;
		const mode = this.mode = orientation ? 'portrait' : 'landscape';
		
		if (this._config && this._config[mode]) {
			const config = this._config[mode];
			
			this.itemHeight = config.itemHeight;
			
			this.mask.clear();
			
			this.mask.beginFill(0xffffff).
					drawRect(config.rect.x, config.rect.y, config.rect.width,
							config.rect.height).
					endFill();
			
		}
		
	}
	
	addItem(item) {
		this.scrollContainer.addChild(item);
		this.items.push(item);
		if (this._isItemsInteractive) {
			this.makeInteractive(item);
		}
		item.y = (this.items.length - 1) * this.itemHeight;
	}
	
	set handler(value) {
		this._handler = value;
	}
	
	get selectedItem() {
		return this._selectedItem;
	}
	
	set selectedItem(value) {
		this._selectedItem = value;
	}
	
	makeInteractive(item) {
		item.interactive = true;
		item.buttonMode  = true;
		item.on('pointerdown', () => {
			this._selectedItem = item;
			this._handler(item);
		});
	}
}
