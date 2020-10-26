/**
 * EventManager
 * Manager signals from pixi
 * @extends EventEmitter
 * @exports EventManager
 */
export default class EventManager extends PIXI.utils.EventEmitter {
  constructor() {
    super();
  }

  /**
   * Dispatch ...arg
   */
  dispatch(event, ...args) {
    this.emit(event, args);
  }
}
