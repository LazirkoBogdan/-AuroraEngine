export default class GameModel {
  _params;

  setData(data) {
    this._params = new logic.submodels.GameItem(data);
  }

  setSumWin(data) {
    this._params.sumWin = data;
  }

  setCardOpened(data) {
    this._params.cardOpened = data;
  }

  setCardsCompleted(data) {
    this._params.cardsCompleted = data;
  }

  get params() {
    return this._params;
  }
}
