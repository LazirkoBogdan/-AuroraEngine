import StatusItem from './StatusItem';

export default class StatusModel {
  _status;

  setData(data) {
    this._status = new StatusItem(data);
  }

  get status() {
    return this._status;
  }
}
