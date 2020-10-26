export default class AppleGameItem extends logic.submodels.GameItem {

  _control_number = 0;

  _cell_number;

  _positions = 0;

  _map = [];

  constructor(data) {
    super(data);

    this._control_number = data.control_number;
    this._positions      = data.positions;
    this._map            = data.map;
    this._winStatus      = data.status;
    this._possibleWin    = data.possible_win;
    this._sumWin         = data.sum_win;

  }

  get possibleWin() {
    return this._possibleWin;
  }

  get controlNumber() {
    return this._control_number;
  }

  get cellNumber() {
    return this._cell_number;
  }

  get map() {
    return this._map;
  }

  get positions() {
    return this._positions;
  }

  set cellNumber(value) {
    this._cell_number = value;
  }

}