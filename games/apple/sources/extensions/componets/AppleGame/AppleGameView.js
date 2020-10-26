export default class AppleGameView extends game.component.View {

  isCashOutBtnShown = false;

  isCashOutBtnShifted = false;

  isGameOpened = false;

  _square = [];

  _redApple = [];

  _squareConfigs = [];

  _redAppleConfigs = [];

  _recoveryCallBack = () => {
  };

  _cashOutButtons = {
    landscape: {}, portrait: {},
  };

  onInitialize() {
    this.alpha = 0;
    super.onInitialize();
    this._recoveryCallBack = () => {
    };
    this.createSquareConfig();
    this.createAppleConfig();
    this.createCellsSpine();
    this.createCashOutButtons();
    this.rightPanel = this.getObjChildByName("appleContainer", "right_panel");
    this.brunches_v = this.getObjChildByName("appleContainer", "branches_right");
    this.brunches_h = this.getObjChildByName("appleContainer", "branches_right_h");
	
	  let folder1 = gUI.addFolder('AppleGame');
	
	  this.showAppleSpeed =1;
	  this.buttonAppleSpeed =1;
	  this.panelAppleSpeed =1;
	
	  let parameter = {
		  appleSquare: 1,
		  buttonApple: 1,
		  panelSpeed: 1,

	  };
	
	  folder1.add(parameter, 'appleSquare', 0.1, 100).onChange((param) => {
		  setInterval(()=>{
			  this.showAppleSpeed = param;
		  },10)

	  });
	
	  folder1.add(parameter, 'buttonApple', 0.1, 100).onChange((param) => {
		  setInterval(()=>{
			  this.buttonAppleSpeed = param;
		  },10)
		
	  });
	
	  folder1.add(parameter, 'panelSpeed', 0.1, 100).onChange((param) => {
		  setInterval(()=>{
			  this.panelAppleSpeed  = param;
		  },10)
		
	  });
	  
  }

  show(config, cb) {
    super.show(config, cb);
    this.showAppleGameAnimation();
    this.alpha = 1;
    this.setCellsHandlers(config);
    this.setButtonStayHandler(config);
    this.restoreGame();
    this.setupProgressText();
    this.isGameOpened = true;
  }

  hide(config, cb) {
    this.hideAppleGameAnimation(() => {
      this.reset();
      this.alpha = 0;
      cb();
    });
  }

  createCashOutButtons() {
    Object.keys(this._cashOutButtons).forEach((orientation) => {
      this._cashOutButtons[orientation]      = new core.display.Spine(this.config[`cash_out_btn_${orientation}`]);
      this._cashOutButtons[orientation].skin = this._cashOutButtons[orientation].config.skins[orientation];
      this.addChild(this._cashOutButtons[orientation]);
    });
    this.isCashOutBtnShown = true;
    this.cashOutBtnInteractivity(false);
  }

  cashOutBtnInteractivity(on) {
    Object.values(this._cashOutButtons).forEach((spine) => spine.buttons.button_main.interactivity = on);
    this.isCashOutBtnShown = on;
  }

  showAppleGameAnimation() {
    Object.values(this._cashOutButtons).forEach((s) => {
      s.playAnimationSequence(s.config.spineAnimations.hide);
      s.currentTime = s.totalTime;
	    s.speed = this.buttonAppleSpeed
    });

    this.rightPanel.playAnimationSequence(this.rightPanel.config.spineAnimations.show);

	  this.brunches_v.playAnimationSequence(this.brunches_v.config.spineAnimations.show);
    this.brunches_h.playAnimationSequence(this.brunches_h.config.spineAnimations.show);
	  this.rightPanel.speed =  this.panelAppleSpeed
	  this.brunches_v.speed =  this.panelAppleSpeed
	  this.brunches_h.speed =  this.panelAppleSpeed

    this.square.forEach((level) => {
      level.forEach((s) => {
      	s.playAnimationSequence(s.config.animation.show)
	      s.speed = this.showAppleSpeed
      });
     
    });
  }

  hideAppleGameAnimation(cb) {
    this.rightPanel.playAnimationSequence(this.rightPanel.config.spineAnimations.hide, () => {
    	
      if (cb) cb();
      this.isGameOpened = false;
    });
    this.brunches_v.playAnimationSequence(this.brunches_v.config.spineAnimations.hide);
    this.brunches_h.playAnimationSequence(this.brunches_h.config.spineAnimations.hide);
	  this.rightPanel.speed =  this.panelAppleSpeed
	  this.brunches_v.speed =  this.panelAppleSpeed
	  this.brunches_h.speed =  this.panelAppleSpeed

    if (this.isCashOutBtnShifted) {
      this._cashOutButtons.landscape.skin = this._cashOutButtons.landscape.config.skins.btn_left;
    }

    const positions = game.model.game.params.positions;
    const status    = game.model.game.params.winStatus;
    if (positions.length <= 1 && status === 3) {
      //.
    } else {
      Object.values(this._cashOutButtons).forEach((s) => {
        s.playAnimationSequence(s.config.spineAnimations.hide);
      });
    }
    this.square.forEach((level) => {
      level.forEach((s) => s.playAnimationSequence(s.config.animation.hide));
    });
    this.apple.forEach((level) => {
      level.forEach((s) => s.playAnimationSequence(s.config.animation.hide));
    });
  }

  playCashOutShiftAnimation(isOrientationChange) {
    if (!this.orientation && !this.isCashOutBtnShifted && game.model.game.params.winStatus === 1) {
      this.isCashOutBtnShifted = true;
      this._cashOutButtons.landscape.playAnimationSequence(this._cashOutButtons.landscape.config.spineAnimations.slide, () => {
      });
      if (isOrientationChange) {
        this._cashOutButtons.landscape.currentTime = this._cashOutButtons.landscape.totalTime;
      }
    }
  }

  setCashOutBtnFilter(state) {
    const filter = new PIXI.filters.ColorMatrixFilter();
    filter.greyscale(0.4, false);
    Object.values(this._cashOutButtons).forEach((s) => {
      const sprite   = s.getSpineChildByName("long _button");
      sprite.filters = state ? [] : [filter];
      // set interactive false if disable.
      if (!state) this.cashOutBtnInteractivity(false);
    });
  }

  setButtonStayHandler(config) {
    Object.values(this._cashOutButtons).forEach((spine) => {
      spine.buttons.button_main.handler = () => {

        if (this.isCashOutBtnShifted) {
          this._cashOutButtons.landscape.skin = this._cashOutButtons.landscape.config.skins.btn_left;
        }

        spine.play(spine.config.animations.loop.name, false);

        this.square.forEach((level) => level.forEach((cell) => cell.enable = false));

        config.onButtonStay(() => {
          this.cashOutBtnInteractivity(false);
        });
      };
    });
  }

  reset() {
    this.cashOutBtnInteractivity(false);
    Object.values(this._cashOutButtons).forEach((spine) => {
      spine.play(spine.config.animations.hide.name, false);
      spine.currentTime = spine.totalTime;
    });

    this.isCashOutBtnShifted            = false;
    this._cashOutButtons.landscape.skin = this._cashOutButtons.landscape.config.skins.landscape;
  }

  setupProgressText() {
    const possibleWin      = game.model.game.params.possibleWin;
    const config           = this.baseTextConfig;
    config.paramText.style = StyleText.ui.progress[this.orientationName];
    // set visible false to text from different orientation.
    possibleWin.forEach((win, i) => {
      const textSlot                 = this.rightPanel.getSpineSlotByName(
        `${config.text_slots[this.orientation ? "landscape" : "portrait"]}${i + 1}`);
      textSlot.currentSprite.visible = false;
    });
    possibleWin.forEach((win, i) => {
      const textSlot = this.rightPanel.getSpineSlotByName(`${config.text_slots[this.orientationName]}${i + 1}`);
      new core.display.SpineText(core.formatTextSymbol(possibleWin[i]), config, textSlot);
      textSlot.currentSprite.visible = true;
    });
  }

  addCurrentProgressText(level, isOrientationChange) {
    const possibleWin      = game.model.game.params.possibleWin;
    const config           = this.baseTextConfig;
    config.paramText.style = StyleText.ui.progress_mark[this.orientationName];
    const textSlot         = this.rightPanel.getSpineSlotByName("stp_number");

    if (game.model.game.params.winStatus === 1 && level > 0) {
      const animation = this.rightPanel.config.animations.show_step;
      this.rightPanel.playAnimationSequence(animation);
      if (isOrientationChange) {
        this.rightPanel.currentTime = this.rightPanel.totalTime;
      }
      new core.display.SpineText(core.formatTextSymbol(possibleWin[level - 1]), config, textSlot);
    }
  }

  cashOutText() {
    if (game.model.game.params.winStatus !== 3) {
      const possibleWin = game.model.game.params.possibleWin;

      const positions  = game.model.game.params.positions;
      const cashOutSum = positions.length <= 1 ? possibleWin[0] : possibleWin[positions.length - 1];

      Object.values(this._cashOutButtons).forEach((spine) => {
        const config           = this.baseTextConfig;
        config.paramText.style = StyleText.ui.progress_mark_black[this.orientationName];
        const textSlot         = spine.getSpineSlotByName("long_button_text");
        new core.display.SpineText(`${core.getTranslation("stand", "buttonText")} ${core.formatTextSymbol(cashOutSum)}`, config, textSlot);
      });
    }
  }

  openSelectedLevel(cb) {
    const map      = game.model.game.params.map;
    // set progression level skin.
    this.panelSkin = map.length || 0;
    this.addCurrentProgressText(map.length || 0);

    if (game.model.game.params.winStatus === 3) {
      this.restoreGame(cb);
      this.setCashOutBtnFilter(false);
    } else this.showLevel(map.length - 1);

    // set new level available.
    this.setLevelEnable(map.length || 0);
  }

  restoreGame(cb) {
    this.setCashOutBtnFilter(true);
    const map      = game.model.game.params.map;
    // set progression level skin.
    this.panelSkin = map.length || 0;
    this.addCurrentProgressText(map.length || 0);

    // if new game, refresh matrix.
    if (!map.length) {
      this.apple.forEach((level) => level.forEach((cell) => cell.visible = false));
    }
    map.forEach((level, index) => this.showLevel(index));

    if (cb) core.call(cb, 2000);

    // set all cell interactivity false.
    this.square.forEach((level) => level.forEach((cell) => cell.enable = false));
    // set current level available.
    this.setLevelEnable(map.length || 0);
  }

  showLevel(level) {
    const map       = game.model.game.params.map;
    const positions = game.model.game.params.positions;

    this.apple[level].forEach((cell, i) => {
      const skins      = this.appleConfigs[level][i].skins;
      const isSelected = (i + 1) === positions[level];
      // set cell visible.
      cell.visible     = true;
      cell.enable      = true;
      // set cell skin.
      cell.skin        = map[level][i] === 0 ? isSelected ? skins.half_lose : skins.half : isSelected ? skins.full_win : skins.full;

      cell.playAnimationSequence(this.appleConfigs[level][i].animation.show);
	    cell.speed = this.showAppleSpeed
	    
    });
    this.showCashOutButton();
  }

  showCashOutButton() {
    if (game.model.game.params.winStatus !== 3) {
      const map = game.model.game.params.map;

      // show cashOut button with some delay.
      if (map.length) {
        if (!this.isCashOutBtnShown) {
          this.cashOutText();
          Object.values(this._cashOutButtons).forEach((spine) => {
            spine.play(spine.config.animations.show.name, false);
          });
          this.cashOutBtnInteractivity(true);
        } else {
          this.cashOutText();
        }
        if (map.length > 5 && !this.orientation) {
          this.playCashOutShiftAnimation();
        }
      }
    } else if (game.model.game.params.winStatus === 3) this.cashOutBtnInteractivity(false);
  }

  updateConfig(screenRatio) {

    super.updateConfig(screenRatio);
    const orientation = this.orientation;

    this.square.forEach((level) => level.forEach((cell) => cell.updateConfig(orientation)));

    this.apple.forEach((level) => level.forEach((cell) => cell.updateConfig(orientation)));

    this.updateElements();
  }

  updateElements() {
    const map = game.model.game.params && game.model.game.params.map;
    if (map && this.isGameOpened) {
      Object.values(this._cashOutButtons).forEach((spine) => spine.updateConfig(this.orientation));
      this.rightPanel.playCb();

      this.panelSkin = map.length || 0;
      this.setupProgressText();
      this.addCurrentProgressText(map.length || 0, true);
      core.call(() => this.cashOutText(), 1);

      if (map.length > 5 && !this.orientation) {
        this.isCashOutBtnShifted = false;
        this.playCashOutShiftAnimation(true);
      }
    }
  }

  createCellsSpine() {
    this.appleContainer = this._getChildByName(this.config.sceneObj.first.name);

    for (let level = 0; level < this.config.countOfLevels; level++) {
      this._square[level]   = [];
      this._redApple[level] = [];
      for (let cell = 0; cell < this.config.countOfCells; cell++) {

        this._square[level][cell]           = new core.display.Spine(this.squareConfigs[level][cell]);
        this._redApple[level][cell]         = new core.display.Spine(this.appleConfigs[level][cell]);
        // set apples visible false while level is closed.
        this._redApple[level][cell].visible = false;

        this.appleContainer.addChildAt(this._redApple[level][cell], 0);
        this.appleContainer.addChildAt(this._square[level][cell], 0);
      }
    }
  }

  createSquareConfig() {
    for (let level = 0; level < this.config.countOfLevels; level++) {
      this._squareConfigs[level] = [];
      for (let cell = 0; cell < this.config.countOfCells; cell++) {
        this._squareConfigs[level][cell] = this.baseSquareConfig;

        this._squareConfigs[level][cell].portrait.x += this._squareConfigs[level][cell].portrait.offset.x * [cell];
        this._squareConfigs[level][cell].portrait.y -= this._squareConfigs[level][cell].portrait.offset.y * [level];

        this._squareConfigs[level][cell].landscape.y += this._squareConfigs[level][cell].landscape.offset.y * [cell];
        this._squareConfigs[level][cell].landscape.x += this._squareConfigs[level][cell].landscape.offset.x * [level];
      }
    }
  }

  createAppleConfig() {
    for (let level = 0; level < this.config.countOfLevels; level++) {
      this._redAppleConfigs[level] = [];
      for (let cell = 0; cell < this.config.countOfCells; cell++) {
        this._redAppleConfigs[level][cell] = this.baseAppleConfig;

        this._redAppleConfigs[level][cell].portrait.x += this._redAppleConfigs[level][cell].portrait.offset.x * [cell];
        this._redAppleConfigs[level][cell].portrait.y -= this._redAppleConfigs[level][cell].portrait.offset.y * [level];

        this._redAppleConfigs[level][cell].landscape.y += this._redAppleConfigs[level][cell].landscape.offset.y * [cell];
        this._redAppleConfigs[level][cell].landscape.x += this._redAppleConfigs[level][cell].landscape.offset.x * [level];
      }
    }
  }

  setCellsHandlers(config) {
    this.square.forEach((level) => level.forEach((cell, index) => cell.handler = () => {
      Object.values(this._cashOutButtons).forEach((spine) => spine.buttons.button_main.interactivity = false);
      // set cell number.
      game.model.game.params.cellNumber = index + 1;

      const map = game.model.game.params.map;

      config.onCellChosen(() => {
        const state = game.model.game.params.winStatus !== 3;
        this.cashOutBtnInteractivity(state);
      });
      console.log(map.length);
      this.square[map && map.length || 0].forEach((cell, index) => cell.handler = () => {
      });
    }));
  }

  setLevelEnable(levelAvailable) {
    // set all cell interactivity false.
    // this.square.forEach((level) => level.forEach((cell) => cell.enable = false));

    // set interactivity true only for available level.
    if (levelAvailable < this.config.countOfLevels) this.square[levelAvailable].forEach((cell) => cell.enable = true);
    // this.square.forEach((level) => level.forEach((cell) => console.log(cell.enable)));
  }

  set panelSkin(level) {
    if (game.model.game.params.winStatus === 1) {
      const skinIndex      = level <= this.config.countOfLevels ? level : 0;
      this.rightPanel.skin = `${this.orientationSkin}${skinIndex}`;
    } else {
      // set zero skin when user lose.
      this.rightPanel.skin = `${this.orientationSkin}0`;
      // play empty animation with zero skin to clear step.
      const animation      = this.rightPanel.config.animations.clear_step;
      this.rightPanel.play(animation.name, animation.loop);
    }
  }

  get orientationSkin() {
    return this.config.skins[this.orientationName];
  }

  get orientationName() {
    return this.orientation ? "portrait" : "landscape";
  }

  get square() {
    return this._square;
  }

  get apple() {
    return this._redApple;
  }

  get squareConfigs() {
    return this._squareConfigs;
  }

  get appleConfigs() {
    return this._redAppleConfigs;
  }

  get baseSquareConfig() {
    return JSON.parse(JSON.stringify(this.config.square));
  }

  get baseAppleConfig() {
    return JSON.parse(JSON.stringify(this.config.red_apple));
  }

  get baseTextConfig() {
    return JSON.parse(JSON.stringify(this.config.progress_text));
  }

}
