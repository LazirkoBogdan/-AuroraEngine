export default class SettingsView extends game.components.UI.src.View {
  show() {
    super.show();
    this.visible = false;
    this.bg = this._getChildByName('bg');
    this.buttonBack = this._getChildByName('back');
    this.buttonBack.handler = () => {
      this.tweenSettings(false, 0.5);
    };
  }

  showSetting(cb) {
    this.alpha = 0;
    this.visible = true;
    this.tweenSettings(true, 0.5);
    if (cb) cb();
  }

  hideSetting(cb) {
    const config = {
      name: 'input_sum_place',
      state: false
    };
    game.mainController.components.ui.disableSceneInput(config);
    this.tweenSettings(false, 0.5);
    if (cb) cb();
  }

  tweenSettings(on, duration) {
    this.bg.cacheAsBitmap = false;
    const tween = core.tween.TweenMax.to(this, duration, { alpha: on ? 1 : 0 });
    tween.eventCallback('onComplete', () => {
      this.visible = on;
      this.bg.cacheAsBitmap = true;
      tween.kill();
    });
  }
}
