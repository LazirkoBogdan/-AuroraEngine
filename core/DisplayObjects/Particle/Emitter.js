import UpdateComponentUI from '../../Components/UpdateComponentUI';

/**
 * Emitter
 * Class create emitter for Particle
 * @extends PIXI.particles.Emitter
 * @exports Emitter
 */
export default class Emitter extends PIXI.particles.Emitter {
  constructor(config) {
    super(config.parent, config.texture, config.emitter);
  }
}
