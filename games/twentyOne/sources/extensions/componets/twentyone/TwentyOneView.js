export default class TwentyOneView extends game.component.View {
  show(config, cb) {
    super.show(config, cb);

    this.field = this._getChildByName('field');

    this.cardField = this.field.getChildByName('cardfield');

    this.isTwentyShow = false;
  }

  giveUserCard(config) {
    this.cardField.uiCallBack = config.uiUpdate;
    this.cardField.givePlayerCards(config);
  }

  showCards(config) {
    this.tweenAlphaObj(this, true, 0.1);
  }

  hideCards(config) {
    this.tweenAlphaObj(this, false, 0.1);
  }

  tweenAlphaObj(obj, on, duration) {
    const tween = core.tween.TweenMax.to(obj, duration, { alpha: on ? 1 : 0 });
    tween.eventCallback('onComplete', () => {
      tween.kill();
    });
  }

  resetGame(cb) {
    this.cardField.endGame(() => {
      if (cb) cb();
    });
  }
}
