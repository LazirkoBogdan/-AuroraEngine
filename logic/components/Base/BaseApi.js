export default class BaseApi extends game.component.Api {
  sendToLayer(name) {
    this.controller.sendToLayer(name);
  }

  getObjectBy(...rest) {
    return this.controller.getObjectBy(...rest);
  }
}
