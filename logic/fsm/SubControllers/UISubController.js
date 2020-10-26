import currencyToSymbolMap from 'currency-symbol-map';

export default class UISubController {
  mainController;
  
  model;
  
  components;
  
  constructor(mainController) {
    this.mainController = mainController;
    this.model          = mainController.model;
    this.components     = mainController.components;
    
    // this.components.ui.init({
    //   getters: this.getters,
    //   handlers: this.handlers,
    // });
    //
    // if(this.components.uibotton){
	  //   this.components.uibotton.init({
		//     getters: this.getters,
		//     handlers: this.handlers,
	  //   });
    // }

  }
  
  get getters() {
    return {
      userBet: () => {
        return {
          to: this.model.temporaryBet,
          code: this.model.user.userBalance.currencyCode,
        };
      },
      userChip: () => {
        return this.model.chipsValue;
      },
      
      playerBalance: () => {
        return {
          to: this.model.user.userBalance.balance || 0,
          code: this.model.user.userBalance.currencyCode,
        };
      },
      playerScore: () => {
        return `${this.model.game.params ? this.model.game.params.userScore > 0 ? this.model.game.params.userScore : '' : ''}`;
      },
      
      dealerScore: () => {
        return `${this.model.game.params ? this.model.game.params.dealerScore > 0 ? this.model.game.params.dealerScore : '' : ''}`;
      },
      
      lastWin: () => {
        return `${this.model.wins}`;
      },
      
      lastLose: () => {
        return `${this.model.lose}`;
      },
      
      lastDraw: () => {
        return `${this.model.draw}`;
      },
      
      gameCount: () => {
        return `${this.model.gameCount}`;
      },
      
      currency: () => {
        let currencyLogo = currencyToSymbolMap(this.model.user.userBalance.currencyCode);
        if(currencyLogo === undefined) currencyLogo = '$'
       
        return {
          status: `text`,
          text: `${currencyLogo}`,
        };
      },
    };
  }
  
  get handlers() {
    return {
      onExitBtnPressed: () => this._onExitBtnPressed(),
      onChipBet: name => this._onButtonBet(name),
      onInputBet: (name, text) => this.onInputBet(text),
      onLeftMainButton: () => this._onLeftMainButton(),
      onRigthMainButton: () => this._onRightMainButton(),
      onHomeButton: () => this._onHomeButton(),
      onRulesButton: () => this._onRulesButton(),
      onMinButton: () => this._onMinButton(),
      onMaxButton: () => this._onMaxButton(),
      onButtonMultiplier: () => this._onButtonMultiplier(),
      onButtonDivider: () => this._onButtonDivider(),
      onMenu: () => this._onMenu(),
      onCurrencyMenu: () => this._onCurrencyMenu(),
    };
  }
  
  _onCurrencyMenu() {
    this.mainController.showCurrencyPopup();
  }
  
  _onMenu() {
    this.mainController.showSubMenu();
  }
  
  _onMinButton() {

    this.mainController.minBetPress();
  }
  
  _onMaxButton() {
    this.mainController.maxBetPress();
  }
  
  _onButtonMultiplier() {
    this.mainController.multiplierPress();
  }
  
  _onButtonDivider() {
    this.mainController.dividerPress();
  }
  
  _onHomeButton() {
    this.mainController.showHomePopup();
  }

  _onRulesButton() {
  	
    this.mainController.showRulesPopup();
  }
  
  _onLeftMainButton() {
    this.mainController.mainLeftButtonInterective();
  }
	
	_onButtonBet(name) {
    const config = {};
    config.price = this.model.chipsValue[this._getIndexFrom(name)];
    config.name  = name;
    this.mainController.makeButtonBet(config);
  }
  
  onInputBet(text) {
    
    let bet = text;
    
    if (isNaN(bet)) return;
    
    this.mainController.makeInputBet(bet);
    
  }
  
  _onRightMainButton() {
    this.mainController.mainRightButtonInteractive();
  }
  
  _onExitBtnPressed() {
    this.mainController.exitGame();
  }
  
  _getIndexFrom(value) {
    return Number(value.split('_').last);
  }
}
