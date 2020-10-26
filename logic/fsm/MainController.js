import StateMachine        from "./SubControllers/stateMachine/StateMachine";
import currencyToSymbolMap from "currency-symbol-map";

export default class MainController {
  /**
   * Keep link on components Classes
   * @type {*}
   */
  components = {};

  /**
   * UI elements Sub Controller
   * @type {*}
   */
  uiSubController;

  /**
   * Response Manager
   * @type {*}
   */
  responseManager;

  /**
   * state From State Machine
   * @type {*}
   */
  state;

  /**
   * states From State Machine
   * @type {*}
   */
  states;

  previous = "";

  constructor(model, responseManager) {
    this.model                     = model;
    this.responseManager           = responseManager;
    this.stateMachineSubController = new logic.fms.StateMachineSubController(this);
  }

  /**
   * @public
   * start
   */
  start() {

    this.uiSubController = new logic.fms.uiSubController(this);
    this.onStart();

    window.pop = () => this.serverErrorPopup();
  }

  /**
   * @public
   * after start game
   */
  onStart() {
    this.addResponseManagerHandlers();
    if (this.model.recovery) {
      this._changeState("recovery");
      this.hidePreloader({}, () => {
      });
    } else {
      this.hidePreloader({}, () => {
        this.isUIShow = false;
        this._changeState("initialGame");
      });
    }


  }

  /**
   * @public
   * reset game
   */
  reset() {
    this.updateUI();
    this._changeState("initialGame");
  }

  /**
   * @public
   * Exit game
   */
  exitGame() {
    if (this.gameFinish) {
      return;
    }

    this.gameFinish = true;

    console.log("Exit Game");

    if (core.isMobile(false)) {
      window.location.href = "webview://close";
      core.sendAppMessage("Close Webview", game.env.platformId);
    }
  }

  /**
   * @public
   * Restart
   */
  restartGame() {
    if (this.gameFinish) {
      return;
    }

    this.gameFinish = true;

    console.log("restart Game");

    if (core.isMobile(false)) {
      window.location.href = "webview://restart";
      core.sendAppMessage("restart Webview", game.env.platformId);
    }
  }

  /**
   * @public
   * @param  {boolean} state
   * press
   */
  showLoading() {
    const config = { name: "chipLoader" };
    if (this.components.loading)
      this.components.loading.showLoading(config);
  }

  /**
   * @public
   * @param  {boolean} state
   * press
   */
  hideLoading() {
    if (this.components.loading)
      this.components.loading.hideLoading();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showPreloader(cb) {
    this.components.preloader.showPreloader(cb);
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  hidePreloader(config, cb) {
   this.components.preloader.hidePreloader(config, cb);
  }

  /**
   * @public
   * @param  {cb} function
   * press
   */
  hidePopups(cb) {

    const config = this.currencyPopupConfig();
    if (cb) config.callback = cb;
    this._changeState("popup");
    this.components.popup.hidePopups(config);
  }


  /**
   * @public
   * @param  {cb} cb
   * press
   */
  addResponseManagerHandlers() {
    this.responseManager.setErrorHandlers("fourHundredOne", () => this.showLoading());
    this.responseManager.setErrorHandlers("fourHundredOneComplete", () => this.hideLoading());
    this.responseManager.setErrorHandlers("fourHundredTwentyTwo", () => this.dataErrorPopup());
    this.responseManager.setErrorHandlers("fiveHundred", () => this.serverErrorPopup());
    this.responseManager.setErrorHandlers("internetLost", () => this.showConnectionPopup());
  }


  /**
   * @public
   * @param  {cb} cb
   * press
   */
  updateUI() {
    core.buttonsAvailable = false;
    core.call(() => {
      core.buttonsAvailable = true;
    }, 1000);
    //	this.components.ui.updateUI();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showCurrencyPopup() {
    const config = this.currencyPopupConfig();
    this.components.popup.showPopup(config);
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  currencyPopupConfig() {
    return {
      name:              "currency",
      type:              "choice",
      backPreviousState: true,
      action:            data => {
        this.changeAccount(data);
      },
      close:             () => {
        let config = {
          changeLine: false,
        };
        this.components.popup.setLine(config);
      },
      button:            {
        action: "yesButton",
        close:  "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  changeAccount(data) {
    if (data) {
      const newAccountId = data.balanceInfo.id;
      if (newAccountId === game.env.accountID) return;
      core.buttonsAvailable   = false;
      this.model.temporaryBet = 1;
      this.clearBet();
      game.network.getOtherBalance(newAccountId, () => {
        game.env.accountID = newAccountId;
        game.network.getLimits(() => {
          this.model.updateLimits();
          this._changeState("initialGame");

          core.call(() => {
            this.updateStateUI(this.state);
            this.updateUI();
            core.buttonsAvailable = true;
          }, 1000);

        });
      });
    }

  }

  updateStateUI(state) {
    core.needUpdateState = true;
	  if(this.components.ui!==undefined){
		  this.components.ui.updateUI();
	  }

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showNoMoneyPopup() {
    this.model.temporaryBet = 0;
    this.clearBet();
    this.hideLoading();

    const config = this.noMoneyPopupConfig();
    this._changeState("popup");
    this.components.popup.showPopup(config);

  }

  shiftUIElements(config) {
    if (config) {
      const components = config.components;
      components.forEach((config) => {
        if (this.components[config.name]) {
          this.components[config.name].shiftUIElements(config);
        }
      });
    }
  }


  /**
   * @public
   * @param  {cb} cb
   * press
   */
  noMoneyPopupConfig() {

    const title = core.getTranslation("title", "popupNoMoney");

    const minBetText = core.getTranslation("description", "popupNoMoney");

    const description = `${minBetText}`;
    return {
      name:              "limit",
      type:              "simple",
      backPreviousState: true,
      updateChild:       true,
      children:          [
        {
          type: "text",
          name: "title",
          text: title,
        }, {
          type: "text",
          name: "description",
          text: description,
        },
      ],
      button:            {
        close: "okButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showConnectionPopup() {
    const config = this.connectionPopupConfig();
    this._changeState("popup");
    this.components.popup.showPopup(config);
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
      backPreviousState: true,
      action:            () => this.exitGame(),
      button:            {
        action: "yesButton",
        close:  "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  dataErrorPopup() {
    const config = this.dataErrorPopupConfig();
    this._changeState("popup");
    this.components.popup.showPopup(config);
    this.hideLoading();
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
      backPreviousState: true,
      children:          [
        {
          type: "text",
          name: "title",
          text: core.getTranslation("title", "popupDataError"),
        }, {
          type: "text",
          name: "description",
          text: core.getTranslation("description", "popupDataError"),
        },
      ],
      updateChild:       true,
      close:             () => {
        core.buttonsAvailable = true;
      },
      action:            () => this.exitGame(),
      button:            {
        action: "yesButton",
        close:  "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  serverErrorPopup() {
    const config = this.serverErrorPopupConfig();
    this._changeState("popup");
    this.components.popup.showPopup(config);
    this.hideLoading();
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
      backPreviousState: true,
      children:          [
        {
          type: "text",
          name: "title",
          text: core.getTranslation("title", "popupDataError"),
        }, {
          type: "text",
          name: "description",
          text: core.getTranslation("description", "popupDataError"),
        },
      ],
      updateChild:       true,
      close:             () => this.exitGame(),
      action:            () => this.exitGame(),
      button:            {
        action: "yesButton",
        close:  "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showHomePopup() {
    core.buttonsAvailable = false;
    const config          = this.homeButtonConfig();
	  this._changeState("popup");
    this.components.popup.showPopup(config);
    this.hideLoading();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  homeButtonConfig() {
    return {
      name:              "home",
      type:              "choice",
      backPreviousState: false,
      action:            this.exitGame,
      button:            {
        action: "yesButton",
        close:  "noButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showWrongBetPopup(over) {
    this.model.temporaryBet = 0;
    this.clearBet();
    const config = this.wrongBetPopupConfig(over);
    this._changeState("popup");
    this.components.popup.showPopup(config);

    this.hideLoading();
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  wrongBetPopupConfig(over) {
    const minBetText  = core.getTranslation("description", "popupLimits").min;
    const maxBetText  = core.getTranslation("description", "popupLimits").max;
    const description = over
      ? `${maxBetText} ${this.formatCurrency(this.model.maxBet)}`
      : `${minBetText} ${this.formatCurrency(this.model.minBet)}`;
    return {
      name:              "limit",
      type:              "simple",
      updateChild:       true,
      backPreviousState: true,
      children:          [
        {
          type: "text",
          name: "title",
          text: core.getTranslation("title", "popupLimits"),
        }, {
          type: "text",
          name: "description",
          text: description,
        },
      ],
      button:            {
        close: "okButton",
      },
    };
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showHistory(cb) {

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  hideHistory(cb) {

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  showRule(cb) {

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  hideRules(cb) {

  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  makeButtonBet(config) {

    if (typeof this.model.temporaryBet !== "number") {
      parseFloat(this.model.temporaryBet);
    }
    core.buttonsAvailable = false;

    const calculateTempBalance = Math.floor(this.model.temporaryBet * 100) / 100 + config.price;

    if (calculateTempBalance > this.model.user.userBalance.balance) {
      this.showNoMoneyPopup();
      return;
    }
    if (calculateTempBalance <= this.model.user.userBalance.balance && calculateTempBalance <= this.model.maxBet) {
      this.model.temporaryBet = calculateTempBalance;
      this._checkBetState(config, true);
    } else {
      this.showWrongBetPopup(true);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  makeInputBet(bet) {
    this.model.temporaryBet = 0;
    const tempBalance       = (this.model.temporaryBet += bet);
    core.buttonsAvailable   = false;
    if (tempBalance > this.model.user.userBalance.balance) {
      this.showNoMoneyPopup();
      return;
    }
    if (tempBalance <= this.model.user.userBalance.balance && tempBalance <= this.model.maxBet) {
      this.model.temporaryBet = tempBalance;
      this._checkBetState(null, false);
    } else {
      this.showWrongBetPopup(true);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  clearBet() {
    this.model.temporaryBet = 0;
    this.components.ui.clearBet();
    this.updateUI();
    this._changeState("initialGame");
  }


  /**
   * @public
   * @param  {cb} cb
   * press
   */
  minBetPress() {
    const config            = {};
    this.model.temporaryBet = 0;
    core.buttonsAvailable   = false;
    if (this.model.user.userBalance.balance >= this.model.minBet) {
      this.model.temporaryBet = this.model.minBet;
      this._checkBetState(config, false);
    } else {
      this.showWrongBetPopup(false);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  maxBetPress() {
    const config            = {};
    core.buttonsAvailable   = false;
    this.model.temporaryBet = 0;
    if (this.model.user.userBalance.balance > this.model.minBet) {
      this.model.temporaryBet = this.model.user.userBalance.balance < this.model.maxBet
        ? this.model.user.userBalance.balance
        : this.model.maxBet;
      this._checkBetState(config, false);
    } else {
      this.showWrongBetPopup(true);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  multiplierPress() {
    const config               = {};
    core.buttonsAvailable      = false;
    const doubleMultiplier     = 2;
    const calculateTempBalance = this.model.temporaryBet * doubleMultiplier;

    if (calculateTempBalance > this.model.user.userBalance.balance) {
      this.showNoMoneyPopup();
      return;
    }

    if (this.model.user.userBalance.balance === 0) {
      this.showNoMoneyPopup();
      return;
    }

    if (calculateTempBalance <= this.model.maxBet && calculateTempBalance <= this.model.user.userBalance.balance) {
      if (calculateTempBalance === 0) {
        this.model.temporaryBet = this.model.minBet;
      } else {
        this.model.temporaryBet = this.model.temporaryBet * doubleMultiplier;
      }

      this._checkBetState(config, false);
    } else {

      this.showWrongBetPopup(true);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  dividerPress() {
    const doubleDivider = 0.5;
    const config        = {};

    let calculateTempBalance = this.model.temporaryBet * doubleDivider;
    let calBalanceMin        = false;
    if (this.model.user.userBalance.balance === 0) {
      this.showNoMoneyPopup();
      return;
    }
    core.buttonsAvailable = false;
    if (calculateTempBalance === 0) {
      calculateTempBalance = this.model.minBet;
      calBalanceMin        = true;
    }
    if (calculateTempBalance >= this.model.minBet) {

      if (calBalanceMin) {
        this.model.temporaryBet = this.model.minBet;
      } else {
        this.model.temporaryBet = this.model.temporaryBet * 0.5;
      }

      this._checkBetState(config, false);
    } else {
      this.showWrongBetPopup(false);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  formatCurrency(value) {
    let currencyLogo = currencyToSymbolMap(game.model.user.userBalance.currencyCode);

    if (currencyLogo === undefined) currencyLogo = "$ ";

    let nf = core.Intl.NumberFormat(undefined, {
      style:    "currency",
      currency: game.model.user.userBalance.currencyCode,
    });

    return nf.format(value).replace(game.model.user.userBalance.currencyCode, currencyLogo);
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  _changeState(state) {
    console.log(state);
    core.needUpdateState = true;

    if (this.state !== state) {
      this.previous = this.state;
    }
    this.state = this.states.machine.transition(this.state, "switch", state);
    console.log("currentState ", this.state);
  }


  /**
   * @public
   * @param  {cb} cb
   * press
   */
  backPreviousState() {
    console.log("prevState ", this.previous);
    core.needUpdateState = true;
    this.state           = this.states.machine.transition(this.state, "switch", this.previous);
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  _toggleFullScreen() {
    let doc   = window.document;
    let docEl = doc.documentElement;

    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    let cancelFullScreen  = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

  /**
   * @public
   * @param  {cb} cb
   * press
   */
  _checkBetState(config, move) {
    if (this.model.temporaryBet !== 0 && this.model.temporaryBet >= this.model.minBet) {
      if (this.state !== "betGame") this._changeState("betGame");
      move ? this.components.ui.moveChip(config) : this.components.ui.generateChips(this.model.temporaryBet);
      this.updateUI();
      core.call(() => {
        core.buttonsAvailable = true;
      }, 2500);

    } else {

      this.showWrongBetPopup(false);

    }
  }

}
