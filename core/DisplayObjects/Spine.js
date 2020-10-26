/*global core:true*/
/*global game:true*/
/*global PIXI:true*/

import UpdateComponentUI from "../Components/UpdateComponentUI";
import Core              from "../index";

/**
 * Button
 * Class create Button for games
 * @extends Container
 * @exports SceneObject
 */
export default class Spine extends PIXI.spine.Spine {

  _handler;

  handlerArg = null;

  swapObj = [];

  swapOrientation = null;

  skinsSlots = [];

  buttons = {};

  scales = {
    unpressed: 2,
    pressed:   2.2,
  };

  constructor(config) {
    if (config.spinedata === undefined) {
      config.spinedata = Spine.getSpine(config.name);
    }
    super(config.spinedata);
    this.name = config.name;

    this.skin = config.skin;
    this._init(config);
    this.animationAvailable = config.animationAvailable !== undefined ? config.animationAvailable : true;
    this.playIdleAnimations();
    this.addButtonListeners();

    if (config.buttons) {
      Object.keys(config.buttons).forEach((key) => {
        const buttonName = (typeof config.buttons[key] === "object") ? config.buttons[key].name : config.buttons[key];
        if (!this.skeleton.findSlot(buttonName)) throw new Error(`Obj ${config.spine} has no slot ${buttonName}`);
        this.buttons[key] = new core.display.SpineButton({
          parent:        this,
          sprite:        this.getSpineChildByName(buttonName),
          bone:          this.skeleton.findSlot(buttonName).bone,
          buttonOptions: config.buttons[key],
        });
      });
    }
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  reset() {
    this.skeleton.setToSetupPose();
    this.state.clearTracks();
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  resetParent(alpha) {
    this.alpha = alpha;
    this.state.clearTracks();

  }

  addSwapChild(config) {
    const swapChild = {
      part:                config.part,
      swapOrientation:     config.swapOrientation,
      swapAttachContainer: config.swapAttachContainer,
      attachContainer:     config.attachContainer,
    };
    this.swapObj.push(swapChild);
  }

  swapSlot(orientation) {
    this.swapObj.forEach((params) => {
      if (orientation === params.swapOrientation) {
        params.attachContainer.removeChild(params.part);
        params.swapAttachContainer.addChild(params.part);
      } else {
        params.swapAttachContainer.removeChild(params.part);
        params.attachContainer.addChild(params.part);
      }
    });
  }

  /**
   * @getter
   * get config
   */
  get config() {
    return this._config;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  updateConfig(portrait, scaleRatio = 1, containerOffsets) {
    //	this.cacheAsBitmap = false;
    UpdateComponentUI.updateConfig.call(this, portrait, scaleRatio, containerOffsets);

    const orientation = portrait ? "portrait" : "landscape";

    if (this._config && this._config[orientation]) {
      const config = this._config[orientation];
      if (config.skin) {

        this.skin = config.skin;
        if (config.skinAnimation) {
          this.play(config.skinAnimation.name, config.skinAnimation.loop);
        }
      }

      this.skinsSlots.forEach((obj) => {
        const slot     = obj.slot;
        const sceneObj = obj.node;
        if (portrait) {
          slot.children[1] && slot.children[1].addChild(sceneObj);
        } else {
          slot.children[0] && slot.children[0].addChild(sceneObj);
        }
      });

      if (config.afterUpdateAnimation) {
        this.play(config.afterUpdateAnimation.name, config.afterUpdateAnimation.loop);
      }

      if (this._config.swapSpine) {
        this.swapSlot(orientation);
      }


    }
  }

  playCb() {
    if (this.track && (typeof this.track.listener !== "undefined")
      && (this.track.listener !== null) && this.track.listener.complete) {
      this.track.listener.complete();
      this.track.listener = {};
    }
  }

  get orientation() {
    const query = window.matchMedia("(orientation:landscape)");
    return !query.matches;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  setResponsivePosition(config) {
    UpdateComponentUI.setResponsivePosition.call(this, config);
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  setFirstFrame() {
    this.stop();
    this.skeleton.setToSetupPose();
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  setLastFrame(animName) {
    this.setAnimation(animName);
    this.track.trackTime = this.track.animationEnd;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  setAnimation(animationName) {
    this.state.setAnimation(0, animationName, false);
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  playIdleAnimations() {
    if (!this._config.spineAnimations || !this._config.spineAnimations.idle) return;
    const animationConfig = this._config.spineAnimations.idle;
    this.playAnimationSequence(animationConfig);
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  playAnimationSequence(animationConfig, cb) {
    if (typeof animationConfig === "object") {
      core.call(() => {
        this.play(animationConfig.name, animationConfig.loop);
        this.onComplete = () => {
          if (animationConfig.onComplete) {
            this.play(animationConfig.onComplete.name, animationConfig.onComplete.loop, () => {
              if (cb) cb();
            });
          } else {
            if (cb) cb();
          }
        };
      }, animationConfig.delay || 0);
    } else {
      this.play(animationConfig);
    }
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  play(animationName, loop = false, cb) {
    if (this.animationAvailable) {
      this.cacheAsBitmap = false;
      if (this.parent) this.updateTransform();
      if (this.state.hasAnimation(animationName)) this.state.setAnimation(0, animationName, loop);
      else throw new Error(`There is no animation with name: ${animationName}`);

      if (!cb) return;
      this.onComplete = () => {
        cb();
      };
    }
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  stop() {
    this.state.clearTrack(0);
  }

  getSpineChildByName(name) {
    return this.children[this.skeleton.findSlotIndex(name)];
  }

  getSpineSlotContainersName(name) {
    return this.slotContainers[this.skeleton.findSlotIndex(name)];
  }

  getSpineSlotIndexByName(name) {
    return this.skeleton.findSlotIndex(name);
  }

  getSpineSlotByName(name) {
    return this.skeleton.findSlot(name);
  }

  getSpineBoneByName(name) {
    return this.skeleton.findBone(name);
  }

  addAttachment(config) {
    this.skeleton.setAttachment(config.slot, config.sprite);
  }

  getAttachment(slot, sprite) {
    return this.skeleton.getAttachmentByName(slot, sprite);
  }

  attach(slotName, node, removeTexture) {
    const slot = this.getSpineSlotContainersName(slotName);
    this.play("show", false, () => {
      this.updateConfig(core.getOrientation());
    });

    if (slot && slot.children.length) {

      if (removeTexture) {
        slot.children.first.texture.valid = false;
      }

      const first    = slot.children.first;
      node.spineSlot = slot;

      first.addChild(node);

      return first;
    }
  }


  /**
   *@public
   * Get Spine Data from atlas
   */
  get animationAvailable() {
    return this._animationAvailable;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  set animationAvailable(value) {
    this._animationAvailable = value;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  set skin(skin) {

    this.skeleton.setSkin(null);
    if (skin != null) {
      this.skeleton.setSkinByName(skin);
    } else if (this.spineData.skins.first.name !== "default") {
      this.skeleton.setSkin(this.spineData.skins.first);
    }
    this.skeleton.setSlotsToSetupPose();
  }

  set onComplete(cb) {
    if (!cb) {
      return;
    }

    this.state.tracks[0].listener = {
      complete: (entry) => {
        cb();
      },
    };
  }

  set onEvent(cb) {
    if (!cb) {
      return;
    }

    this.track.listener       = this.track.listener || {};
    this.track.listener.event = (...args) => {
      core.call(() => cb(...args), 0);
    };
  }

  get speed() {
    if (this.track) {
      return this.track.timeScale;
    } else return 0;
  }

  set speed(value) {
    if (this.track) {
      this.track.timeScale = value;
    }
  }

  set currentTime(value) {
    if (this.track) {
      this.track.trackTime = value;
    }
  }

  get currentTime() {
    if (this.track) {
      return this.track.getAnimationTime();
    }
    return 0;
  }

  get totalTime() {
    if (this.track) {
      return this.track.animationEnd;
    }
    return 0;
  }

  get track() {
    return this.state.getCurrent(0);
  }

  /**
   * @private
   * @param  {obj} config
   * Get Spine Data from atlas
   */
  _init(config) {
    this._config = config;
    this.updateConfig(false);
  }

  /**
   * @public
   * @param  {string} name
   * Get Spine Data from atlas
   */
  static getSpine(name) {
    if (game.assetsStore.spine[name]) return game.assetsStore.spine[name];
  }

  /**
   * set function
   * @param  {obj} handler
   */
  set handler(handler) {
    if (typeof handler !== "function") console.error("Handler must be a function!");
    this._handler = handler;
  }

  set interactivity(value) {
    this.interactive = value;
    this.buttonMode  = value;
    this.enabled     = value;
  }

  /**
   * @public
   * @param  {boolean} state
   * change interactivity in spine object
   */
  set enable(state) {
    this.interactivity = state;
  }

  get enable() {
    return this.interactive;
  }

  /**
   * @handler
   */
  get handler() {
    return this._handler;
  }

  /**
   * @public
   * add Button Listeners
   */
  addButtonListeners() {
    this.on("pointerdown", this.onButtonPressed);
    this.on("pointerup", this.onButtonUnPressed.bind(this, true));
    this.on("pointerupoutside", this.onButtonUnPressed.bind(this, false));
    this.on("pointercancel", this.onButtonUnPressed.bind(this, false));
    this.on("pointermove", this.onMove);
  }

  /**
   * @public
   * @param  {event} event
   * when player move mouse from button
   */
  onMove(event) {
  }

  /**
   * @public
   * @param  {boolean} state
   * press
   */
  press(state) {
  }

  /**
   * @public
   * on Button Pressed
   */
  onButtonPressed() {
    if (this.alpha === 0 || !this.visible) return;
    if (!core.buttonsAvailable || this.handler === undefined) return;
    core.buttonsAvailable = false;
    this._pressed         = true;
    this.scale.set(this.scales.pressed);
    this.press(true);

  }

  /**
   * @public
   * @param  {boolean} callHandler
   */
  onButtonUnPressed(callHandler) {
    if (!this._pressed) return;
    core.buttonsAvailable = true;

    this.scale.set(this.scales.unpressed);
    this.press(false);

    if (this._pressed && callHandler && this.handler) {
      if (this.handlerArg != null) {
        this.handler(this.handlerArg);
      } else {
        this.handler();
      }
    }

    this._pressed = false;
  }

  getButtonByName(name) {
    return this.buttons[name];
  }

  setButtonsInteractivity(value) {
    Object.keys(this.buttons).forEach((key) => {
      this.buttons[key].interactivity = value;
    });
  }
}
