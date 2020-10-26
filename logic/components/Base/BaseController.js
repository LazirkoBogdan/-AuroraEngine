export default class BaseController extends game.component.Controller {
  sendToLayer(name) {
    this.view.sendToLayer(name);
  }

  getObjectBy(...rest) {
    return this.view.getObjectBy(...rest);
  }
}
