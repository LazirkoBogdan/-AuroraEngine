export default class UIController extends game.component.Controller {
  init(...rest) {
    this.view.init(...rest);
  }

  updateUI(...rest) {
    this.view.updateUI(...rest);
  }

  moveChip(...rest) {
    this.view.moveChip(...rest);
  }

  updateStateUI(...rest) {
    this.view.updateStateUI(...rest);
  }
	
	shiftUIElements(...rest) {
		this.view.shiftUIElements(...rest);
	}

  clearBet(...rest) {
    this.view.clearBet(...rest);
  }

  generateChips(...rest) {
    this.view.generateChipsFromValue(...rest);
  }

  addHandlers(...rest) {
    this.view.addHandlers(...rest);
  }

  showSubMenu(...rest) {
    this.view.showSubMenu(...rest);
  }

  hideSubMenu(...rest) {
    this.view.hideSubMenu(...rest);
  }

  disableSceneInput(...rest) {
    this.view.disableSceneInput(...rest);
  }
}
