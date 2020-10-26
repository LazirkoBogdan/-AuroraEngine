import UpdateComponentUI from '../Components/UpdateComponentUI';
import MultiStyle from 'pixi-multistyle-text';
/**
 * Text
 * Class create Text for games
 * @extends PIXI.Text
 * @exports Text
 */
export default class MultiStyleText extends MultiStyle {
  _config;

  constructor(config) {
    super(config.text, config.style);
    this.name = config.name;
    this.disableUpdateConfig = config.disable ? config.disable : false;
    this._init(config);
  }

  /**
   *@private
   * init config
   * @param  {obj} config
   */
  _init(config) {
    this._config = config;
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
    if (this.disableUpdateConfig) return;

    UpdateComponentUI.updateConfig.call(
      this,
      portrait,
      scaleRatio,
      containerOffsets
    );
    const orientation = portrait ? 'portrait' : 'landscape';
    if (this._config && this._config.landscape) {
      const config = this._config[orientation];
      if (config.updateText) {
        this.text = config.text;
      }
    }
  }

  /**
   * Render for canvas
   * @private
   */
  _renderCanvas = function() {
    if (this.dirty) {
      this.updateText();
    }
  };

  /**
   * Get the bounds of the text
   * @private
   */
  getBounds = function(matrix) {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
  };

  /**
   *@public
   * Get Spine Data from atlas
   */
  setResponsivePosition(config) {
    UpdateComponentUI.setResponsivePosition.call(this, config);
  }
}
