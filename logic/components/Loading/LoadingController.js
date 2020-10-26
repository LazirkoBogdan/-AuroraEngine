export default class LoadingController extends game.component.Controller {
  showLoading(...rest) {
    this.view.showLoading(...rest);
  }

  hideLoading(...rest) {
    this.view.hideLoading(...rest);
  }
}
