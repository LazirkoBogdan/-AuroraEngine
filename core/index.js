import currencyToSymbolMap from 'currency-symbol-map';

/**
 * Core Class Fast access to core functional
 * @class {Core}
 */

export default class Core {
	/**
	 * Keep link on engine Classes
	 * @type {Object}
	 */
	static engine = {};

	/**
	 * Keep link on utils Classes
	 * @type {Object}
	 */
	static utils = {};

	/**
	 * Keep link on constants Classes
	 * @type {Object}
	 */
	static constants = {};

	/**
	 * Keep link on display Classes
	 * @type {Object}
	 */
	static display = {};

	/**
	 * Keep link on tween Classes
	 * @type {Object}
	 */
	static tween = {};

	/**
	 * Keep link on loader Classes
	 * @type {Object}
	 */
	static loader = {};

	/**
	 * Keep link on network Classes
	 * @type {Object}
	 */
	static network = {};

	/**
	 * Keep link on componets Classes
	 * @type {Object}
	 */
	static components = {};

	/**
	 * Keep link on events Classes
	 * @type {Object}
	 */
	static events = {};

	/**
	 * Keep link on manager Classes
	 * @type {Object}
	 */
	static manager = {};

	/**
	 * Keep link on list Classes
	 * @type {Object}
	 */
	static list = {};

	/**
	 * Keep link on animations Classes
	 * @type {Object}
	 */
	static animations = {};

	/**
	 * @public {Setter}
	 * @param  {Boolean} val
	 * buttons Available setter
	 */
	static set buttonsAvailable(val) {
		if (Core.isMobileKeyboard) return;
		Core._buttonsAvailable = val;
	}

	/**
	 * @public {Getter}
	 * @return {Boolean}
	 * buttons Available setter
	 */
	static get buttonsAvailable() {
		return Core._buttonsAvailable;
	}
}

window.core = Core;

Core.scaleDown = false;

core.gameIsAnimate = false;

core.gameLoadProgress = 0;

Core.isAndroidNotch = false;

Core.blockLoader = false;

core.disableLoaderAfterResize = false

core.needUpdateState = false;

Core.scaleDownCalculation = (number) => {

	return core.scaleDown > 1 ? number / core.scaleDown : number * core.scaleDown;
};

/**
 * @import  from 'LinkedList';
 * Linked List Class
 */
import LinkedList from './List/LinkedList';

core.list.LinkedList = LinkedList;

/**
 * @import  from 'Signal';
 * Signal Class
 */
import Signal from './Signal/Signal';

core.events.Signal = Signal;

/**
 * @import Classes for animator
 */
import KeyFrame from './Animations/KeyFrame';
import Track from './Animations/Track';
import Animation from './Animations/Animation';
import Animator from './Animations/Animator';
import CallbackAnimator from './Animations/CallbackAnimator';
import AnimationController from './Animations/AnimationController';

core.animations.KeyFrame            = KeyFrame;
core.animations.Track               = Track;
core.animations.Animation           = Animation;
core.animations.Animator            = Animator;
core.animations.CallbackAnimator    = CallbackAnimator;
core.animations.AnimationController = AnimationController;

/**
 * @imports Classes for Displays
 */
import Container from './DisplayObjects/Container';
import ResizeContainer from './DisplayObjects/ResizeContainer';
import DisplayViewport from './DisplayObjects/DisplayViewport';
import ResizeBackground from './Components/ResizeBackground';
import ScrollContainer from './Components/ScrollContainer';
import Graphics from './DisplayObjects/Graphics';
import TilingSprite from './DisplayObjects/TilingSprite';
import Sprite from './DisplayObjects/Sprite';
import Text from './DisplayObjects/Text';
import DisplayText from './DisplayObjects/DisplayText';
import SpineText from './DisplayObjects/SpineText';
import Button from './Components/Button';
import MultiButton from './Components/MultiButton';
import SceneObject from './Components/SceneObject';

import Spine from './DisplayObjects/Spine';
import Currency from './Components/Currency';
import SpineButton from './DisplayObjects/SpineButton';
import TextInput from './Components/TextInput';
import ButtonInputText from './Components/ButtonInputText';
import CalendarInput from './Components/CalendarInput';
import Emitter from './DisplayObjects/Particle/Emitter';

core.display.Container        = Container;
core.display.ResizeContainer  = ResizeContainer;
core.display.DisplayViewport  = DisplayViewport;
core.display.ResizeBackground = ResizeBackground;
core.display.ScrollContainer  = ScrollContainer;
core.display.Graphics         = Graphics;
core.display.TilingSprite     = TilingSprite;
core.display.Sprite           = Sprite;
core.display.Spine            = Spine;
core.display.SpineButton      = SpineButton;
core.display.Text             = Text;
core.display.DisplayText      = DisplayText;
core.display.SpineText        = SpineText;
core.display.Currency         = Currency;
core.display.TextInput        = TextInput;
core.display.Emitter          = Emitter;

/**
 * @Generate Classes for Component
 */
core.display.SceneObject      = SceneObject;

core.display.Button           = Button;
core.display.MultiButton      = MultiButton;
core.display.ButtonInputText  = ButtonInputText;
core.display.CalendarInput    = CalendarInput;

/**
 * @Import Classes for With Animator
 */

import KeyFrameContainer from './Animations/KeyFrameContainer';
import KeyFrameSprite from './Animations/KeyFrameSprite';
import KeyFrameTextDisplay from './Animations/KeyFrameTextDisplay';
import KeyFrameGraphics from './Animations/KeyFrameGraphics';

core.display.KeyFrameContainer   = KeyFrameContainer;
core.display.KeyFrameSprite      = KeyFrameSprite;
core.display.KeyFrameTextDisplay = KeyFrameTextDisplay;
core.display.KeyFrameGraphics    = KeyFrameGraphics;

/**
 * @Import Classes for Application
 */

import Application from './Render/Application';

Core.engine.Application = Application;

/**
 * @Import Classes for Enviroment
 */

import Enviroment from './Render/Environment';

Core.env = Enviroment;

/**
 * @Import Classes for AssetsLoader
 */

import AssetsLoader from './Loader/AssetsLoader';
import AssetsPackLoader from './Loader/AssetsPackLoader';
import AssetsStore from './Loader/AssetsStore';

Core.loader.AssetsLoader     = AssetsLoader;
Core.loader.AssetsPackLoader = AssetsPackLoader;
Core.loader.AssetsStore      = AssetsStore;

/**
 * @Import Classes for ResponseManager
 */
import ResponseManager from './ResponseManager/ResponseManager';

Core.manager.ResponseManager = ResponseManager;

/**
 * @Import Classes for ConfigManager
 */
import Config from './CofigManager/Config';
import ConfigManager from './CofigManager/ConfigManager';

Core.manager.Config        = Config;
Core.manager.ConfigManager = ConfigManager;

/**
 * @Import Classes for EventManager
 */
import EventManager from './EventManager/EventManager';

Core.events.EventManager = EventManager;

/**
 * @Import Classes for HttpRequest
 */
import HttpRequest from './Network/HttpRequest';

Core.network.HttpRequest = HttpRequest;

/**
 * @Import Classes for TweenManager
 */

Core.tween    = window.tweens;

import intl from "../libs/development/intl";
import "../libs/development/intl/locale-data/jsonp/ru";

Core.Intl = intl;

core.scaleDown = 0;

/**
 Activate last callback in array
 @type {Function}
 @param {Function} fn
 @param {Number} times
 */
const last = (fn, times) => {
	let counter = 0;

	return () => {
		if (++counter === times) {
			if (fn) fn();
		}
	};
};
Core.last  = last;

/**
 *Is Dat gui open or not
 *@type {Boolean}
 */
Core.isOpenGUI = false;

/**
 *Is Dat gui open or not
 *@type {Boolean}
 */
Core.buttonsAvailable = true;

Core.isMobileKeyboard = false;

Core.gameReturnFromSleep = false;

Core.blockKeyboard = ()=>{

};

Core.orientationchange = false;

Core.winNow = false;

/**
 *Engine version set time out
 @type {Function}
 @param {Function} func
 @param {Number}   delay
 */
Core.call = (func, delay = 0) => {
	if (typeof func !== 'function') throw new Error('First argument must be function!');
	if (delay === 0) {
		func();
		return;
	}
	return core.tween.gsap.delayedCall(delay / 1000, func);
};

/**
 *Convert Number Array
 @type {Function}
 @param {Number}   num
 */
Core.convertNumberToArray = num => {
	const numArray    = [];
	const numToString = num.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ',');
	for (let i = 0; i < numToString.length; i++) {
		numArray.push(numToString.charAt(i));
	}
	return numArray;
};

/**
 Format Text
 @type {Function}
 @param {Number} data
 */
Core.formatText = data => {
	return `${Core.convertNumberToArray(data).join('').toString()}`;
};


Core.getOrientation = () => {
	const query = window.matchMedia('(orientation:landscape)');
	return !query.matches;
};

/**
 Format Numbers
 @type {Function}
 @param {Number} num
 @param {Number} reward
 */
Core.getFormattedNum = (num, reward = num) => {
	const k                = 1000;
	const m                = 1000000;
	const b                = 1000000000;
	const truncateDecimals = (numb, digits) => {
		const multiplier   = Math.pow(10, digits);
		const adjustedNum  = numb * multiplier;
		const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

		return truncatedNum / multiplier;
	};

	if (num >= k && num < m) {
		num /= k;
		reward /= k;
		return Number.isInteger(reward) ? Math.floor(num) + 'K' : truncateDecimals(num, 1) + 'K';
	} else
		if (num >= m && num < b) {
			num /= m;
			reward /= m;
			return Number.isInteger(reward) ? Math.floor(num) + 'M' : truncateDecimals(num, 1) + 'M';
		} else
			if (num >= b) {
				num /= b;
				reward /= b;
				return Number.isInteger(reward) ? Math.floor(num) + 'B' : truncateDecimals(num, 1) + 'B';
			} else {
				return num.toString();
			}
};

/**
 Check is Mobile device
 @type {Function}
 @param {Boolean} simulate
 */
Core.isMobile = simulate => {
	if (simulate) return true;
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

Core.formatTextSymbol = (text,code) => {

  let currencyCode;

  if (game.model.recovery) {
    currencyCode = game.model.limits._payloadGame.account.currency_code;
  } else {
    currencyCode = game.model.user.userBalance.currencyCode;
  }

	if(code!=undefined){ currencyCode = code;}

	let currencyLogo = currencyToSymbolMap(currencyCode);

	if (currencyLogo === undefined) currencyLogo = '$ ';


	let nf = core.Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: currencyCode,
	});

	return nf.format(text).replace(currencyCode, currencyLogo);

};


/**
 Get Object From Parameters
 @type {Function}
 @param {String} name
 @param {Object} obj
 */
Core.getObjectFromParameters = (name, obj) => {
	return {
		name: name,
		value: obj[name],
	};
};

/**
 Get Object From Key
 @type {Function}
 @param {String} name
 @param {Object} obj
 */
Core.getKeyFromParameters = (name, obj) => {
	return obj.value;
};

/**
 Check and return iPhone model
 @type {Function}
 @return {Object}
 */
Core.getIPhoneModel = () => {
	if (window.screen.height / window.screen.width === 896 / 414 && window.devicePixelRatio === 2) {
		return {
			name:   "iPhone XR",
			faceID: true,
		};
	}

	if (window.screen.height / window.screen.width === 812 / 375 && window.devicePixelRatio === 3) {
		return {
			name:   "iPhone X",
			faceID: true,
		};
		// iPhone 6+/6s+/7+ and 8+
	} else if (window.screen.height / window.screen.width === 896 / 414 && window.devicePixelRatio === 3) {
		return {
			name:   "iPhone Max",
			faceID: true,
		};
	} else if (window.screen.height / window.screen.width === 736 / 414 && window.devicePixelRatio === 3) {
		return {
			name:   "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus",
			faceID: false,
		};
	} else if (window.screen.height / window.screen.width === 667 / 375 && window.devicePixelRatio === 3) {
		return {
			name:   "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus",
			faceID: false,
		};
		// iPhone 6/6s/7 and 8
	} else if (window.screen.height / window.screen.width === 667 / 375 && window.devicePixelRatio === 2) {
		return {
			name:   "IPhone 6, 6s, 7 or 8",
			faceID: false,
		};
	} else if (window.screen.height / window.screen.width === 1.775 && window.devicePixelRatio === 2) {
		return {
			name:   "iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 ",
			faceID: false,
		};
	} else if (window.screen.height / window.screen.width === 1.5 && window.devicePixelRatio === 2) {
		return {
			name:   "iPhone 4",
			faceID: false,
		};
	} else {
		return {
			name:   "Not an iPhone",
			faceID: false,
		};
	}
};

/**
 send message to application
 @type {Function}
 @param {String} message
 @param {String} platformID
 */
Core.sendAppMessage = (message, platformID) => {
	if (Core.isMobile(false) && !core.simulationDevice) {
		if (platformID === "32") {
			if (typeof Android !== "undefined") {
				Android.getMessageFromWebUIGame(message);
			}
		}
	} else if (platformID === "35") {

		window.webkit.messageHandlers.errorListener.postMessage(message);
	}
	console.log(message);
};
/**
get Translation
 @type {Function}
 @param {String} name
 @param {String} block
 */
Core.getTranslation = (name, block) => {
	const translation = game.model.libary.translation;
	let text;
	if (block) {
		if(typeof translation[block] != 'undefined' && typeof translation[block][name] != 'undefined' ) {
			text = translation[block][name];
		}

	} else {
		if(typeof translation[name]!= 'undefined' ) {
			text = translation[name];
		}
	}
	return text !== undefined ? typeof text === 'string'? text.toUpperCase() :"text should be string  " : " no translation ";
};



Core.showHideTween = (obj, on, duration, cb) => {
	let tween = core.tween.TweenMax.to(obj, duration, {
		alpha: on ? 1 : 0, ease: core.tween.Cubic.easeIn, onComplete: () => {
			if (cb) cb();
			tween.kill();
		},
	});
};
