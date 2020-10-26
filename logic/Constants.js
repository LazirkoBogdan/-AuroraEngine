export default class Constants {
	static size = {
		_scaleDown: 0.70,
		_scaleDownMobile: 2,
		_isDesktop: false,
		
		_width: 1920 / 2,
		_height: 1080 / 2,
		
		_mobileWidth: 1920 / 4,
		_mobileHeight: 1080 / 4,
		
		get isDesktop() {
			return Constants.size._isDesktop;
		},
		
		set isDesktop(boolean) {
			Constants.size._isDesktop = boolean;
		},
		
		get scaleDownAssets() {
			return Constants.size.isDesktop ? Constants.size._scaleDown : Constants.size._scaleDownMobile;
		},
		
		set scaleDownAssets(number) {
			if (Constants.size.isDesktop) {
				Constants.size._scaleDown = number;
			} else {
				Constants.size._scaleDownMobile = number;
			}
		},
		
		get width() {
			return Constants.size.isDesktop ? Constants.size._width : Constants.size._mobileWidth;
		},
		
		get height() {
			return Constants.size.isDesktop ? Constants.size._height : Constants.size._mobileHeight;
		},
	};
	
	static get orientation() {
		const query = window.matchMedia('(orientation:landscape)');
		return !query.matches;
	}
	
	static request = {
		_minRequestTime: 1000,
		_maxRequestTime: 15000,
		
		get minTime() {
			return Constants.request._minRequestTime;
		},
		
		get maxTime() {
			return Constants.request._maxRequestTime;
		},
	};
}
