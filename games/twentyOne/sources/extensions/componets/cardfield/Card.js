import Spine from '../../../../../../core/DisplayObjects/Spine.js';

export default class Card extends Spine {
  startX = 0;
  startY = 0;

  constructor(config) {
    super(config);
    this.initProperty(config);
  }

  reset() {
    super.reset();
    const config = this._config;
    this.cacheAsBitmap = false;

    this.skin = 'default';
    this.play('0', false);

    this.x = this.startX;
    this.y = this.startY;

    this.scale.x = this.scale.y = config.scale;
    this.rotation = config.rotation * (Math.PI / 180);
    this.cacheAsBitmap = true;
    this.visible = false;
  }

  initProperty(config) {
    this.scale.x = this.scale.y = config.scale;
  }

  changeSkin(skin) {
    this.cacheAsBitmap = false;
    this.skin = skin;
  }

  hideCard(cb) {
    this.cacheAsBitmap = false;
    this.play('hideCard', false, () => {
      this.cacheAsBitmap = true;
      if (cb) cb();
    });
  }

  openCard() {
    this.cacheAsBitmap = false;
    this.play('show', false, () => {
      this.cacheAsBitmap = true;
    });
  }
}
