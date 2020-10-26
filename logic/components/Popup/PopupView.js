import Core from '../../../core';

export default class PopupView extends game.component.View {
  show(config, cb) {
    super.show(config, cb);
  }

  onInitialize() {
    super.onInitialize();

    this.popupShow       = false;
    this.popupType       = "";
    this.goToPreviousState = false
    this.popupBlockState = [
      "startGame", "hit", "stand",
    ];
	
	  let folder1 = gUI.addFolder('Popup');
	  
	  this.popupsSpeedShow =1;
	  
	  this.popupsSpeedHide =1;
	
	  this.popupsSpineSpeed =1;
	
	  this.popupsSpineSpeedHide =1;
	
	  let parameter = {
		  speedShow: 1,
		  speedHide: 1,
		  spineSpeedShow: 1,
		  spineSpeedHide: 1,
	  };
	
	  folder1.add(parameter, 'speedShow', 0.1, 100).onChange((param) => {
		  this.popupsSpeedShow = param;
	  });
	
	  folder1.add(parameter, 'speedHide', 0.1, 100).onChange((param) => {
		  this.popupsSpeedHide = param;
	  });
	
	  folder1.add(parameter, 'spineSpeedShow', 0, 100).onChange((param) => {
	  	
		  setInterval(()=>{
			  this.popupsSpineSpeed = param;
		  },100)
		
	  });
	
	  folder1.add(parameter, 'spineSpeedHide', 0, 100).onChange((param) => {
		
		  setInterval(()=>{
			  this.popupsSpineSpeedHide = param;
		  },100)
		
	  });
	  

    this.bg = this._getChildByName("bg");

    this.bg.sceneObj.forEach(el => {
      if (typeof el.rewind === "function") {
        el.rewind("show");
      }
    });

    const popupGameOver   = this._getChildByName("gameOver");
    popupGameOver.visible = false;

    const limit   = this._getChildByName("limit");
    limit.visible = false;

    const homePopup   = this._getChildByName("home");
    homePopup.visible = false;

    const connectionPopup   = this._getChildByName("internet");
    connectionPopup.visible = false;
  }

  setLine(config) {

    if (!config.changeLine) {
      if (this.prevLine === undefined) return;
      this._mainLine          = this.prevLine;
      this._mainLine.style    = StyleText.popups.currency.main;
      this._currentLine.style = StyleText.popups.currency.other;
    } else {
      this._currentLine.style = StyleText.popups.currency.other;
      this.prevLine.style     = StyleText.popups.currency.other;
      this.prevLine           = undefined;
      this._mainLine.style    = StyleText.popups.currency.other;
      this._mainLine          = this._currentLine;
      this._mainLine          = StyleText.popups.currency.main;
    }

  }

  hideCurrentPopups(config) {

    const callback      = config.callback ? config.callback : () => {
    };
    const waitPopupHide = (config) => {
      let blockPopup = false;
      this.popupBlockState.forEach((state) => {
        if (game.mainController.state === state) {
          blockPopup = true;
        }
      });

      if (blockPopup) {
        delayFunction(config);
      } else {
        if (this.popupType === "noButton" && this.popupShow) {
          delayFunction(config);
        } else {
          hidePopup();
        }
      }

    };

    const delayFunction = (config) => {
      core.call(() => {
        waitPopupHide(config);
      }, 100);
    };

    const hidePopup = () => {
      if (this.popup) {
        if (this.closeButton) this.playPopupObj(this.closeButton.sceneObj, "playHide", 0, false);
        if (this.actionButton) this.playPopupObj(this.actionButton.sceneObj, "playHide", 0, false);
        this.hidePopups(this.popup, 0, config.callback);
      } else {
        callback();
      }
    };

    waitPopupHide(config);
  }

  updateConfig(screenRatio) {
    super.updateConfig(screenRatio);
    const orientation = this.orientation;

    const isPortrait = this.orientation ? "portrait" : "landscape";

    if (this.scrollboxOptions) {

      this.updateScroll.boxHeight = this.scrollboxOptions[isPortrait].boxHeight;
      this.updateScroll.boxWidth  = this.scrollboxOptions[isPortrait].boxWidth;
      this.updateScroll.x         = this.scrollboxOptions[isPortrait].x;
      this.updateScroll.y         = this.scrollboxOptions[isPortrait].y;
      this.updateScroll.scale.set(this.scrollboxOptions[isPortrait].scale);

    }
  }

  showPopup(config, cb) {
	  
    if (this.popupShow) return;
    this.popupShow = true;
    this.visible   = true;
    this.popupType = config.type;
		if(config.hasOwnProperty("backPreviousState")){
			this.goToPreviousState = config.backPreviousState;
		} else{
			this.goToPreviousState = false
	  }
	  core.gameIsAnimate = true;
		
		
	
	  switch (config.type) {
      case "simple":
        this.simplePopupShow(config, cb);
        break;
      case "choice":
        this.choicePopupShow(config, cb);
        break;

      case "noButton":
        this.noButtonPopupShow(config, cb);
        break;
    }
  }

  simplePopupShow(config, cb) {
    const popup = this.popup = this._getChildByName(config.name);
    this.playSpineAnimation(config);

    if (config.updateChild) this.updateChildrenPopup(popup, config.children);

    const closeButton = this.closeButton = popup.getChildByName(config.button.close);
    closeButton.enable(true);
    closeButton.handler = () => {
      closeButton.enable(false);

      this.tweenBg(false, 0.3);
      this.playPopupObj(closeButton.sceneObj, "playHide", 0, false);
      // toDo: delete it if need keyFrameAnim.
      core.tween.TweenMax.to(closeButton, 0.6, { alpha: 0 });
      //
      this.hideSpineAnimation(config);
      this.hidePopups(popup, 0, cb);
    };

    this.playPopupObj(closeButton.sceneObj, "playShow", 0.8, true);

    // toDo: delete it if need keyFrameAnim.
    closeButton.alpha = 0;
    core.tween.TweenMax.to(closeButton, 0.6, { alpha: 1 });
    //

    popup.visible = true;
    popup.alpha   = 1;
    this.tweenBg(true, 0.3);
    this.playPopupObj(this.bg.sceneObj, "playShow", 0);
	  core.gameIsAnimate = false;
    this.playPopupObj(popup.sceneObj, "playShow", 0.4, false, ()=>{

    	core.buttonsAvailable = true;
	  });
  }

  choicePopupShow(config, cb) {

    const popup   = this.popup = this._getChildByName(config.name);
    popup.visible = true;
    popup.alpha   = 1;
    this.playSpineAnimation(config);

    if (config.updateChild) this.updateChildrenPopup(popup, config.children);

    const actionButton = this.actionButton = popup.getChildByName(config.button.action);
    actionButton.enable(true);
    this.playPopupObj(actionButton.sceneObj, "playShow", 0.8, true);
    if (config.action) {
      actionButton.handler = arg => {
        this.selectedLine = false;
        this.tweenBg(false, 0.3);
        this.playPopupObj(closeButton.sceneObj, "playHide", 0, false);
        this.playPopupObj(actionButton.sceneObj, "playHide", 0, false);
        // toDo: delete it if need keyFrameAnim.
        core.tween.TweenMax.to(actionButton, 0.6, { alpha: 0 });
        core.tween.TweenMax.to(closeButton, 0.6, { alpha: 0 });
        //
        this.hideSpineAnimation(config);
        actionButton.enable(false);
        this.hidePopups(popup, 0, cb);
        config.action(arg);
      };
    }

    const closeButton = this.closeButton = popup.getChildByName(config.button.close);
    this.playPopupObj(closeButton.sceneObj, "playShow", 0.8, true);
    closeButton.enable(true);
    closeButton.handler = () => {
      this.selectedLine = false;
      closeButton.enable(false);
      if (config.close) config.close();
      this.tweenBg(false, 0.3);
      this.playPopupObj(closeButton.sceneObj, "playHide", 0, false);
      this.playPopupObj(actionButton.sceneObj, "playHide", 0, false);
      // toDo: delete it if need keyFrameAnim.
      core.tween.TweenMax.to(actionButton, 0.6, { alpha: 0 });
      core.tween.TweenMax.to(closeButton, 0.6, { alpha: 0 });
      //
      this.hideSpineAnimation(config);
      this.hidePopups(popup, 0, cb);
      actionButton.handlerArg = null;

    };
    // toDo: delete it if need keyFrameAnim.
    actionButton.alpha  = 0;
    closeButton.alpha   = 0;
    core.tween.TweenMax.to(actionButton, 0.6, { alpha: 1 });
    core.tween.TweenMax.to(closeButton, 0.6, { alpha: 1 });
    //
	  core.gameIsAnimate = false;
    this.tweenBg(true, 0.3);
    this.playPopupObj(this.bg.sceneObj, "playShow", 0);
    this.playPopupObj(popup.sceneObj, "playShow", 0.4, true,()=>{

	    core.buttonsAvailable = true;
    });
  }

  updateChildrenPopup(popup, children) {
    let child;
    children.forEach(obj => {
      switch (obj.type) {
        case "text":
          child      = popup.getChildByName(obj.name);
          child.text = obj.text;
          if (obj.style) child.style = obj.style;
          break;
        case "sprite":
          child         = popup.getChildByName(obj.name);
          child.texture = obj.texture;
          break;
      }
    });
  }

  noButtonPopupShow(config, cb) {

    let skip    = false;
    const popup = this.popup = this._getChildByName(config.name);

    if (config.updateChild) this.updateChildrenPopup(popup, config.children);
    this.playPopupObj(this.bg.sceneObj, "playShow", 0);
	  core.gameIsAnimate = false;
    core.call(() => {

      const nextAnimations = () => {
        if (skip) return;
        core.buttonsAvailable = true;
        skip                     = true;
        this.bg.interactive      = false;
        this.bg.buttonMode       = false;
        this.hidePopups(popup, 1.3, cb);

      };
      popup.visible        = true;
      popup.alpha          = 1;

      this.bg.interactive = true;
      this.bg.buttonMode  = true;

      this.bg.on("pointerdown", () => {
        if (skip) return;
        skip                     = true;
        this.bg.interactive      = false;
        this.bg.buttonMode       = false;
        this.playPopupObj(this.bg.sceneObj, "playHide", 0);
        this.playPopupObj(popup.sceneObj, "playHide", 0, false);
        this.hidePopups(popup, 0, cb);
      });
      
      this.playPopupObj(popup.sceneObj, "playShow", 0, false, nextAnimations);
    }, 500);

  }

  playPopupObj(obj, func, delay, useLoop, cb) {
    if (this.bg) {
      this.bg.interactive = true;
      this.bg.buttonMode  = true;
    }
	let speed = func === 'playShow' ? this.popupsSpeedShow:this.popupsSpeedHide

    obj.forEach(el => {
      if (typeof el[func] === "function") {
        const hasLoop = el.config.hasLoopAnim;
        if (obj.last.name === el.name) {
          if (hasLoop && useLoop) {
            el[func](delay, speed, true, () => {
              if (cb) cb();
            });
          } else {
            el[func](delay, speed, true, cb);
          }
        } else {
          if (hasLoop && useLoop) {
            el[func](delay, speed, true, () => {
            });
          } else {
            el[func](delay, speed);
          }
        }
      }
    });
  }

  hidePopups(popup, delay = 0, cb) {
	  core.gameIsAnimate = true;
    this.playPopupObj(this.bg.sceneObj, "playHide", delay, false, () => {

      this.bg.interactive = false;
      this.bg.buttonMode  = false;
      this.popup          = false;
      this.closeButton    = false;
      this.actionButton   = false;
      this.popupShow      = false;
      this.visible        = false;
      popup.visible = false;
      popup.alpha   = 0;
      
	    if (this.goToPreviousState){
		    this.goToPreviousState = false
		    game.mainController.backPreviousState();
	    }
	    core.gameIsAnimate = false;
	    
      if (cb) cb();

    });
    this.playPopupObj(popup.sceneObj, "playHide", delay, false);

  }

  setVisibilityPopup(popup, status) {
    const visible = status ? true : false;

    popup.alpha   = status ? 0 : 1;
    popup.visible = visible;

    this.visible = visible;
  }

  playSimpleShowAnimation(popup, cb) {
    this.tweenBg(true, 0.3);
    this.playAlphaTween(popup, 1, 0.1, cb);
  }

  playSpineAnimation(config) {
    if (config.spine) {
      const popupSpine = this.getObjChildByName(config.name, config.spine);
      const animations = popupSpine.config.animations;

      popupSpine.skin = config.skin;
	

	    popupSpine.play(animations.show.name, animations.show.loop, () => {

        popupSpine.play(animations.loop.name, animations.loop.loop);
		    popupSpine.speed  = this.popupsSpineSpeed;
      });
	    popupSpine.speed  = this.popupsSpineSpeed;
    }
  }

  hideSpineAnimation(config, cb) {
    if (config.spine) {
      const popupSpine = this.getObjChildByName(config.name, config.spine);
      const animations = popupSpine.config.animations;

      popupSpine.skin = config.skin;
	    popupSpine.speed  = this.popupsSpineSpeedHide;
      popupSpine.play(animations.hide.name, animations.hide.loop);
    }
  }

  tweenBg(on) {
    this.bg.interactive = on;
    this.bg.interactive = on;
    this.bg.buttonMode  = on;
  }

  playAlphaTween(obj, alpha, delay = 0, cb) {
    core.buttonsAvailable = false;
    const alphaTween      = core.tween.TweenMax.to(obj, this.config.animationSpeed / 2, {
      alpha: alpha, onComplete: () => {
        core.call(() => {
          core.buttonsAvailable = true;
        }, 1000);

        alphaTween.kill();
        if (cb) cb();
      },
    });

    alphaTween.delay(delay);
  }

  playSimpleHideAnimation(popup, cb) {
    const startY = popup.y;
    popup.alpha  = 1;
    this.tweenBg(false, 0.3, 4);

    this.playAlphaTween(popup, 0, 4, cb);
  }

  simplePopupHide(config, cb) {
  }

  choicePopupHide(config, cb) {
  }

  hidePopup(config, cb) {
    switch (config.type) {
      case "simple":
        this.simplePopupHide(config, cb);
        break;
      case "choice":
        this.choicePopupHide(config, cb);
        break;
    }
  }

  hide(config, cb) {
    this.visible = false;
  }
  
  updateLimit(){
  
  }
}
