/**
 * Translation Model
 * Class manage translation from server
 */

import {translation} from './apple';

export default class AppleTranslationModel extends logic.submodels.TranslationModel {
	
	_translation;
	
	constructor() {
		super();
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
	

}
