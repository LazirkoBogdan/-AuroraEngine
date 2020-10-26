/**
 * @class {core.animations.Track}
 * @param {Array} frames
 * @param {Object} target
 * @param {String} key
 * @param {Function} createAnimator
 * @param {Function} addLabel
 */
export default class Track {
  /**
   * The index of the current track playing
   * @type {Number}
   * @private
   */
  _currentIndex = 0;

  /**
   * The duration for a track
   * @type {Number}
   */
  duration = 0;

  constructor(frames, target, key, createAnimator, addLabel) {
    this.eventSignal = new core.events.Signal();
    this._setup(frames, target, key, createAnimator, addLabel);
  }

  /**
   * Setup the track
   * @param {Array} frameConfigs
   * @param {Object} target
   * @param {Function} createAnimator
   * @param {Function} addLabel
   */
  _setup(frameConfigs, target, key, createAnimator, addLabel) {
    let frames = (this._frames = []);
    let time = 0;

    for (let i = 0, len = frameConfigs.length; i !== len; ++i) {
      let frameConfig = frameConfigs[i];
      time += frameConfig.delay || 0;

      // Store the label
      let label = frameConfig.label;
      if (typeof label === 'string') {
        addLabel(label, time);
      }

      // Create the frame
      let frame = new core.animations.KeyFrame(
        frameConfig,
        target,
        time,
        key,
        createAnimator
      );
      time += frame.duration;

      // Only store the frame if something will change
      if (frame.animates) {
        frame.eventSignal.add('_onAnimationEvent', this);
        frames.push(frame);
      }
    }

    this.duration = time;
  }

  /**
   * Jump to the given point
   * @param {Number} position
   * @param {Boolean} indexOnly
   */
  jumpTo(position, indexOnly) {
    let frames = this._frames;
    let frameTime = 0;
    for (var i = 0, len = frames.length; i < len; ++i) {
      let frame = frames[i];

      if (!indexOnly) {
        frame.jumpTo(position);
      }

      if (frame.start >= position) {
        break;
      }
    }

    this._currentIndex = Math.max(0, i - 1);
    let first = frames[this._currentIndex];
    if (first != null) {
      first.begin();
    }
  }

  /**
   * Update the animation
   * @param {Number} time
   */
  update(time) {
    let frames = this._frames;
    let frame = frames[this._currentIndex];
    let start = false;
    let update = frame != null;

    while (update) {
      if (start) {
        frame.begin();
      }

      if ((update = frame.update(time))) {
        frame = frames[++this._currentIndex];
        update = frame != null;
        start = true;
      }
    }
  }

  /**
   * Dispatch the event signal
   * @param {String} event
   * @private
   */
  _onAnimationEvent = function(event) {
    this.eventSignal.dispatch(event);
  };
}
