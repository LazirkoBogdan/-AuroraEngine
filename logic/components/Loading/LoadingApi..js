export default class LoadingApi extends game.component.Api {
  showLoading(...rest) {
    this.controller.showLoading(...rest);
  }

  hideLoading(...rest) {
    this.controller.hideLoading(...rest);
  }
}
