import Core from "../../core";

export default class PayloadItem {
  _chips;
  _minBet;
  _maxBet;
  _coefficient;
  _account;

  constructor(data) {
    this._chips       = data.chips;
    this._minBet      = data.limits.min_bet;
    this._maxBet      = data.limits.max_bet;
    this._account     = data.account;
    this._coefficient = data.limits.coefficient;
  }

  get account() {
    return this._account;
  }

  get chips() {
    return this._chips;
  }

  get minBet() {
    return this._minBet;
  }

  get maxBet() {
    return this._maxBet;
  }

  get coefficient() {
    return this._coefficient;
  }
}
