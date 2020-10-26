/**
 * UpdateComponentUI
 * Class update configs for ui elements
 */

export default class UpdateComponentUI {
  /**
   * @static
   * get orientation
   */
  static get orientation() {
    const query = window.matchMedia('(orientation:landscape)');
    return !query.matches;
  }

  /**
   * @static
   * @param  {Boolean} portrait
   * @param  {number} scaleRatio
   * update Config in UI element
   */
  static updateConfig(portrait, scaleRatio = 1,) {
    const orientation = portrait ? 'portrait' : 'landscape';
    if (this._config && this._config[orientation]) {
      const config = this._config[orientation];
      this.x = config.x || 0;
      this.y = config.y || 0;
      
      if (config.anchor) this.anchor.set(config.anchor);
      if (config.scaleY) this.scale.y = config.scaleY || 1;
      if (config.scaleX) this.scale.x = config.scaleX || 1;
      if (config.scales) this.scales = config.scales;
	
	    if(config.hasOwnProperty('alpha'))this.alpha = config.alpha;
	    
      if (config.blendMode) {
        this.blendMode = PIXI.BLEND_MODES[config.blendMode];
      }
      this.rotation = config.rotation ? config.rotation * (Math.PI / 180) : 0;

      if (config.texture && typeof config.texture !== 'object') {
        this.texture = UpdateComponentUI.getTexture(config.texture);
      }
	
	    if (config.hasOwnProperty('pivot')) {
		    UpdateComponentUI.setPivot(config.pivot);
	    }

      if (config.responsivePosition)
        this.setResponsivePosition(config.responsivePosition);
    }
  }
	
	/**
	 * @public
	 * set pivot to pixi container.
	 */
	static	setPivot(point) {
		if (point instanceof PIXI.Point) {
			this.pivot.set(point.x, point.y);
		} else
			if (point === 'center') {
				this.pivot = new PIXI.Point(this.width / 2, this.height / 2);
			} else
				if (point === 'left') {
					this.pivot = new PIXI.Point(0, this.height / 2);
				} else
					if (point === 'right') {
						this.pivot = new PIXI.Point(this.width, this.height / 2);
					}
	}

  /**
   * @static
   * @param  {texture} tex
   * get Texture from store
   */
  static getTexture(tex) {
    return game.getTexture(tex);
  }

  /**
   * Binding scene obj to side app
   * @param  {object} config
   */
  static setResponsivePosition(config) {
	  if (this.parent === null) return;
	
	  const portrait = UpdateComponentUI.orientation;
	  const orientation = portrait ? 'portrait' : 'landscape';
	
	  const faceIDOffset =
			        orientation === 'portrait' && game.application.faceID ? game.constants.size.topOffsets  : 0;
	
	  const localPoint = this.parent.toLocal(
			  new PIXI.Point(
					  game.application.renderer.screen.width,
					  game.application.renderer.screen.height
			  )
	  );
	  const gameWidth = localPoint.x;
	  const gameHeight = localPoint.y;
	  const gameTopOffset = 1080 - gameHeight + faceIDOffset;
	
	  const gameWithOffset = (1920 - gameWidth) / 2;
	  const gameHeightOffset = (1080 - gameHeight) / 2;
	  switch (config.position) {
		  case 'left':
			  break;
		  case 'right':
			  break;
		  case 'center':
			  this.x = this.x + gameWidth / 2 + gameWithOffset;
			  this.y = this.y + gameHeight / 2 + gameHeightOffset;
			  break;
		  case 'top':
			  this.y = this.y + gameTopOffset + this.height / 2;
			  break;
		  case 'bottom':
			  this.y = this.y + gameHeight - this.height - 50;
			  break;
		  default:
			  break;
	  }
	  if (config.shift) {
		  this.x += config.shift.x;
		  this.y += config.shift.y;
	  }
  }

}
