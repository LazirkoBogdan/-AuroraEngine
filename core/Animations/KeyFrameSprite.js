/**
 * Config main class
 * @exports ConfigManager
 */
import AnimationController from './AnimationController';
import AddMixin from './AddMixin';
import KeyFrameTintMixin from './KeyFrameTintMixin';
import Sprite from '../DisplayObjects/Sprite';
import UpdateComponentUI from '../Components/UpdateComponentUI';

export default class KeyFrameSprite extends Sprite {
  _callBackFunction = null;

  constructor(config) {
    super(config);
    this._createAnimationSignals();
  }

  /**
   *@public
   * @param  {number} delay
   * @param  {number} speed
   * start animations from setup animation parameters
   * @param  {boolean} rewind
   * play show animations
   */
  playShow(delay = 0, speed = 1, rewind = true, cb) {
    if (this._config.animations && this._config.animations.show) {
      this.play('show', delay, speed, rewind);
      if (cb) {
        this._callBackFunction = cb;
        this.completeSignal.addOnce('_playCallBack', this);
      }
    }
  }

  /**
   *@public
   * @param  {number} delay
   * @param  {number} speed
   * start animations from setup animation parameters
   * @param  {boolean} rewind
   * play show animations
   */
  playLoop(delay = 0, speed = 1, rewind = true) {
    if (this._config.animations && this._config.animations.loop) {
      this.play('loop', delay, speed, rewind);
    }
  }

  /**
   *@public
   * @param  {number} delay
   * @param  {number} speed
   * start animations from setup animation parameters
   * @param  {boolean} rewind
   * play hide animations
   */
  playHide(delay = 0, speed = 1, rewind = true, cb) {
    if (this._config.animations && this._config.animations.hide) {
      this.play('hide', delay, speed, rewind);

      if (cb) {
        this._callBackFunction = cb;
        this.completeSignal.addOnce('_playCallBack', this);
      }
    }
  }
  /**
   *@private
   * start callback
   */
  _playCallBack() {
    if (this._callBackFunction != null && this._callBackFunction != undefined) {
      this._callBackFunction();
    }
  }

  /**
   *@private
   * @param  {obj} config
   * Mixing UpdateComponentUI
   */
  _init(config) {
    this._config = config;
    AnimationController.mixin(this);
    AddMixin.mixin(this);
    KeyFrameTintMixin.mixin(this);
    this._setupAnimation(this._config.animations);
  }

  /**
   * Add an animator to a track
   * @param {*} value
   * @param {String} key
   * @param {Object} target
   * @param {core.animations.Animator} animate
   * @param {core.animations.Animator} instant
   * @private
   */
  _addAnimator(value, key, target, animate, instant) {
    switch (key) {
      case 'texture':
        instant.push(new slotGame.ui.Animator(value, key, target));
        break;
      case 'tint':
        KeyFrameTintMixin._addAnimator.call(
          this,
          value,
          key,
          target,
          animate,
          instant
        );
        break;
      case 'add':
        AddMixin._addAnimator.call(this, value, key, target, animate, instant);
        break;
      default:
        AnimationController._addAnimator.call(
          this,
          value,
          key,
          target,
          animate,
          instant
        );
        break;
    }
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  updateConfig(portrait, scaleRatio = 1, containerOffsets) {
    this.cacheAsBitmap = false;
    UpdateComponentUI.updateConfig.call(
      this,
      portrait,
      scaleRatio,
      containerOffsets
    );
    if (this._config.cacheAsBitmap)
      this.cacheAsBitmap = this._config.cacheAsBitmap;
  }
}
