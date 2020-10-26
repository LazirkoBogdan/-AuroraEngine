import Animator from './Animator';
/**
 * @class {CallbackAnimator}
 * @param {Array} args
 * @param {String} method
 * @param {Object} target
 */
export default class CallbackAnimator extends Animator {
  /**
   * The method to call
   * @type {Function} method
   * @private
   */
  _method = null;

  /**
   * The arguments to pass through
   * @type {Array} args
   * @private
   */
  _args = null;
  constructor(args, method, target) {
    super(args, method, target);
  }
  /**
   * Setup the animator
   * @param {Array} args The args to call on the method
   * @param {String} method The method to call
   * @param {Object} target The target to animate
   */
  _setup(args, method, target) {
    this._args = args;
    this._method = target[method];
    this._target = target;
  }

  /**
   * These should only be instant so just call the method
   */
  set() {
    this._method.apply(this._target, this._args);
  }
}
