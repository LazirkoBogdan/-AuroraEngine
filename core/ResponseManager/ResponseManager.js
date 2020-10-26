/**
 * ResponseManager main class
 * @exports ResponseManager
 */
export default class ResponseManager {
  responseError = {};

  constructor() {
    this._createHandlers();
  }

  reset(handler) {
    this.responseError[handler] = () => {};
  }

  /**
   * @public
   * create Config
   */
  _createHandlers() {
    this.responseError.fourHundredOne = () => {
      console.log('Authenticator response error : get new token');
    };

    this.responseError.fourHundredOneComplete = () => {
      console.log('Authenticator response fix');
    };

    this.responseError.fourHundredTwentyTwo = () => {
      console.log('send wrong data , start manager function');
    };

    this.responseError.fiveHundred = () => {
      console.log('server error,  Sorry Game is closing');
    };

    this.responseError.internetLost = () => {
      console.log('internet Connection is lost ,  Sorry Game is closing');
    };
  }
  
  activateHandlers(handler) {
  core.buttonsAvailable = true;
    this.responseError[handler]();
  }

  setErrorHandlers(handler, fn) {
    this.responseError[handler] = fn;
  }
}
