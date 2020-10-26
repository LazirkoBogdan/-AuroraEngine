export default class SpineButton {
  _container;
  _buttonOptions;
  _parent;
  _handler;
  _pressed;
  _sprite;
  _bone;
  scalesButton = {
    unpressed: 1,
    pressed:   0.8,
  };
  useAttachments;
  right;
  bottom;
  left;
  top;

  constructor(buttonConfig) {
    this._parent        = buttonConfig.parent;
    this._container     = buttonConfig.sprite;
    this._sprite        = buttonConfig.sprite.children.first;
    this._bone          = buttonConfig.bone;
    this._buttonOptions = buttonConfig.buttonOptions;

    this.applyButtonOptions();
    this.addButtonListeners();
    this.setCustomHitArea();
    this.interactivity = true;
  }

  set handler(handler) {
    if (typeof handler !== "function") console.error(`Handler must be a function!`);
    this._handler = handler;
  }

  get handler() {
    return this._handler;
  }

  set interactivity(value) {
    this._container.interactive = value;
    this._container.buttonMode  = value;
  }

  applyButtonOptions() {
    if (typeof this._buttonOptions !== "object") return;
    const { scales, attachments, name } = this._buttonOptions;

    if (scales) {
      this.scalesButton = scales;
    }

    if (attachments) {
      this.useAttachments = true;
      this._parent.addAttachment({ slot: name, sprite: attachments.unpressed });
    }
  }

  setCustomHitArea() {
    if (!this._sprite) return;
    const isCustomHitArea = !!(this._buttonOptions && this._buttonOptions.hitAreaScale);

    // set button sprite bounds.
    this.right  = this._sprite.width * (isCustomHitArea ? this._buttonOptions.hitAreaScale.x : 1);
    this.bottom = this._sprite.height * (isCustomHitArea ? this._buttonOptions.hitAreaScale.y : 1);
    this.left   = -this._sprite.anchor.x * this.right;
    this.top    = -this._sprite.anchor.y * this.bottom;

    // set custom hit area.

    if (typeof this._buttonOptions === "object" && isCustomHitArea) {
      this._container.hitArea = new PIXI.Rectangle(this.left, this.top, this.right, this.bottom);
    }
  }

  addButtonListeners() {
    this._container.on("pointerdown", this.onButtonPressed.bind(this));
    this._container.on("pointerup", this.onButtonUnPressed.bind(this, true));
    this._container.on("pointerupoutside", this.onButtonUnPressed.bind(this, false));
    this._container.on("pointercancel", this.onButtonUnPressed.bind(this, false));
    this._container.on("pointermove", this.onMove.bind(this));
  }

  onButtonPressed() {
    if (!core.buttonsAvailable) return;

    this._pressed         = true;
    core.buttonsAvailable = false;

    if (this.useAttachments) {
      const { name, attachments } = this._buttonOptions;
      this._parent.addAttachment({ slot: name, sprite: attachments.pressed });
    } else {
      const scalesButton = this.scalesButton;
      this._bone.scaleX  = scalesButton.pressed;
      this._bone.scaleY  = scalesButton.pressed;
    }

    this._bone.update();
  }

  onMove(event) {
    if (!this._pressed) return;
    const position = event.currentTarget.toLocal(event.data.global);

    if (position.x < this.left || position.x > this.right || position.y < this.top || position.y > this.bottom) {
      this.onButtonUnPressed(false);
    }
  }

  onButtonUnPressed(callHandler) {
    if (!this._pressed) return;
    
		  core.buttonsAvailable = true;

    if (this.useAttachments) {
      const { name, attachments } = this._buttonOptions;
      this._parent.addAttachment({ slot: name, sprite: attachments.unpressed });
    } else {
      const scalesButton = this.scalesButton;
      this._bone.scaleX  = scalesButton.unpressed;
      this._bone.scaleY  = scalesButton.unpressed;
    }

    if (this._pressed && callHandler && this._handler) {
      this._handler();
    }

    this._pressed = false;
  }
}
