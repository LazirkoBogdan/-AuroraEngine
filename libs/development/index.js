import * as dat from 'dat.gui';

window.gUI = new dat.GUI();
window.gUI.hide();

import './pixi-legacy.min';
import './pixi-spine';
import './pixi-particles';
import './PIXI.TextInput';
import './fpsmeter';

window.game = {};

import * as tweens from './tweens/gsap';

import {ExpoScaleEase, RoughEase, SlowMo} from './tweens/EasePack.min';
import {Draggable} from './tweens/Draggable.min';
import {EaselPlugin} from './tweens/EaselPlugin.min';
import {PixiPlugin} from './tweens/PixiPlugin.min';

tweens.gsap.registerPlugin(Draggable, EaselPlugin, PixiPlugin, ExpoScaleEase, RoughEase, SlowMo);

window.tweens = tweens;

import {Viewport} from './viewport';
import {Scrollbox} from './scrollbox';

window.Viewport  = Viewport;
window.ScrollBox = Scrollbox;
