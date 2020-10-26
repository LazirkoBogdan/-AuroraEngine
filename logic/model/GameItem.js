export default class GameItem {
  _sumBet;

  _gameId;

  _status;

  _winNow;

  _winStatus;

  _winType;

  _cardsDealer;

  _cardsUser;

  _sumWin = 0;

  _cardOpened = null;

  _cardsCompleted = null;

  _userScore = 0;

  _dealerScore = 0;

  constructor(data) {
    game.env.accountID  = data.account_id;
    game.env.currencyID = data.account_id;
    this._sumBet        = data.sum_bet;
    this._gameId        = data.game_id;
    this._status        = data.status;
    this._winNow        = data.win_now;
    this._winStatus     = data.win_status;
    this._winType       = data.win_type;
    this._cardsDealer   = data.cards_dealer;
    this._cardsUser     = data.cards_user;
    this._userScore     = this._calculateScore(data.cards_user);
    this._dealerScore   = this._calculateScore(data.cards_dealer);
  }

  set cardOpened(value) {
    this._cardOpened = value;
  }

  get cardOpened() {
    return this._cardOpened;
  }

  set cardsCompleted(value) {
    this._cardsCompleted = value;
  }

  get cardsCompleted() {
    return this._cardsCompleted;
  }

  set sumWin(value) {
    this._sumWin = value;
  }

  get sumWin() {
    return this._sumWin;
  }

  get sumBet() {
    return this._sumBet;
  }

  get gameId() {
    return this._gameId;
  }

  get userScore() {
    return this._userScore;
  }

  set userScore(value) {
    this._userScore = value;
  }

  get dealerScore() {
    return this._dealerScore;
  }

  set dealerScore(value) {
    this._dealerScore = value;
  }

  get status() {
    return this._status;
  }

  get winNow() {
    return this._winNow;
  }

  get winStatus() {
    return this._winStatus;
  }

  get winType() {
    return this._winType;
  }

  get cardsDealer() {
    return this._cardsDealer;
  }

  get cardsUser() {
    return this._cardsUser;
  }

  _calculateScore(cards) {
    let score = 0;
    if (cards) {
      cards.forEach((card, i) => {
        score += card.value;
        if (score === 22 && i < 2) {
          score = 21;
        }
      });
    }
    return score;
  }
}
