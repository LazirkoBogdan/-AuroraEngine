import Button from "./Button";

export default class ButtonInputText extends Button {
  text;

  inputText;

  constructor(config) {
    super(config);
    this.text           = this.getChildByName("text");
    this.inputText      = this.getChildByName("inputText");
    const configHandler = this._getHandlersForTextInput();
    this.inputText.addHandlers(configHandler);
    this.interactivity = true;
  }

  disabledInput(state) {
    this.inputText.disabled = state;
  }

  reset() {
  }

  updateState(state) {
    super.updateState(state);

    const config = this._config;
    if (config.states && config.states[state]) {
      this._lastState  = state;
      const paramState = config.states[state];
      if (paramState.hasOwnProperty("inputTextEnable")) {
        this.inputText.disabled = paramState.inputTextEnable;
      }
    }
  }

  _getHandlersForTextInput() {
    return {
      onEnter: () => {
        this._onTextInputEnter();
      },
      onExit:  () => {
        this._onTextInputExit();
      },
    };
  }

  addOnGameContentFocusListener() {
    game.application.mainContainer.interactive = true;

    const onGameFocus = () => {
      game.application.mainContainer.interactive = false;
      game.application.mainContainer.off("pointerdown", onGameFocus);
      core.bluerKeyboard();
    };
    game.application.mainContainer.on("pointerdown", onGameFocus);
  }


  _onTextInputEnter() {

    this.addOnGameContentFocusListener();

    core.buttonsAvailable = false;
    core.isMobileKeyboard = true;
    this.text.visible     = false;
  }

  _onTextInputExit() {
    if (this.handler) {
      let textDot = this.addComma(this.inputText.text);
      if (textDot === "") {
        textDot = game.model.minBet;
      }

      this.inputText.text = "";
      this.text.visible   = true;

      setTimeout(() => {
        core.isMobileKeyboard = false;
        core.buttonsAvailable = true;
      }, 500);

      this.handler(textDot);
    }
  }

  addComma(num) {
    return num.replace(/,/g, ".");
  }
}
