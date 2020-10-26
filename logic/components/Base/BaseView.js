export default class BaseView extends game.component.View {
  onInitialize() {
    super.onInitialize();

    this.show();
  }

  show() {
    super.show();
  }

  getObjectBy() {}

  _getChildByName(name) {
    let child = null;
    this.sceneObj.forEach(obj => {
      if (obj.name === name) {
        child = obj;
      }
    });
    return child;
  }
}
