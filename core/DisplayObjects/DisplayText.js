import Text from './Text';
import MultiStyleText from './MultiStyleText';
import Graphics from './Graphics';
import UpdateComponentUI from '../Components/UpdateComponentUI';

export default class DisplayText extends PIXI.Container {
  textCache = 0;
  
  constructor(config) {
    super(config);
    this.name = config.name;
    if (config.debugShape) {
      let debugShape = (this._debugShape = new Graphics());
      let r          = config.dimensions;
      debugShape.lineStyle(1, 0xdf2121, 0);
      debugShape.drawRect(r.x, r.y, r.width, r.height);
      this.addChild(debugShape);
    }
    this._init(config);
    let initialText = '';
    
    
    
    this._text = config.multiStyle ? new MultiStyleText(config.paramText) : new Text(config.paramText);
    // this._text = new Text(config.paramText)

    this.addChild(this._text);
    
    this._resize();
    this.updateConfig(false);
  }
  
  /**
   * @getter
   * get config
   */
  get config() {
    return this._config;
  }
  
  get text() {
    return this._text.text;
  }
  
  set text(value) {
    this._text.text = value;
    this._resize();
  }
  
  get style() {
    return this._text.style;
  }
  
  set style(value) {
	  this._text.style = value;
	  this._resize();
  }
	
	tweenText(config, cb) {
		//this.cacheAsBitmap = false;
		if (config.countFrom) this._text.text = config.countFrom;
		core.tween.TweenMax.to(this._text, config.duration, {
			text: config.countTo,
			onUpdate: () => {
				
				const text = Number(this._text.text)
				if (isNaN(text)&&isNaN(text)) return;
				if (config.customUpdate){
					this._text.text = config.customUpdate(text);
					this._resize()
				}
				else{
					if (isNaN(text)&&isNaN(text)) return;
					this._text.text = text
					this._resize()
				}
				
				
				
			},
			onComplete: () => {
				this._resize();
				if (cb) core.call(() => cb(), config.delay || 0); else
					if (config.onComplete) core.call(() => config.onComplete(), config.delay || 0);
			},
		});
	}
  
  /**
   *@public
   * Get Spine Data from atlas
   */
  updateConfig(portrait, scaleRatio = 1, containerOffsets) {
    UpdateComponentUI.updateConfig.call(this, portrait, scaleRatio, containerOffsets);
    
    const children    = this.children;
    const orientation = this.orientation;
    const mode        = portrait ? 'portrait' : 'landscape';
    
    if (this._config && this._config[mode]) {
      if (this._config[mode].dimensions) {
        this._config.dimensions = this._config[mode].dimensions;
      }
    }
    
    children.forEach(child => {
      child.updateConfig(orientation);
    });
    
    
    this._resize();
  }
  
  get orientation() {
    const query = window.matchMedia('(orientation:landscape)');
    return !query.matches;
  }
  
  /**
   *@public
   * Get Spine Data from atlas
   */
  setResponsivePosition(config) {
    UpdateComponentUI.setResponsivePosition.call(this, config);
  }
  
  /**
   *@private
   * init config
   * @param  {obj} config
   */
  _init(config) {
    this._config = config;
  }
  
  /**
   * Resize the text to fit
   * @private
   */
  _resize() {
    this._text.scale.x = this._text.scale.y = 1;
    
    let width  = this._text.text === '' ? 0 : this._text.width;
    let height = this._text.text === '' ? 0 : this._text.height;
    let r      = this._config.dimensions;
    
    if (this._config.scaleDownToFit) {
      let wScale         = width > r.width ? r.width / width : 1;
      let hScale         = height > r.height ? r.height / height : 1;
      let scale          = Math.min(wScale, hScale);
      this._text.scale.x = this._text.scale.y = scale;
      width *= scale;
      height *= scale;

    }
	  this._text.y = r.y + (this._config.vAlign < 0 ? Math.round(r.height - height) : this._config.vAlign > 0 ? 0 : Math.round((r.height - height) / 2));
	  this._text.x = r.x + (this._config.hAlign < 0 ? Math.round(r.width - width) : this._config.hAlign > 0 ? 0 : Math.round((r.width - width) / 2));

    
    let debugShape = this._debugShape;
    if (debugShape) {
      debugShape.clear();
      debugShape.lineStyle(1, 0xdf2121, 1);
      debugShape.drawRect(r.x, r.y, r.width, r.height);
      debugShape.visible = true;
    }
  }
}
