import PayloadModel from './PayloadModel';
import UserBalanceModel from './UserBalanceModel';
import GameModel from './GameModel';
import StatusModel from './StatusModel';
import TranslationModel from './TranslationModel';
import HistoryModel from './HistoryModel';

export default class Model {
  maxBet;
  minBet;
  coefficient;
  chipsValue;
  recovery = false;
  temporaryBet = 0;
  allBalance = [];
  wins = 0;
  lose = 0;
  draw = 0;
  gameCount = 0;
  constructor() {
    this.limits = new PayloadModel();
    this.user = new UserBalanceModel();
    this.status = new StatusModel();
    this.game = new GameModel();
    this.libary = new TranslationModel();
    this.info = new HistoryModel();
    this.wins = 0;
    this.lose = 0;
    this.draw = 0;
    this.gameCount = 0;
  }

  setAllBalance(data) {
    this.allBalance = data;
  }

  setData(data) {
    const payload = data.payload;
    if (payload.game) this.game.setData(payload.game);
    if (payload.balance) this.user.setBalance(payload.balance);
    if (payload.card_opened) this.game.setCardOpened(payload.card_opened);
    if (payload.cards_completed)
      this.game.setCardsCompleted(payload.cards_completed);
  }

  updateLimits() {
    this.chipsValue = this.limits.payloadGame.chips;
    this.maxBet = this.limits.payloadGame.maxBet;
    this.minBet = this.limits.payloadGame.minBet;
    this.coefficient = this.limits.payloadGame.coefficient;
  }
}
