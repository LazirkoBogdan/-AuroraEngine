/**
 * Button
 * Class create Button for games
 * @extends SceneObject
 * @exports Button
 */
import SceneObject from './SceneObject';

export default class MultiButton extends SceneObject {
  enabled = false;

  status = 'disable';

  getter;

  newHandler;

  _handlers = [];

  _pressed;

  _interactiveText;

  _interactiveBG;

  constructor(config) {
    super(config);
    this._interactiveText = [];
    this._interactiveBG = [];
    this.newHandler = () => {};
    if (config.interactiveText) {
      config.interactiveText.forEach(text => {
        const interactiveChild = this.getChildByName(text);
        this.addChildButtonListeners(interactiveChild);
        this._interactiveText.push(interactiveChild);
      });
    }
    if (config.interactiveBG) {
      config.interactiveBG.forEach(bg => {
        const interactiveChild = this.getChildByName(bg);
        this.addChildButtonListeners(interactiveChild);
        this._interactiveBG.push(interactiveChild);
      });
    }
  }

  set handlers(value) {
    this._handlers = value;
    this.addHandlersToInteractiveChild();
  }

  addHandlersToInteractiveChild() {
    this._interactiveText.forEach((child, i) => {
      child.handler = this._handlers[i];
    });

    this._interactiveBG.forEach((child, i) => {
      child.handler = this._handlers[i];
    });
  }

  changeInteractiveChild(enable) {
    this._interactiveText.forEach((child, i) => {
      child.interactive = enable;
      child.buttonMode = enable;
      child.enabled = enable;
    });

    this._interactiveBG.forEach((child, i) => {
      child.interactive = enable;
      child.buttonMode = enable;
      child.enabled = enable;
    });
  }

  /**
   * @public
   * @param  {string} state
   * update State
   */
  updateState(state) {
    const config = this._config;
    super.update(state);
    if (config.states && config.states[state]) {
      const paramState = config.states[state];
      if (paramState.hasOwnProperty('enable'))
        this.changeInteractiveChild(paramState.enable);
    }
  }

  /**
   * @public
   * add Button Listeners
   */
  addChildButtonListeners(obj) {
    obj.interactive = true;
    obj.buttonMode = true;
    obj.enabled = true;

    obj.onButtonPressed = () => {
      obj._pressed = true;
     obj.scale.set(obj.scales.pressed);
    };

    obj.onButtonUnPressed = callHandler => {
      if (!obj._pressed) return;

      obj.scale.set(obj.scales.unpressed);

      if (obj._pressed && callHandler && obj.handler) {
        obj.handler();
      }

      obj._pressed = false;
    };

    obj.on('pointerdown', obj.onButtonPressed);
    obj.on('pointerup', obj.onButtonUnPressed.bind(obj, true));
    obj.on('pointerupoutside', obj.onButtonUnPressed.bind(obj, false));
    obj.on('pointercancel', obj.onButtonUnPressed.bind(obj, false));
  }
}
