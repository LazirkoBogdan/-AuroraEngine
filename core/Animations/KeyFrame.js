/**
 *
 * @class {KeyFrame}
 * @param {Object} config
 * @param {Object} target
 * @param {Number} start
 * @param {String} track
 * @param {Function} createAnimator
 * @param {Boolean} ignoreSpecialKeys
 */
export default class KeyFrame {
  /**
   * Special keyframe properties which should be ignored
   * @type {Object}
   * @const
   */
  static SPECIAL_KEYS = {
    value: true,
    duration: true,
    delay: true,
    event: true,
    label: true
  };

  /**
   * Dispatched on animation events
   * @event eventSignal
   */
  eventSignal = null;

  /**
   * The animators on this keyframe which animate
   * @private
   */
  _animate = null;

  /**
   * The animators on this keyframe which animate instantly
   * @private
   */
  _instant = null;

  /**
   * The event to call on beginning
   * @param {string}
   * @private
   */
  _event = '';

  /**
   * The time the frame starts at
   * @param {Number}
   */
  start = 0;

  /**
   * The easing function to use
   * @param {Function}
   * @private
   */
  _ease = null;

  /**
   * Whether this key frame actually animates, we can drop things which are just delays
   * @param {Boolean}
   */
  animates = false;

  /**
   * The duration of this frame
   * @param {Number}
   */
  duration = 0;

  /**
   * Whether this key frame is running
   * @param {Boolean}
   * @private
   */
  _active = false;
  constructor(config, target, start, track, createAnimator, ignoreSpecialKeys) {
    this.eventSignal = new core.events.Signal();
    this._setup(
      config,
      target,
      start,
      track,
      createAnimator,
      ignoreSpecialKeys
    );
  }
  /**
   * Setup the key frame
   * @param {Object} config
   * @param {Object} target
   * @param {Number} start
   * @param {String} track
   * @param {Function} createAnimator
   * @param {Boolean} ignoreSpecialKeys
   */
  _setup(config, target, start, track, createAnimator, ignoreSpecialKeys) {
    let animate = (this._animate = []);
    let instant = (this._instant = []);
    this._callbacks = [];
    this.duration = config.duration || 0;
    this._event = config.event || '';
    this.start = start;
    this._ease = config.ease;

    // Create animators for the properties
    for (let key in config) {
      if (ignoreSpecialKeys || !KeyFrame.SPECIAL_KEYS[key]) {
        createAnimator(config[key], key, target, animate, instant);
        this.animates = true;
      }
    }

    // Create the animator for value
    if (config.value !== undefined) {
      createAnimator(config.value, track, target, animate, instant);
      this.animates = true;
    }

    // Ensure this animates if there is an event
    if (this._event !== '') {
      this.animates = true;
    }
  }

  /**
   * Jump to the given time
   * @param {Number|Boolean} time
   */
  jumpTo = function(time) {
    let i, len;

    // Call the instant animators
    let instant = this._instant;
    for (i = 0, len = instant.length; i < len; ++i) {
      instant[i].set(true);
    }

    // Update the animation animators
    let animate = this._animate;
    len = animate.length;

    if (len !== 0) {
      let progress = time;

      if (progress !== true) {
        let ease = this._ease;
        let duration = this.duration;
        time = time - this.start;
        progress = duration !== 0 && time < duration ? time / duration : 1;
        
        progress = ease ? ease(progress) : progress;
      }

      for (i = 0; i < len; ++i) {
        let animator = animate[i];
        animator.updateFrom();
        animator.set(progress);
      }
    }
  };

  /**
   * Called when a frame starts
   */
  begin = function() {
    this._active = false;
  };

  /**
   * Update the key frame
   * @param {Number} time
   * @returns {Boolean}
   */
  update = function(time) {
    let animate = this._animate;
    time = time - this.start;
    let duration = this.duration;
    let complete = time >= duration;

    if (time >= 0) {
      let first = !this._active;
      let i, len;

      if (first) {
        // Call the instant animators
        let instant = this._instant;
        for (i = 0, len = instant.length; i < len; ++i) {
          instant[i].set(true);
        }
      }

      len = animate.length;
      if (len !== 0) {
        let ease = this._ease;
        let progress = !complete && duration !== 0 ? time / duration : 1;
        progress = ease ? ease(progress) : progress;

        for (i = 0; i < len; ++i) {
          let animator = animate[i];

          if (first) {
            animator.updateFrom();
          }

          animator.set(progress);
        }
      }

      if (first) {
        this._active = true;

        // Handle the event signal
        let event = this._event;
        if (event !== '' && event != null) {
          this.eventSignal.dispatch(event);
        }
      }
    }

    return complete;
  };
}
