/*global core:true*/
export default class Chips extends core.display.SceneObject {
  price = 0;

  constructor(config) {
    super(config);
    this.price = 0;
    this.formatOver = 999;
    this.chipsContainer = new PIXI.Container();
    this.chipsContainer.updateConfig = () => {};
    this.addChild(this.chipsContainer);
  }

  /**
   * @public
   * reset scene object
   */
  reset() {}

  update() {
    super.update();
    if (typeof this.getter === 'function') {
      const buttonText = this.getChildByName('text');
      const chipsValue = this.getter();
      this.price       = chipsValue[this._config.chipId];
      buttonText.text  = this.price > this.formatOver ? core.getFormattedNum(this.price) : this.price;
    }
  }

  
    /**
   * @public
   * @param  {boolean} callHandler
   */
  onButtonUnPressed(callHandler) {
    if (!this._pressed) return;
    
     core.buttonsAvailable = true;

    
    this.scale.set(this.scales.unpressed);

    this.press(false);
    

   if (this._pressed && callHandler && this.handler) {
      this.handler(this.price);
    }
    
    this._pressed = false;
  }
}
