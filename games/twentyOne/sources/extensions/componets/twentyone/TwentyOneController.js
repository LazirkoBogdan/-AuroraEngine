export default class TwentyOneController extends game.component.Controller {
  giveUserCard(...rest) {
    this.view.giveUserCard(...rest);
  }

  resetGame(...rest) {
    this.view.resetGame(...rest);
  }

  showCards(...rest) {
    this.view.showCards(...rest);
  }

  hideCards(...rest) {
    this.view.hideCards(...rest);
  }
}
