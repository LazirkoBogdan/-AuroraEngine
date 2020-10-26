import UpdateComponentUI from './UpdateComponentUI';
import Pikaday from 'pikaday';

export default class CalendarInput extends PIXI.TextInput {
  constructor(config) {
    super(config.style);
    this.name = config.name;
    this._init(config);
    this.updateConfig(false);
  }

  addHandlers(config) {
    this.onEnter = config.onEnter;
    this.onExit = config.onExit;
  }

  set disabled(disabled) {
    this._disabled = disabled;
    this._dom_input.disabled = disabled;
    this._setState(disabled ? 'DISABLED' : 'DEFAULT');
    core.call(() => {
      this.cacheAsBitmap = disabled;
    }, 800);
    //
  }

  setMinMaxDate(param) {
    this._dom_calendar.setMinDate(param.minDate);
    this._dom_calendar.setMaxDate(param.maxDate);
  }

  get data() {
    
    return this._dom_calendar.getDate();
  }

  /**
   * @private
   * init config function
   */
  _init(config) {
    this._config = config;
  }

  _onFocused() {
    super._onFocused();
    this.onEnter();
    core.buttonsAvailable = false;
  }

  _onBlurred() {
    super._onBlurred();
    this.onExit();
	  core.call(() => {
		  core.buttonsAvailable = true;
	  }, 1000);

  }

  _onRemoved() {
    super._onRemoved();
  }

  _createDOMInput() {
    if (this._multiline) {
      this._dom_input = document.createElement('textarea');
      this._dom_input.style.resize = 'none';
    } else {
      this._dom_input = document.createElement('input');
      this._dom_input.type = 'text'; // can be text(it all keyboard) or number
      this._dom_input.readOnly = true;

      this._dom_calendar = new Pikaday({
        field: this._dom_input,
        theme: 'dark-theme',
        reposition: false,
        position: 'bottom left'
      });
    }

    for (let key in this._input_style) {
      this._dom_input.style[key] = this._input_style[key];
    }
  }

  _setState(state) {
    this.state = state;
    this._updateBox();
    // if (this._substituted)
    //   this._updateSubstitution()
  }

  _getDOMInputBounds() {
    let remove_after = false;

    if (!this._dom_added) {
      document.body.appendChild(this._dom_input);
      remove_after = true;
    }

    let org_transform = this._dom_input.style.transform;
    let org_display = this._dom_input.style.display;
    this._dom_input.style.transform = '';
    this._dom_input.style.display = 'block';
    let bounds = this._dom_input.getBoundingClientRect();
    this._dom_input.style.transform = org_transform;
    // this._dom_input.style.display = org_display

    if (remove_after) document.body.removeChild(this._dom_input);

    return bounds;
  }

  /**
   *@public
   * Get Spine Data from atlas
   */
  updateConfig(portrait, scaleRatio = 1, containerOffsets) {
    UpdateComponentUI.updateConfig.call(
      this,
      portrait,
      scaleRatio,
      containerOffsets
    );
    if(this._dom_calendar){
    this._dom_calendar.hide()
     if (typeof this.onExit === 'function') {
    
  //   this._onBlurred();
     this.blur();
     
    }
    }

    const orientation = portrait ? 'portrait' : 'landscape';
    if (this._config && this._config.landscape) {
      const config = this._config[orientation];
      if (config.hasOwnProperty('center')) {
        this.x = this.x - this.width / 2;
        this.y = this.y - this.height / 2;
      }
    }
  }
}
