export default class PreloaderApi extends game.component.Api {
  showPreloader(...rest) {
    this.controller.showPreloader(...rest);
  }

  hidePreloader(config, cb) {
    this.controller.hidePreloader(config, cb);
  }

  moveTop(...rest) {
    this.controller.moveTop(...rest);
  }

}
