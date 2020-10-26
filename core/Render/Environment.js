/**
 * Environment.js
 * store for main information
 * @Class Environment
 */

export default class Environment {

  static getParameterByName(name, url) {
    if (!url) url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    const regex   = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);

    if (!results || !results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  debug;

  liveOpsUrl;

  token;

  platformId;

  gameID;

  gameNameAPI;

  resolution;

  name = "";

  type = "";

  client = "";

  _contentTypeKey = "Content-Type";

  _partnerIdKey = "x-partner-id";

  _languageCodeKey = "x-language-code";

  _appGuidKey = "x-app-guid";

  _requestClient = "x-request-client-guid";

  _countryKey = "x-build-country";

  _authTokenParameterKey = "x-authorization";

  _authUserIdParameterKey = "x-user-id";

  _platformIdParameterKey = "platform-id";

  _serverParameterKey = "api-link";

  _gameIDParameterKey = "game-id";

  _currencyAccountKey = "currency-account";

  constructor() {
  }

  initEnv(cb) {
    const element         = window.document.getElementById("APILINK");
    const apiName         = window.document.getElementById("APIGAMENAME");
    const gameIDContainer = window.document.getElementById("GAMEID");

    const userId     = Environment.getParameterByName("userId");
    const password   = Environment.getParameterByName("password");
    const platformId = Environment.getParameterByName("platformId");
    const lang       = Environment.getParameterByName("lang");

    this.debug      = Environment.getParameterByName("debug");
    this.gameMode   = Environment.getParameterByName("mode");
    this.appOptions = {};

    this.tokenHandlerFunc = () => {
    };

    if (this.gameMode === "dev") {
      this.gameNameAPI  = apiName ? apiName.innerText : "";
      this.liveOpsUrl   = element ? element.innerText : "";
      this.gameID       = gameIDContainer ? gameIDContainer.innerText : "";
      this.userID       = userId;
      this.accountID    = userId;
      this.currencyID   = userId;
      this.platformId   = platformId;
      this.languageCode = lang;
      this.password     = password;
      [element, apiName, gameIDContainer].filter(html => Boolean(html)).forEach(html => (html.innerText = ""));
      if (cb) cb();
    } else {
      this.waitParameterFromApp(() => {
        this.gameNameAPI = apiName ? apiName.innerText : "";

        this.contentType           = core.getObjectFromParameters(
          this._contentTypeKey, this.appOptions);
        this.partnerId             = core.getObjectFromParameters(
          this._partnerIdKey, this.appOptions);
        this.languageCodeParameter = core.getObjectFromParameters(
          this._languageCodeKey, this.appOptions);
        this.appGuidKey            = core.getObjectFromParameters(
          this._appGuidKey, this.appOptions);
        this.requestClientGuild    = core.getObjectFromParameters(
          this._requestClient, this.appOptions);
        this.countryKey            = core.getObjectFromParameters(
          this._countryKey, this.appOptions);
        this.authorizationToken    = core.getObjectFromParameters(
          this._authTokenParameterKey, this.appOptions);
        this.userIDParameter       = core.getObjectFromParameters(
          this._authUserIdParameterKey, this.appOptions);
        this.platformIdParameter   = core.getObjectFromParameters(
          this._platformIdParameterKey, this.appOptions);
        this.liveOpsUrlParameter   = core.getObjectFromParameters(
          this._serverParameterKey, this.appOptions);
        this.gameIDParameter       = core.getObjectFromParameters(
          this._gameIDParameterKey, this.appOptions);
        this.currencyIDparameter   = core.getObjectFromParameters(
          this._currencyAccountKey, this.appOptions);

        this.liveOpsUrl = core.getKeyFromParameters(this._serverParameterKey,
          this.liveOpsUrlParameter);

        this.userID = core.getKeyFromParameters(this._authUserIdParameterKey,
          this.userIDParameter);

        this.currencyID = core.getKeyFromParameters(this._currencyAccountKey,
          this.currencyIDparameter);

        this.accountID  = core.getKeyFromParameters(this._currencyAccountKey,
          this.currencyIDparameter);
        this.platformId = core.getKeyFromParameters(
          this._platformIdParameterKey, this.platformIdParameter);


        if (this.languageCodeParameter === "uk") this.languageCodeParameter = "ua";
        this.languageCode = core.getKeyFromParameters(this._languageCodeKey,
          this.languageCodeParameter);
        this.gameID       = core.getKeyFromParameters(this._gameIDParameterKey,
          this.gameIDParameter);
        this.token        = core.getKeyFromParameters(
          this._authTokenParameterKey, this.authorizationToken);

        core.sendAppMessage("Delivery parameter success", this.platformId);

        [element, apiName, gameIDContainer].filter(html => Boolean(html)).forEach(html => (html.innerText = ""));
        if (this.languageCode === "uk") this.languageCode = "ua";
        if (cb) cb();
      });
    }

    if (this.languageCode === "uk") this.languageCode = "ua";
  }

  waitParameterFromApp(cb) {
    const parameterFromApp = window.listHeaders;
    if (parameterFromApp.length > 0) {
      parameterFromApp.forEach(name => {
        const dom = document.getElementById(name);

        if (dom) {
          this.appOptions[name] = dom.innerText.toString();

          dom.innerText = "";
          dom.parentNode.removeChild(dom);
        }
      });

      if (cb) cb();
    } else {
      core.call(() => {
        this.waitParameterFromApp(cb);
      }, 100);
    }
  }

  getNewToken(cb) {
    this.tokenHandlerFunc = () => {
      if (cb) cb();
    };
  }

  setNewToken(token) {

    if (token) {
      this.authorizationToken.value = token;
      this.tokenHandlerFunc();
    } else {
      core.sendAppMessage("bad re-fresh token", this.platformId);
    }
  }

  get assetsUrl() {
    const baseAssetsUrl = "./assets";
    return `${baseAssetsUrl}/`;
  }
}
