import Button              from "./Button";
import currencyToSymbolMap from "currency-symbol-map";

export default class Currency extends Button {
  _disableSlider = false;

  constructor(config) {
    super(config);
    this._balances      = [];
    this._balance       = null;
    this._disableSlider = false;
    this.isSliderOpen   = false;

    this.sliderContainer = new core.display.Container();
    this.addChild(this.sliderContainer);

    this._position = 0;
    this.sliding   = false;

    this.spineFlag       = this.getChildByName("flag_currency");
    this.spineFlag.alpha = 0;

    this.mainText       = this.getChildByName("text");
    this.mainText.alpha = 0;

    this.sliderContainer.alpha = 0;

    this._endFunctionAfterSlide = () => {
    };
    this._finalFunction         = () => {
    };

    this.reset();

  }

  set disableSlider(enable) {
    this._disableSlider = enable;
  }

  enable(state) {
    if (this.sliderChild && this.sliderChild.length - 1 <= 0) state = false;
    this.interactivity = state;
    this.disableSlider = !state;
  }

  get disableSlider() {
    return this._disableSlider;
  }

  showHide(obj, on, duration, cb) {
    let tween = core.tween.TweenMax.to(obj, duration, {
      alpha: on ? 1 : 0, ease: core.tween.Cubic.easeIn, onComplete: () => {
        if (cb) cb();
        tween.kill();
      },
    });
  }

  reset() {
    this.sliding               = false;
    this.spineFlag.alpha       = 0;
    this.mainText.alpha        = 0;
    this.sliderContainer.alpha = 0;
  }

  update() {
    super.update();
  }

  showPanel(cb) {
    this.spineFlag.play("show", false);
    this.showHide(this.spineFlag, true, 0.2, () => {
      this.showHide(this.mainText, true, 0.2, () => {
        if (cb) cb();
      });
    });
  }

  showSliderPanel(cb) {
    if (this._disableSlider || !this.isEnoughCurrency) return;
    this.showHide(this.mainText, false, 0.2, () => {
      this.spineFlag.play("loop->(open)", false);
      this.showHide(this.sliderContainer, true, 0.7, () => {
        if (cb) cb();
      });
    });
  }

  hideSliderPanel(cb) {
    if (this._disableSlider || !this.isEnoughCurrency) return;
    this.spineFlag.play("loop<-(close)", false);
    this.showHide(this.sliderContainer, false, 0.4, () => {
      this.showHide(this.mainText, true, 0.4);
      if (cb) cb();
    });

  }

  hidePanel(cb) {
    this.showHide(this.mainText, false, 0.2, () => {
      this.spineFlag.play("hide", false);
      this.showHide(this.spineFlag, false, 2.2, () => {
        if (cb) cb();
        this.reset();
      });

    });
  }

  set balances(balances) {
    this._balances = balances;
  }

  get balances() {
    return this._balances;
  }

  get currentBalance() {
    return this._balance;
  }

  set currentBalance(balance) {
    this._balance = balance;
  }

  get isEnoughCurrency() {
    return this.sliderChild && this.sliderChild.length - 1 > 2;
  }

  setLeftButton(button) {
    button.handler = () => {
      if (this.sliding || this.disableSlider) return;
      this.sliding = true;
      this.startSlider("left");
    };
  }

  setRightButton(button) {

    button.handler = () => {
      if (this.sliding || this.disableSlider) return;
      this.sliding = true;
      this.startSlider("right");
    };

  }

  setFunctionAfterSlide(func) {
    this._endFunctionAfterSlide = func;
  }

  setFinalFunction(func) {
    this._finalFunction = func;
  }

  createSliderElement() {
    const config     = this._config;
    this._position   = 0;
    this.sliderChild = [];

    const containerMask = new core.display.Graphics(config.elements.mask);
    containerMask.updateConfig(false);
    this.addChild(containerMask);

    this.sliderContainer.mask = containerMask;

    this._balances.forEach((info, i) => {
      const containerElement = new core.display.Container();

      const containerConfig         = config.elements.container;
      containerElement.id           = info.id.toString();
      containerElement.number       = i;
      containerElement.currencyCode = info.currency_code;
      containerElement.balance      = info.balance;

      containerElement.x = containerConfig.start.x + (i * containerConfig.offset.x);
      containerElement.y = containerConfig.offset.y;

      this.sliderChild.push(containerElement);

      const bgText = new core.display.Spine(config.elements.spine);
      containerElement.addChild(bgText);

      const balanceText = new core.display.DisplayText(config.elements.text);
      balanceText.text  = core.formatTextSymbol(info.balance, info.currency_code);
      containerElement.addChild(balanceText);

      const codeText = new core.display.DisplayText(config.elements.textCode);
      codeText.text  = info.currency_code;
      containerElement.addChild(codeText);

      containerElement.setText = (code, balance) => {
        if (config.elements.textCode) {
          codeText.text = code;
        }
        if (config.elements.text) {
          balanceText.text = balance;
        }
      };

      containerElement.setStyle = (style, unselected) => {
        if (config.elements.textCode) {
          codeText.style = unselected;
        }
        if (config.elements.text) {
          balanceText.style = style;
        }
      };

      let id = String(info.id);
      if (id === game.env.currencyID.toString()) {

        this.sliderContainer.x = -(i * 280);
        this._position         = i;

        containerElement.setStyle(config.selectedElement.style, config.selectedElement.styleCode);
        this.currentElement = containerElement;
      } else {
        containerElement.setStyle(config.unselectedElement.style, config.unselectedElement.styleCode);
      }

      this.sliderContainer.addChild(containerElement);

    });

    if (this._balances.first.id.toString() === game.env.currencyID.toString()) {
      this.moveAnyContainer(-1);
    } else {
      this.moveAnyContainer(this._balances.length - 1, true);
    }

    this.sliderLength = this.sliderChild.length;
    if (this.sliderChild.length - 1 <= 0) {
      this.enable(false);
      Object.values(this.spineFlag.buttons).forEach(btn => btn._sprite.visible = false);
    }
  }

  resetSliderBar() {
    const config          = this._config;
    const containerConfig = config.elements.container;
    this._position        = 0;
    this.sliderChild.forEach((child, i) => {
      child.x = containerConfig.start.x + (i * containerConfig.offset.x);
      child.y = containerConfig.offset.y;

      if (child.id.toString() === game.env.currencyID.toString()) {

        child.setStyle(config.selectedElement.style, config.selectedElement.styleCode);
        this.currentElement = child;
      } else {
        child.setStyle(config.unselectedElement.style, config.unselectedElement.styleCode);
      }
    });

    this.moveAnyContainer(this.sliderChild.length - 1, true);
  }

  startSlider(direct, cb) {
    switch (direct) {
      case "left":
        this._position--;
        this.moveSliderLeft(cb);
        break;
      case "right":
        this._position++;
        this.moveSliderRight(cb);
        break;
    }
  }

  moveAnyContainer(position, direct) {
    const config  = this._config;
    const lastObj = this.sliderChild.length;
    let container;
    if (this.sliderChild.length <= 2) {
      container   = this.sliderChild[0];
      container.x = config.elements.container.start.x;
    } else {
      container   = direct ? this.sliderChild[position] : this.sliderChild[lastObj - (-position)];
      container.x = direct ? config.elements.container.start.x + position * 280 : config.elements.container.start.x + position * 280;
    }

  }

  moveSliderLeft(cb) {
    const config = this._config;

    let position = this._position < 0 ? -this._position : this._position;
    if (this.sliderLength === position) {
      this._position         = 0;
      this.sliderContainer.x = -config.elements.container.start.x;
      this.moveAnyContainer(1, true);
    }

    this.currentElement.setStyle(config.unselectedElement.style, config.unselectedElement.styleCode);
    let container;
    const lastObj = this.sliderChild.length;

    if (this._position === 0) {
      container = this.sliderChild[this._position];
    } else {
      container = this._position < 0 ? this.sliderChild[this._position + lastObj] : this.sliderChild[this._position];
    }

    this.currentElement = container;
    this.currentElement.setStyle(config.selectedElement.style, config.selectedElement.styleCode);
    let nextContainer;
    if (this._position === 0) {
      nextContainer = this.sliderChild[lastObj - 1];
    } else {
      nextContainer = this._position < 0 ? this.sliderChild[lastObj + (this._position - 1)] : this.sliderChild[this._position - 1];
    }
    if (nextContainer) {
      nextContainer.x = config.elements.container.start.x + (this._position - 1) * 280;
    }
    container.x = config.elements.container.start.x + this._position * 280;

    this._endFunctionAfterSlide(this.currentElement, () => {
      this.tweenSlider(this.sliderContainer, {
        x: this.sliderContainer.x + 280, ease: core.tween.Cubic.easeInOut,
      }, 0.6, cb);
    });

  }

  moveSliderRight(cb) {
    const config = this._config;

    const lastObj = this.sliderChild.length;
    if (this.sliderLength === this._position) {
      this._position         = 0;
      this.sliderContainer.x = config.elements.container.start.x + 0;
      this.moveAnyContainer(-1);
    }

    this.currentElement.setStyle(config.unselectedElement.style, config.unselectedElement.styleCode);

    let container;
    if (this._position === 0) {
      container = this.sliderChild[this._position];
    } else {
      container = this._position < 0 ? this.sliderChild[this._position + lastObj] : this.sliderChild[this._position];
      if (container === undefined) {
      }
    }

    this.currentElement = container;
    this.currentElement.setStyle(config.selectedElement.style, config.selectedElement.styleCode);
    let nextContainer;
    if (this.sliderChild[this._position + 1]) {
      nextContainer = this.sliderChild[this._position + 1];
    } else {
      nextContainer = this.sliderChild[0];
    }
    if (nextContainer) {
      nextContainer.x = +config.elements.container.start.x + (this._position + 1) * 280;
    }
    container.x = config.elements.container.start.x + this._position * 280;

    this._endFunctionAfterSlide(this.currentElement, () => {
      this.tweenSlider(this.sliderContainer, {
        x: this.sliderContainer.x - 280, ease: core.tween.Cubic.easeInOut,
      }, 0.6, cb);
    });

  }

  tweenSlider(slider, prop, duration, cb) {

    const tween = core.tween.TweenMax.to(slider, duration, prop);
    tween.eventCallback("onComplete", () => {
      tween.kill();
      this.sliding = false;
      if (cb) cb();

    });
  }

}
