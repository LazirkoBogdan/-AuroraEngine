export default class PopupController extends game.component.Controller {
	showPopup(...rest) {
		this.view.showPopup(...rest);
	}
	
	setLine(...rest) {
		this.view.setLine(...rest);
	}
	
	hidePopups(...rest) {
		this.view.hideCurrentPopups(...rest);
	}
	
	updateLimit(...rest) {
		this.view.updateLimit(...rest);
	}
	
	updateDataCurrencyPopup(...rest) {
		this.view.updateDataCurrencyPopup(...rest);
	}
}
