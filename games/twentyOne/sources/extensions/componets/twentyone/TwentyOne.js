export default class TwentyOne extends game.component.Api {
	giveUserCard(...rest) {
		this.controller.giveUserCard(...rest);
	}
	
	resetGame(...rest) {
		this.controller.resetGame(...rest);
	}
	
	showCards(...rest) {
		this.controller.showCards(...rest);
	}
	
	hideCards(...rest) {
		this.controller.hideCards(...rest);
	}
}
