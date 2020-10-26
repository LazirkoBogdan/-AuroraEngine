export default class ComponentController {
  get isLoaded() {
    return this._isLoaded;
  }

  model;
  view;
  resourcesConfig;
  mainModel;
  _isLoaded  = false;
  parentGame = null;

  constructor(model, view) {
    this.model = model;
    this.view  = view;
  }

  onInitialize() {
    //override me
  }

  destroy() {
    this.view.destroy();
  }

  show(config, cb) {
    this.view.show(config, cb);
  }

  hide(config, cb) {
  	this.view.hide(config, cb)
  }

  getResourcesToLoad() {
    return this.resourcesConfig;
  }

  create(config, resourcesConfig) {
    this.resourcesConfig = resourcesConfig;
    this.mainModel       = game.model;
    this.view.create(config);

  }

  reset() {
    this.view.reset();
  }

  initialize(...rest) {
    this._isLoaded = true;
    this.onInitialize();
    this.model.initialize();
    this.view.initialize(...rest);
  }

  needToLoad(id) {
    // Override!
    return true;
  }
}
