export default class UIApi extends game.component.Api {
  init(...rest) {
    this.controller.init(...rest);
  }

  updateUI(...rest) {
    this.controller.updateUI(...rest);
  }

  moveChip(...rest) {
    this.controller.moveChip(...rest);
  }

  clearBet(...rest) {
    this.controller.clearBet(...rest);
  }
	
	shiftUIElements(...rest) {
		this.controller.shiftUIElements(...rest);
	}

  updateStateUI(...rest) {
    this.controller.updateStateUI(...rest);
  }

  generateChips(...rest) {
    this.controller.generateChips(...rest);
  }

  addHandlers(...rest) {
    this.controller.addHandlers(...rest);
  }

  showSubMenu(...rest) {
    this.controller.showSubMenu(...rest);
  }

  hideSubMenu(...rest) {
    this.controller.hideSubMenu(...rest);
  }

  disableSceneInput(...rest) {
    this.controller.disableSceneInput(...rest);
  }
}
