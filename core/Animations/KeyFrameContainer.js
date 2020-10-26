/**
 * KeyFrameContainer main class
 * @exports KeyFrameContainer
 */
import AnimationController from './AnimationController';
import ResizeContainer from '../DisplayObjects/ResizeContainer';
import KeyFrameTintMixin from './KeyFrameTintMixin';

export default class KeyFrameContainer extends ResizeContainer {
  /**
   * The target value
   * @type {Function}
   * @private
   */
  _callBackFunction;

  constructor(config) {
    super(config);
    this._createAnimationSignals();
  }

  /**
   *@public
   * @param {number} delay
   * @param {number} speed
   * @param {boolean} rewind // start animations from setup animation parameters
   * @param {func} cb
   * start animations from setup animation parameters
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
   * @param  {boolean} rewind // start animations from setup animation parameters
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
   * @param  {boolean} rewind // start animations from setup animation parameters
   * @param { func} cb
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
    if (this._callBackFunction != null) {
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
    KeyFrameTintMixin.mixin(this);
    this._setupAnimation(this._config.animations);
  }
}
