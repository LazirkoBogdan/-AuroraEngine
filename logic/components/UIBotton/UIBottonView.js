export default class UIBotton extends game.components.UI.src.View {

  show() {
    this.visible = true
  }
  
  init({getters, handlers}) {
    const config   = this.config;
    const sceneObj = this.sceneObj;
    sceneObj.forEach((obj, i) => {
      if (obj.name === config.sceneObj[i].name) {
        const element = config.sceneObj[i];
        
        if (element.handler) {
          obj.handler = handlers[element.handler].bind(obj, obj.name);
        }
        if (element.getter) {
          obj.getter      = getters[element.getter];
          obj.getterValue = getters[element.getter]();
          obj.update();
        }
      }
    });
    
  }


  updateConfig(screenRatio) {
    const children = this.children;
    const orientation = this.orientation;
    children.forEach(child => {
      child.updateConfig(orientation, screenRatio);
    });
  }
  
  updateInputText() {
    const input  = this._getChildByName('input_sum_place');
    const minBet = input.getChildByName('min');
    const maxBet = input.getChildByName('max');
    
    minBet.config.paramText.text = core.getTranslation('min', 'buttonText') + ` ${core.getFormattedNum(game.model.minBet)}` + ` ${game.model.user.userBalance.currencyCode}`;
    
    maxBet.config.paramText.text = core.getTranslation('min', 'buttonText') + ` ${core.getFormattedNum(game.model.maxBet)}` + ` ${game.model.user.userBalance.currencyCode}`;
    
    maxBet.text = core.getTranslation('max', 'buttonText') + ` ${core.getFormattedNum(game.model.maxBet)}` + ` ${game.model.user.userBalance.currencyCode}`;
    
    minBet.text = core.getTranslation('min', 'buttonText') + ` ${core.getFormattedNum(game.model.minBet)}` + ` ${game.model.user.userBalance.currencyCode}`;
  }
}
