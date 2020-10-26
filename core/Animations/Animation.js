/**
 * An animation which can play
 * @class {core.Animations.Animation}
 * @param {Object} config
 * @param {String} id
 * @param {Object} target
 * @param {Function} createAnimator
 */
export default class Animation {
  /**
   * Special animation keys which should be ignored
   * @type {Object}
   * @private
   * @const
   */
  static SPECIAL_KEYS = {
    setup: true,
    loops: true,
    loopDelay: true,
    delay: true
  };

  /**
   * Dispatched when the animation begins
   * @event startSignal
   * @type {Signal}
   */
  startSignal = null;

  /**
   * Dispatched when an event fires
   * @event eventSignal
   * @type {Signal}
   */
  eventSignal = null;

  /**
   * Dispatched when the animations loops
   * @event loopSignal
   * @type {Signal}
   */
  loopSignal = null;

  /**
   * Dispatched when the animation completes
   * @event completeSignal
   * @type {Signal}
   */
  completeSignal = null;

  /**
   * The tracks in this animation
   * @abstract
   * @type {function}
   * @private
   */
  _tracks = null;

  /**
   * The duration for this animation
   * @type {Number}
   * @private
   */
  duration = 0;

  /**
   * The current time of the animation
   * @type {Number}
   * @private
   */
  _time = 0;

  /**
   * The delay time of the animation
   * @type {Number}
   * @private
   */
  _delayTime = 0;

  /**
   * The each function to use for the time
   * @type {Easing}
   * @private
   */
  _ease = null;

  /**
   * The number of times this should loops
   * @type {Number}
   * @private
   */
  _loops = 0;

  /**
   * The current number of times looped
   * @type {Number}
   * @private
   */
  _loopCount = 0;

  /**
   * The delay before playing
   * @type {Number}
   * @private
   */
  _delay = 0;

  /**
   * The delay before looping
   * @type {Number}
   * @private
   */
  _loopDelay = 0;

  /**
   * The speed this should animate at
   * @type {Number}
   * @private
   */
  _speed = 1;

  /**
   * Modifies the scale of the duration
   * @type {Number}
   * @private
   */
  _durationScale = 1;

  /**
   * The ID for this animation
   * @type {String}
   */
  id = '';

  /**
   * Whether this animation is active
   * @type {Boolean}
   */
  active = false;

  /**
   * A look up for labels
   * @type {Object}
   * @private
   */
  _labels = null;

  constructor(config, id, target, createAnimator) {
    this.startSignal = new core.events.Signal();
    this.eventSignal = new core.events.Signal();
    this.loopSignal = new core.events.Signal();
    this.completeSignal = new core.events.Signal();

    this._setup(config, id, target, createAnimator);
  }

  /**
   * Setup the animation
   * @param {Object} config The animation config
   * @param {String} id The animation id
   * @param {Object} target The target to animate
   * @param {Function} createAnimator The method to call to create animators
   * @private
   */
  _setup(config, id, target, createAnimator) {
    // Set the properties
    this._labels = {};
    this._ease = config.ease;
    this._loops = config.loops;
    this._delay = config.delay || 0;
    this._loopDelay = config.loopDelay || 0;
    this.id = id;

    // Create the setup key frame
    this._setup = new core.animations.KeyFrame(
      config.setup || {},
      target,
      0,
      '',
      createAnimator,
      true
    );

    // Create the tracks
    let tracks = (this._tracks = []);
    let addLabel = this._addLabel.bind(this);

    for (let key in config) {
      let trackConfig = config[key];

      if (!Animation.SPECIAL_KEYS[key] && typeof trackConfig === 'object') {
        let track = new core.animations.Track(
          trackConfig,
          typeof target[key] === 'object' ? target[key] : target,
          key,
          createAnimator,
          addLabel
        );
        track.eventSignal.add('_onAnimationEvent', this);
        this.duration = Math.max(this.duration, track.duration);
        tracks.push(track);
      }
    }
  }

  /**
   * Add a label to the animation
   * @param {String} label
   * @param {Number} time
   */
  _addLabel(label, time) {
    this._labels[label] = time;
  }

  /**
   * Rewind the animation
   */
  rewind() {
    this._setup.jumpTo(true);
  }

  /**
   * Jump to the given point
   * @param {Number|String} position
   * @param {Boolean} time
   */
  jumpTo(position, time) {
    if (typeof position === 'string') {
      position = this._labels[position] || 0;
    } else {
      position = time ? position : position * this.duration;
    }

    this._delayTime = 0;
    this._time = position;

    let tracks = this._tracks;
    for (let i = 0; i < tracks.length; ++i) {
      tracks[i].jumpTo(position);
    }
  }

  /**
   * Start the animation
   * @param {Number} [delay=0]
   * @param {Number} [speed=1]
   * @param {Number} [startAt=0]
   */
  start(delay, speed, startAt) {
    this._delayTime = (delay || 0) + this._delay;
    this._speed = speed || 1;
    let time = (this._time = startAt || 0);
    this._loopCount = 0;
    this.active = true;

    // Make sure the index for the tracks is correct
    let tracks = this._tracks;
    for (let i = 0; i < tracks.length; ++i) {
      tracks[i].jumpTo(time, true);
    }

    // Dispatch the start signal if there is no delay
    if (this._delayTime == 0) {
      this.startSignal.dispatch(this);
    }
  }

  /**
   * Set the duration of the animation
   * @param {Number} duration
   */
  setDuration(duration) {
    this._durationScale = this.duration / duration;
  }

  /**
   * Stop the animation
   */
  stop() {
    this.active = false;
  }

  /**
   * Update the animation
   * @param {Number} dt
   */
  update(dt) {
    // Handle the delay

    let active = this._delayTime <= 0;
    let speed = this._speed;
    let durationScale = this._durationScale;
    let time;

    if (!active) {
      this._delayTime -= dt * speed;

      if (this._delayTime <= 0) {
        time = this._time -= this._delayTime * durationScale;
        active = true;

        this.startSignal.dispatch(this);
      }
    } else {
      time = this._time += dt * speed * durationScale;
    }

    // Update once this is active
    let tracks = this._tracks;
    let ease = this._ease;
    let duration = this.duration;
    let loops = this._loops;
    let looped = false;

    while (active) {
      let complete = time >= duration;
      let progress = complete ? duration : time;
      progress = ease
        ? ease.getRatio(progress / duration) * duration
        : progress;

      for (let i = 0, len = tracks.length; i < len; ++i) {
        let track = tracks[i];

        if (looped) {
          track.jumpTo(0);
        }

        track.update(progress);
      }

      if (complete) {
        ++this._loopCount;

        if (loops === 0 || this._loopCount < loops) {
          this._delayTime = this._loopDelay;
          time = this._time -= duration;
          looped = true;
          this.loopSignal.dispatch(this);
        } else {
          active = false;
          this.active = false;
          this.completeSignal.dispatch(this);

          return true;
        }
      } else {
        active = false;
      }
    }

    return false;
  }

  /**
   * Dispatch the event signal
   * @param {String} event
   * @private
   */
  _onAnimationEvent(event) {
    this.eventSignal.dispatch(this, event);
  }
}
