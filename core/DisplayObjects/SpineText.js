import ResizeContainer from "./ResizeContainer.js";

export default class SpineText extends ResizeContainer {

  element;

  constructor(text = "", config, parent) {
    super(config);

    this.element = new core.display.DisplayText(config);
    if (text) this.text = text;
    this.addToSlot(parent);
  }

  set text(value) {
    this.element.text = value;
  }

  addToSlot(parent) {
    if (parent) {
      const target         = parent.currentSprite ? parent.currentSprite : parent.children.first;
      target.texture.valid = false;
      target.removeChildren();
      target.addChild(this.element);
    }
  }

}