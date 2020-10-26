export default class PreloaderController extends game.component.Controller {
  showPreloader(...rest) {
    this.view.showPreloader(...rest);
  }

  hidePreloader(config, cb) {
    this.view.hidePreloader(config, cb);
  }
  
    moveTop(...rest) {
    this.view.moveToTop(...rest);
  }
}
