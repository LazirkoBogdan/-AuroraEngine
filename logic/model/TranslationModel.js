/**
 * Translation Model
 * Class manage translation from server
 */

import {translation} from './twentyOne';

export default class TranslationModel {
	_translation;
	
	constructor() {
		this._generateStandardTranslation();
	}
	
	/**
	 * TODO:implemented server data
	 * setTranslation from server
	 */
	setData(data) {
		this._translation = data !== undefined ? data : translation;
	}
	
	get translation() {
		return this._translation;
	}
	
	/**
	 *@public
	 * Get Translation from store
	 */
	getTranslation(name) {
		if (this.translation[name]) return this.translation[name];
	}
	
	/**
	 * Default translation
	 */
	_generateStandardTranslation() {
	

	
	}
}
