/**
 * Button
 * Class create Button for games
 * @extends core.display.SceneObject
 * @exports Button
 */

import sceneObject from './SceneObject';
import currencyToSymbolMap from 'currency-symbol-map';

export default class Button extends sceneObject {
	_pressed;
	
	enabled = false;
	
	status = 'disable';
	
	handlerArg = null;
	
	constructor(config) {
		super(config);
		this._pressed = false;
	}
	
	update() {
		super.update();
		
		if (this._blockGetters) return;
		
		if (typeof this.getter === "function") {
			const config     = {};
			const buttonText = this.getChildByName("text");
			const param      = this.getter();
			
			if (param.status && param.status === "text") {
				buttonText.text = param.text;
				return;
			}
			
			let currencyLogo = currencyToSymbolMap(game.model.user.userBalance.currencyCode);
			
			if (currencyLogo === undefined) currencyLogo = "$ ";
			
			let nf = core.Intl.NumberFormat(undefined, {
				style:    "currency",
				currency: game.model.user.userBalance.currencyCode,
			});
			
			if (isNaN(param) && isNaN(param.to)) return;
			
			if (this.name === "input_sum_place") {
				buttonText.textCache = param.to;
				buttonText.text      = nf.format(param.to).replace(game.model.user.userBalance.currencyCode, currencyLogo);
				return;
			}
			
			if (this._config.tweenText) {
				
				if (typeof param.to === "number") {
					
					if (buttonText.textCache === param.to) {
						buttonText.text = nf.format(param.to).replace(game.model.user.userBalance.currencyCode, currencyLogo);
						return;
					}
					
					
					if (param.to === 0) {
						buttonText.textCache = 0;
						buttonText.text      = nf.format(0).replace(game.model.user.userBalance.currencyCode, currencyLogo);
						return;
					}
					
					config.countFrom = buttonText.textCache || 0;
					config.countTo   = param.to;
					config.delay     = this._config.tweenText.delay;
					config.duration  = this._config.tweenText.duration;
					
					if (this._config.tweenText.customUpdate) {
						config.customUpdate = text => {
							if (typeof text !== "number") {
								parseFloat(text);
							}
							
							buttonText.textCache = text;
							return nf.format(text).replace(game.model.user.userBalance.currencyCode,
									currencyLogo);
						};
					}
					
					buttonText.tweenText(config);
				} else {
					buttonText.textCache = param.to;
					buttonText.text      = nf.format(param.to).replace(game.model.user.userBalance.currencyCode, currencyLogo);
				}
			} else {
				buttonText.textCache = this.getter();
				buttonText.text      = this.getter();
			}
		}
	}
	
}
