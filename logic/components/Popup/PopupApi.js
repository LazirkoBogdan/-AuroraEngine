export default class PopupApi extends game.component.Api {
	showPopup(...rest) {
		this.controller.showPopup(...rest);
	}
	
	hidePopups(...rest) {
		this.controller.hidePopups(...rest);
	}
	
	setLine(...rest) {
		this.controller.setLine(...rest);
	}
	
	updateDataCurrencyPopup(...rest) {
		this.controller.updateDataCurrencyPopup(...rest);
	}
	
	updateLimit(...rest) {
		this.controller.updateLimit(...rest);
	}
	
}
