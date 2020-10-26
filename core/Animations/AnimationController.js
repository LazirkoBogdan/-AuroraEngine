/**
 * @class {core.animations.AnimationController}
 */
export default class AnimationController {
  /**
   * The set types
   * @type {Object}
   * @const
   */
  static INSTANT_TYPES = { boolean: true, string: true };

  /**
   * The set keys
   * @type {Object}
   * @const
   */
  static INSTANT_KEYS = { blendMode: true };

  /**
   * Mixin method
   * @param {Object} target
   */
  static mixin(target) {
    //@beginPrivate
    target._createAnimationSignals =
      AnimationController._createAnimationSignals;
    target._setupAnimation = AnimationController._setupAnimation;
    target.rewind = AnimationController.rewind;
    target.fastForward = AnimationController.fastForward;
    target.jumpTo = AnimationController.jumpTo;
    target.play = AnimationController.play;
    target.pause = AnimationController.pause;
    target.resume = AnimationController.resume;
    target.setDuration = AnimationController.setDuration;
    target._onUpdateAnimation = AnimationController._onUpdateAnimation;
    target._addAnimator = AnimationController._addAnimator;
    target.mix = AnimationController.mix;
    target.unmix = AnimationController.unmix;
    target._onAnimationBegin = AnimationController._onAnimationBegin;
    target._onAnimationEvent = AnimationController._onAnimationEvent;
    target._onAnimationLoop = AnimationController._onAnimationLoop;
    target._onAnimationComplete = AnimationController._onAnimationComplete;
    //@endPrivate
  }

  /**
   * Create the animation signals
   * @private
   */
  static _createAnimationSignals() {
    this.startSignal = new core.events.Signal();
    this.loopSignal = new core.events.Signal();
    this.completeSignal = new core.events.Signal();
    this.eventSignal = new core.events.Signal();
  }

  /**
   * Setup the animation
   * @param {Object} animationConfigs
   * @private
   */
  static _setupAnimation(animationConfigs) {
    let animations = (this._animations = {});
    this._activeAnimations = new core.list.LinkedList();
    let createAnimator = this._addAnimator.bind(this);

    if (animationConfigs != null) {
      for (let id in animationConfigs) {
        let animation = new core.animations.Animation(
          animationConfigs[id],
          id,
          this,
          createAnimator
        );
        animation.startSignal.add('_onAnimationBegin', this);
        animation.eventSignal.add('_onAnimationEvent', this);
        animation.loopSignal.add('_onAnimationLoop', this);
        animation.completeSignal.add('_onAnimationComplete', this);
        animations[id] = animation;
      }
    }
  }

  /**
   * Rewind an animation
   * @param {String} [id] The animation to rewind, if not provided all will rewind
   */
  static rewind(id) {
    this.pause();

    let animations = this._animations;

    // Clear the active animations
    let active = this._activeAnimations;
    for (let node = active.first; node != null; node = node.llNext) {
      node.active = false;
    }
    active.clear();

    if (typeof id === 'string') {
      if (this._rewindId !== id) {
        animations[id].rewind();
        this._rewindId = id;
      }
    } else {
      for (id in animations) {
        animations[id].rewind();
      }

      this._rewindId = null;
    }
  }

  /**
   * Fast forward an animation
   * @param {String} id The animation to fast forward
   */
  static fastForward(id) {
    this.rewind(id);
    this.jumpTo(id, 1);
  }

  /**
   * Jump to the given position in an animation
   * @param {String} id The animation to jump
   * @param {Number|String} position Where in the animation to jump. Can be a label (string), 0-1 progress, or time value
   * @param {Boolean} [time] Whether to be time based or progress based if a number is provided
   */
  static jumpTo(id, position, time) {
    this._rewindId = null;
    this._animations[id].jumpTo(position, time);
  }

  /**
   * Play an animation
   * @param {String} id The animation to play
   * @param {Number} [delay=0] The delay in seconds before playing the animation
   * @param {Number} [speed=1] The speed to play the animation at
   * @param {Boolean} [rewind=false] Whether to rewind before playing the animation
   */
  static play(id, delay, speed, rewind) {
    this.pause();

    if (rewind) {
      this.rewind(id);
    }

    let animation = this._animations[id];
    if (!animation.active) {
      this._activeAnimations.add(animation);
    }

    this._rewindId = null;
    core.buttonsAvailable = false;
    animation.start(delay, speed);
    this.resume();
  }

  /**
   * Set the duration of an animation
   * @param {String} id The animation to change the duration of
   * @param {Number} duration The new duration of the animation
   */
  static setDuration(id, duration) {
    this._animations[id].setDuration(duration);

  }

  /**
   * Pause all animations
   */
  static pause() {
	  core.tween.gsap.ticker.remove(this._tickerCallBack);
  }

  /**
   * Resume all animations
   */
  static resume() {
    let elapsed = Date.now();
    this._tickerCallBack = () => {
      let now = Date.now();
      this._onUpdateAnimation((now - elapsed) * 0.001);
      elapsed = now;
    };
	  core.tween.gsap.ticker.add(this._tickerCallBack);
  }

  /**
   * Mix an animation into the current one
   * @param {String} id The animation to mix
   * @param {Number} [delay=0] The delay before mixing the animation
   * @param {Number} [startAt=0] Where to start the mixed animation
   * @param {Number} [speed=1] The speed to play the mixed animation
   */
  static mix(id, delay, startAt, speed) {
    let animation = this._animations[id];
    if (!animation.active) {
      this._activeAnimations.add(animation);
    }

    animation.start(delay, speed, startAt);
  }

  /**
   * Unmix an animation
   * @param {String} id The animation to unmix
   */
  static unmix(id) {
    let animation = this._animations[id];

    if (animation.active) {
      let activeAnimations = this._activeAnimations;
      activeAnimations.remove(animation);
      animation.stop();

      if (activeAnimations.first == null) {
        this.pause();
      }
    }
  }

  /**
   * Update the animation
   * @param {Number} dt
   * @param {Boolean} gamePaused
   */
  static _onUpdateAnimation(dt, gamePaused) {
    if (!gamePaused) {
      let active = this._activeAnimations;
      let node = active.first;

      // Animate the active animations
      while (node != null && active.first != null) {
        let next = node.llNext;

        node.update(dt);

        node = next;
      }

      if (active.first == null) {
        // This is complete
        this.pause();
      }
    }
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
    if (typeof value === 'object') {
      if (value instanceof Array && typeof target[key] === 'function') {
        // Create a callback animator
        instant.push(new core.animations.CallbackAnimator(value, key, target));
      } else if (typeof (target = target[key]) === 'object') {
        // Create the animators inside properties
        for (let id in value) {
          this._addAnimator(value[id], id, target, animate, instant);
        }
      }
    } else {
      let animator = new core.animations.Animator(value, key, target);

      // Either set the property instantly or animate it
      if (
        AnimationController.INSTANT_KEYS[key] ||
        AnimationController.INSTANT_TYPES[typeof value]
      ) {
        instant.push(animator);
      } else {
        animate.push(animator);
      }
    }
  }

  /**
   * Dispatch that an animation has begun
   * @param {core.animations.Animation} animation
   * @private
   */
  static _onAnimationBegin(animation) {
    core.buttonsAvailable = false
    this.startSignal.dispatch(this, animation.id);
  }

  /**
   * Dispatch the event signal
   * @param {core.animations.Animation} animation
   * @param {String} event
   * @private
   */
  static _onAnimationEvent(animation, event) {
    this.eventSignal.dispatch(this, event);
  }

  /**
   * Dispatch that an animation has looped
   * @param {core.animations.Animation} animation
   * @private
   */
  static _onAnimationLoop(animation) {
    
        core.buttonsAvailable = true
    this.loopSignal.dispatch(this, animation.id);
  }

  /**
   * Dispatch the complete signal
   * @param {core.animations.Animation} animation
   * @private
   */
  static _onAnimationComplete(animation) {
    this._activeAnimations.remove(animation);
    core.buttonsAvailable = true
    this.completeSignal.dispatch(this, animation.id);
  }
}
