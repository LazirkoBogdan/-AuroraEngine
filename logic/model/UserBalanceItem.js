export default class UserBalanceItem {
  _id;
  _balance;
  _currencyCode;
  _account_name;

  constructor(data) {
    this._id = data.id;
    this._balance = data.balance;
    this._currencyCode = data.currency_code;
    this._account_name = data.account_name;
  }

  setBalance(data) {

    if (data && data.after) this._balance = data.after;
  }

  get id() {
    return this._id;
  }

  get balance() {
    return this._balance;
  }

  get currencyCode() {
    return this._currencyCode;
  }

  get account_name() {
    return this._account_name;
  }
}
