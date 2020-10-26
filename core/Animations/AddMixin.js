/**
 * Mixes add colour filter behaviour to a UI component
 * @class core.animations.AddMixin
 */
import AnimationController from './AnimationController';
export default class AddMixin {
  /**
   * The add filter
   * @type {PIXI.filters.ColorMatrixFilter}
   * @private
   */
  static _addFilter;

  /**
   * The add amount
   * @type {number}
   * @private
   */
  static _add = 0;

  /**
   * The colour multiplier
   * @type {Number}
   * @private
   */
  static _multiplier = null;

  /**
   * Mixin method
   */
  static mixin(target) {
    target._updateAdd = AddMixin._updateAdd;
    target._addAnimator = AddMixin._addAnimator;

    Object.defineProperty(target, 'add', {
      get: AddMixin._getAdd,
      set: AddMixin._setAdd
    });
    Object.defineProperty(target, 'addR', {
      get: AddMixin._getAddR,
      set: AddMixin._setAddR
    });
    Object.defineProperty(target, 'addG', {
      get: AddMixin._getAddG,
      set: AddMixin._setAddG
    });
    Object.defineProperty(target, 'addB', {
      get: AddMixin._getAddB,
      set: AddMixin._setAddB
    });
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
  static _addAnimator(value, key, target, animate, instant) {
    if (key === 'add' && typeof value === 'number') {
      animate.push(
        new core.animations.Animator((value >> 16) & 0xff, 'addR', target)
      );
      animate.push(
        new core.animations.Animator((value >> 8) & 0xff, 'addG', target)
      );
      animate.push(new core.animations.Animator(value & 0xff, 'addB', target));
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
   * Update the add filter
   * @private
   */
  static _updateAdd() {
    const add = this._add;

    if (add === 0) {
      this.filters = null;
    } else {
      let r = ((add >> 16) & 0xff) / 0xff;
      let g = ((add >> 8) & 0xff) / 0xff;
      let b = (add & 0xff) / 0xff;
      let m = this.noMultiplier ? 1 : 1 - Math.max(r, g, b);

      // Fetch or create the filter
      let filter = this._addFilter;
      if (filter == undefined) {
        filter = this._addFilter = new PIXI.filters.ColorMatrixFilter();
      }

      // Update the filter
      filter.matrix = [
        m,
        0,
        0,
        r,
        0,
        0,
        m,
        0,
        g,
        0,
        0,
        0,
        m,
        b,
        0,
        0,
        0,
        0,
        1,
        0
      ];

      this.filters = [filter];
    }
  }

  /**
   * Get the current add r
   * @returns {Number}
   * @private
   */
  static _getAddR() {
    return (this.add >> 16) & 0xff;
  }

  /**
   * Set the current add r
   * @param {Number} r
   * @private
   */
  static _setAddR(r) {
    this.add = (this.add & 0x00ffff) | (r << 16);
  }

  /**
   * Get the current add g
   * @returns {Number}
   * @private
   */
  static _getAddG() {
    return (this.add >> 8) & 0xff;
  }

  /**
   * Set the current add g
   * @param {Number} g
   * @private
   */
  static _setAddG(g) {
    this.add = (this.add & 0xff00ff) | (g << 8);
  }

  /**
   * Get the current add b
   * @returns {Number}
   * @private
   */
  static _getAddB() {
    return this.add & 0xff;
  }

  /**
   * Set the current add b
   * @param {Number} b
   * @private
   */
  static _setAddB(b) {
    this.add = (this.add & 0xffff00) | b;
  }

  /**
   * Get the current add
   * @param {Number}
   */
  static _getAdd() {
    return this._add;
  }

  /**
   * Set the current add
   * @param {Number}
   */
  static _setAdd(add) {
    if (this._add !== add) {
      this._add = add;
      this._updateAdd();
    }
  }
}
