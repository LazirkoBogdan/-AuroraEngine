/**
 *
 * @class {KeyFrameTintMixin}
 * @param {Object} config
 */
import AnimationController from './AnimationController';

export default class KeyFrameTintMixin {
  /**
   * Mixin method
   */
  static mixin(target) {
    target._addAnimator = KeyFrameTintMixin._addAnimator;
    Object.defineProperty(target, 'tintR', {
      get: KeyFrameTintMixin._getTintR,
      set: KeyFrameTintMixin._setTintR
    });
    Object.defineProperty(target, 'tintG', {
      get: KeyFrameTintMixin._getTintG,
      set: KeyFrameTintMixin._setTintG
    });
    Object.defineProperty(target, 'tintB', {
      get: KeyFrameTintMixin._getTintB,
      set: KeyFrameTintMixin._setTintB
    });
  }

  static _addAnimator(value, key, target, animate, instant) {
    if (key === 'tint') {
      animate.push(
        new core.animations.Animator((value >> 16) & 0xff, 'tintR', target)
      );
      animate.push(
        new core.animations.Animator((value >> 8) & 0xff, 'tintG', target)
      );
      animate.push(new core.animations.Animator(value & 0xff, 'tintB', target));
    } else {
      AnimationController._addAnimator.call(
        this,
        value,
        key,
        target,
        animate,
        instant
      );
    }
  }

  /**
   * Return the red tint
   * @returns {Number}
   */
  static _getTintR() {
    return (this.tint >> 16) & 0xff;
  }

  /**
   * Set the red tint
   * @param {Number} tint
   */
  static _setTintR(tint) {
    this.tint = (this.tint & 0x00ffff) | (tint << 16);
  }

  /**
   * Return the green tint
   * @returns {Number}
   */
  static _getTintG() {
    return (this.tint >> 8) & 0xff;
  }

  /**
   * Set the green tint
   * @param {Number} tint
   */
  static _setTintG(tint) {
    this.tint = (this.tint & 0xff00ff) | (tint << 8);
  }

  /**
   * Return the blue tint
   * @returns {Number}
   */
  static _getTintB() {
    return this.tint & 0xff;
  }

  /**
   * Set the blue tint
   * @param {Number} tint
   */
  static _setTintB(tint) {
    this.tint = (this.tint & 0xffff00) | tint;
  }
}
