import currencyToSymbolMap from "currency-symbol-map";

export default class PopupView extends game.components.Popup.src.View {

  onInitialize() {
    super.onInitialize();
    

    this.setupRules();
  }

  replaceAll(target, search, replacement) {
    return target.split(search).join(replacement);
  };

  setupRules() {
    // rules popup.
    const rulesPopup = this._getChildByName("rules");
    if (rulesPopup) {
      const rulesText = this.getObjChildByName("rules", "rulesText");
	    const rulesLandscapeText = this.getObjChildByName("rules","rulesLandscape");
	    
      const translations = game.model.libary.translation;
      rulesPopup.visible = false;

      const rules      = translations.ruleMenu.rules;
      let currencyLogo = currencyToSymbolMap(game.model.user.userBalance.currencyCode);
      if (currencyLogo === undefined) currencyLogo = "$ ";

      let nf = core.Intl.NumberFormat(undefined, {
        style:    "currency",
        currency: game.model.user.userBalance.currencyCode,
      });

      let maxBet = this.prevMaxBet = nf.format(game.model.maxBet).replace(game.model.user.userBalance.currencyCode, currencyLogo);
      let minBet =this.prevMinBet = nf.format(game.model.minBet).replace(game.model.user.userBalance.currencyCode, currencyLogo);

      let text = rules;
      if (text.includes("$")) text = this.replaceAll(text, "$", `${maxBet}`);
      if (text.includes("#")) text = this.replaceAll(text, "#", `${minBet}`);
      
      rulesText.text = text;
	    rulesLandscapeText.text = text;

    }
  }
	
	updateLimit(){
		this.setupRules()
	
		
	}
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
		
		const rulesText = this.getObjChildByName("rules", "rulesText");
		const rulesLandscapeText = this.getObjChildByName("rules","rulesLandscape");
		
		const orientation = core.getOrientation() ? 'portrait' : 'landscape';
		if(rulesLandscapeText&&rulesText!==undefined){
			if(orientation==='portrait'){
				rulesText.visible = true
				rulesLandscapeText.visible = false;
			}else{
				rulesText.visible = false
				rulesLandscapeText.visible = true;
			}
		}

		
	}
}