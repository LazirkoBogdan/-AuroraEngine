import PayloadItem from './PayloadItem';

export default class PayloadModel {
  _payloadGame;

  setData(data) {
    this._payloadGame = new PayloadItem(data);
  }

  get payloadGame() {
    return this._payloadGame;
  }
}
