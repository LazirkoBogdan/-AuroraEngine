/**
 * @class {Animator}
 * @param {*} to
 * @param {String} key
 * @param {Object} target
 */
export default class Animator {
  /**
   * The from value
   * @type {*}
   * @private
   */
  _from = null;

  /**
   * The target value
   * @type {*}
   * @private
   */
  _to = null;

  /**
   * The change amunt
   * @type {*}
   * @private
   */
  _change = null;

  /**
   * The target object to animate
   * @type {Object}
   * @private
   */
  _target = null;

  /**
   * The property key to affect
   * @type {String}
   * @private
   */
  _key = '';

  constructor(to, key, target) {
    this._setup(to, key, target);
  }

  /**
   * Setup the animator
   * @param {*} to The target value
   * @param {String} key The proeprty to change
   * @param {Object} target The target to animate
   */
  _setup(to, key, target) {
    this._to = to;
    this._key = key;
    this._target = target;
  }

  /**
   * Update the value of from
   */
  updateFrom() {
    this._change = this._to - (this._from = this._target[this._key]);
  }

  /**
   * Set the progress of the animation
   * @param {Number} progress
   * @param {Boolean} jumping
   */
  set(progress, jumping) {
    if (progress === true || progress === 1) {
      this._target[this._key] = this._to;
    } else {
      this._target[this._key] = this._from + this._change * progress;
    }
  }
}
