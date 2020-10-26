export default class AppleMainController extends logic.fms.MainController {

  constructor(model, responseManager) {
    super(model, responseManager);

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  onStart() {
    super.onStart();
    this.model.temporaryBet = 0;
    this.initializingSlider();

  }

  reset() {
    this.updateUI();
    if (this.model.recovery) {
      this.resetUI(1);
    }
  }

  initializingSlider() {
    const config = this.getSliderConfig();
    this.components.ui.initSlider(config);
  }

  getSliderConfig() {
    return {
      onChangeCurrency: (data, cb) => this.changeAccount(data, cb),
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  changeAccount(data, cb) {
    if (data) {
      const newAccountId = data.id;
      if (newAccountId === game.env.accountID) return;
      core.buttonsAvailable   = false;
      this.model.temporaryBet = 0;
      // this.clearBet();
      game.network.getOtherBalance(newAccountId, () => {
        game.env.accountID = newAccountId;
        game.network.getLimits(() => {
          this.model.updateLimits();

          core.call(() => {
            this.updateLimit();

            this.updateStateUI(this.state);
            this.updateUI();
            core.buttonsAvailable = true;

          }, 1000);
          if (cb) {
            if (cb) cb();
          }

        });
      });
    }
  }

  updateLimit() {
    this.components.popup.updateLimit();
  }

  addParameterForSlider() {
    this.components.applegame.show({
      onCellChosen: (cb) => this.cellChoiceRequest(cb), onButtonStay: (cb) => this.completeGameRequest(cb),
    });
  }

  showApple(cb) {
    this._changeState("appleGame");
    this.components.applegame.show({
      onCellChosen: (cb) => this.cellChoiceRequest(cb), onButtonStay: (cb) => this.completeGameRequest(cb),
    }, cb);

  }

  hideApple() {
    this.components.applegame.hide({}, () => {
      this.reset();
      this._changeState("initialGame");
    });
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  mainLeftButtonInterective() {
    core.buttonsAvailable = false;
    core.call(() => {
      core.buttonsAvailable = true;
    }, 1000);
    this.clearBet();
  }

  showUI(cb) {
    if (this.isUIShow) return;

    this.isUIShow = true;

    this.components.ui.showUI(cb);
  }

  resetUI(alpha) {
    this.components.ui.resetUI(alpha);
  }

  hideUI(cb) {
    this.isUIShow = false;
    this.components.ui.hideUI(cb);
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  clearBet() {
    this.model.temporaryBet = 0;
    this.updateUI();
    this._changeState("initialGame");
  }

  updateUI() {
    super.updateUI();
    this.components.ui.updateUI();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  mainRightButtonInteractive() {
    core.buttonsAvailable = false;
    this.startRound();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  startRound() {
    if (this.model.temporaryBet < this.model.minBet) {
      this.showWrongBetPopup(false);
      return;
    } else if (this.model.temporaryBet > this.model.maxBet) {
      this.showWrongBetPopup(true);
      return;
    }
    const paramBet        = {
      name: "bet", sum: this.model.temporaryBet,
    };
    core.buttonsAvailable = false;
    game.network.sendRequest(paramBet, () => {
      core.buttonsAvailable = true;
      game.env.gameId       = this.model.game.params.gameId;
      this._changeState("startGame");
    });
  }

  cellChoiceRequest(cb) {
    const params = { name: "makeChoice" };
    game.network.sendRequest(params, () => {
      this.components.applegame.openSelectedLevel(() => {
        this._changeState("gameOver");
      });
      cb();
    });
  }

  completeGameRequest(cb) {
    const params = { name: "completeGame" };
    cb();
    game.network.sendRequest(params, () => {
      this._changeState("gameOver");
    });
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showEndGamePopup(cb) {
    core.buttonsAvailable   = false;
    const config            = this.endGamePopupConfig();
    this.model.temporaryBet = 0;
   // this.updateUI();
    this.components.popup.showPopup(config, () => {
	  
      if (cb) cb();
    });
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  dataErrorPopupConfig() {
    return {
      name:              "internet",
      type:              "choice",
      children:          [
        {
          type: "text", name: "title", text: core.getTranslation("title", "popupDataError"),
        }, {
          type: "text", name: "description", text: core.getTranslation("description", "popupDataError"),
        },
      ],
      updateChild:       true,
      skin:              "no_wi-fi",
      backPreviousState: true,
      spine:             "win-win-lose_notification",
      close:             () => {
        core.buttonsAvailable = true;
      },
      action:            () => this.exitGame(),
      button:            {
        action: "yesButton", close: "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  serverErrorPopupConfig() {
    return {
      name:              "internet",
      type:              "choice",
      children:          [
        {
          type: "text", name: "title", text: core.getTranslation("title", "popupDataError"),
        }, {
          type: "text", name: "description", text: core.getTranslation("description", "popupDataError"),
        },
      ],
      skin:              "no_wi-fi",
      backPreviousState: true,
      spine:             "win-win-lose_notification",
      updateChild:       true,
      close:             () => this.exitGame(),
      action:            () => this.exitGame(),
      button:            {
        action: "yesButton", close: "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  endGamePopupConfig() {
    const sumWin                = this.model.game.params.sumBet;
    const currencyCode          = this.model.user.userBalance.currencyCode;
    const stylePopupLabel       = StyleText.popupGameOver.label.title;
    const stylePopupDescription = StyleText.popupGameOver.label.description;

    const paramPopups       = {};
    paramPopups.name        = "gameOver";
    paramPopups.type        = "simple";
    paramPopups.spine       = "win-win-lose_notification";
    paramPopups.updateChild = true;
    paramPopups.button      = {
      close: "okButton",
    };

    const winSum    = this.model.game.params.sumWin;
    let label       = "";
    let description = "";
    let skin;

    switch (this.model.game.params.winStatus) {
      case 0:
      case 1:
        break;
      case 2:
        label       = `${core.getTranslation("title", "popupGameOver")}`;
        skin        = "win";
        description = `${core.getTranslation("description", "popupGameOver")}  ${core.formatTextSymbol(this.model.game.params.sumWin)}`;
        break;

      case 3:
        label       = `${core.getTranslation("title", "popupGameOverLose")}`;
        description = `${core.getTranslation("description", "popupGameOverLose")}`;
        skin        = "lose";
        break;

      default:
        break;
    }
    if (skin) paramPopups.skin = skin;
    paramPopups.children = [
      {
        type: "text", name: "text", text: label, style: stylePopupLabel,
      },

      {
        type: "text", name: "description", text: description, style: stylePopupLabel,

      },
    ];

    this.updateUI();
    return paramPopups;
  }

  _checkBetState(config, move) {
    core.buttonsAvailable = false;
    if (this.model.temporaryBet !== 0 && this.model.temporaryBet >= this.model.minBet) {
      if (this.state !== "betGame") this._changeState("betGame");
      this.updateUI();
      core.call(() => {
        core.buttonsAvailable = true;
      }, 2500);

    } else {
      this.showWrongBetPopup(false);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showRulesPopup() {
    core.buttonsAvailable = false;
    const config          = this.rulesConfig();
    this._changeState("popup");
    this.components.popup.showPopup(config);
    this.hideLoading();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  rulesConfig() {
    return {
      name:              "rules",
      type:              "simple",
      skin:              "how_to_play-v",
      spine:             "win-win-lose_notification",
      backPreviousState: true,
      action:            this.exitGame,
      button:            {
        close: "closeButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  connectionPopupConfig() {
    return {
      name:              "internet",
      type:              "choice",
      skin:              "how_to_play-v",
      spine:             "win-win-lose_notification",
      backPreviousState: true,
      action:            () => this.exitGame(),
      button:            {
        action: "yesButton", close: "noButton",
      },
    };
  }

  showExitGamePopup() {
    core.buttonsAvailable = false;
    const config          = this.exitGameConfig();
    this._changeState("popup");
    this.components.popup.showPopup(config);
    this.hideLoading();
  }

  noMoneyPopupConfig() {
    core.buttonsAvailable = false;
    const config          = super.noMoneyPopupConfig();

    config.spine = "win-win-lose_notification";
    config.skin  = "pig";
    return config;
  }

  wrongBetPopupConfig(over) {
    core.buttonsAvailable = false;
    const config          = super.wrongBetPopupConfig(over);

    config.spine = "win-win-lose_notification";
    config.skin  = "pig";
    return config;
  }

  connectionPopupConfig() {
    core.buttonsAvailable = false;
    const config          = super.connectionPopupConfig();
    config.skin           = "no_wi-fi";
    config.spine          = "win-win-lose_notification";
    return config;
  }

  homeButtonConfig() {
    core.buttonsAvailable = false;
    const config          = super.homeButtonConfig();
    config.skin           = "home";
	  config.backPreviousState = true,
    config.spine          = "win-win-lose_notification";
    return config;
  }

  exitGameConfig() {
    core.buttonsAvailable = false;
    return {
      name: "exit", type: "choice", backPreviousState: true, action: this.exitGame, button: {
        action: "yesButton", close: "noButton",
      },
    };
  }

}
