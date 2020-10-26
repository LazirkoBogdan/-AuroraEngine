export default class StatusItem {
  _chips;
  _limits;

  constructor(data) {
    this._chips = data.chips;
    this._limits = data.limits;
  }

  get chips() {
    return this._chips;
  }

  get limits() {
    return this._limits;
  }
}
