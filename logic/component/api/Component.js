/*global game:true*/

export default class Component {
  ID = "";
  controller;
  src;
  _isActive;
  _parentGame;

  constructor(controllerCls, modelCls, viewCls, parent) {
    const view      = new viewCls();
    view.parentGame = this._parentGame = parent;

    const model = new modelCls();
    // this._parentGame.application.mainContainer.addChild(view);
    game.application.mainContainer.addChild(view);

    this.controller            = new controllerCls(model, view);
    this.controller.parentGame = this._parentGame = parent;
  }

  onInitialize() {
    //Override me !!!
  }

  create(...rest) {
    this.create = () => {
      throw new Error(`Components with id: ${this.ID} already create`);
    };

    this.controller.create(...rest);
  }

  initialize(...rest) {
    this.onInitialize();
    this.controller.initialize(...rest);
  }

  destroy() {
    this.controller.destroy();
  }

  show(config, cb) {
    this.controller.show(config, cb);
    this._isActive = true;
  }

  hide(config, cb) {
  	this.controller.hide(config, cb)
  }

  reset() {
    this.controller.reset();
  }

  get needToLoad() {
    return this.controller.needToLoad(this.ID);
  }

  get isLoaded() {
    return this.controller.isLoaded;
  }

  get resourcesToLoad() {
    return this.controller.getResourcesToLoad();
  }

  get isActive() {
    return this._isActive;
  }
}
