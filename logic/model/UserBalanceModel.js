import UserBalanceItem from './UserBalanceItem';
export default class UserBalanceModel {
  _userBalance;

  setData(data) {
    this._userBalance = new logic.submodels.UserBalanceItem(data);
  }

  setBalance(data) {
    if (this._userBalance) this._userBalance.setBalance(data);
  }

  get userBalance() {
    return this._userBalance;
  }
}
