/**
 * @exports KeyFrameTextDisplay
 */
import AnimationController from './AnimationController';
import DisplayText from '../DisplayObjects/DisplayText';
import AddMixin from './AddMixin';

export default class KeyFrameTextDisplay extends DisplayText {
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
   * play loop animations
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
    this._setupAnimation(this._config.animations);
  }
}
