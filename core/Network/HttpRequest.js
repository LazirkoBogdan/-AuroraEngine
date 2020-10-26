/**
 * HttpRequest simple class
 * @exports HttpRequest
 */
export default class HttpRequest {
	/**
	 * Enviroment variables
	 * @type {*}
	 */
	env;
	
	/**
	 * if need fetch URL
	 * @type {Boolean}
	 */
	sendRequest = true;
	
	/**
	 * Main Engine Constants
	 * @type {*}
	 */
	_constants;
	
	constructor(env, responseManager, constants) {
		this.env              = env;
		this._responseManager = responseManager;
		this._constants       = constants;
		this._requestCounter = 0;
	}
	
	/**
	 * @public
	 * @param  {string} url
	 * @param  {object} options
	 * @param  {function} cb
	 * Send request on server
	 */
	send(url, options, cb) {
		const online = navigator.onLine;
		
		if (online) {
			const data      = options ? JSON.stringify(options.data) : {};
			const type      = options ? options.type : 'POST';
			let networkMiss = true;
			
			if (!this.sendRequest) {
				return fetch(url, {method: type}).
						then(response => response.json()).
						then(responseData => {
							if (cb) cb(responseData);
						});
			}
			
			const xhr = new XMLHttpRequest();
			xhr.open(type, url);
			
			this.headers = this.env.gameMode === 'dev' ? this._getHeadersDev() : this._getHeadersProd();
			this.headers.forEach(header => {
				xhr.setRequestHeader(header.name, header.value);
			});
			xhr.timeout = this._constants.request.maxTime;
			
			xhr.send(data);
			
			setTimeout(() => {
				if (networkMiss) {
					this._responseManager.activateHandlers('fourHundredTwentyTwo');
				}
			}, 10000);
			
			xhr.onreadystatechange = () => {
				
				
				
				if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
					networkMiss = false;
					if (cb) cb(JSON.parse(xhr.responseText));
				}
				
				if (xhr.readyState === 4 && (xhr.status === 404 || xhr.status === 401 || xhr.status === 403)) {
					
					const sendLoginError = ()=>{
						core.sendAppMessage(this._messengerErrorConstructor(xhr), game.env.platformId);
						networkMiss = false;
						console.error('NEW TOKEN')
						
						this._responseManager.activateHandlers('fourHundredOne');
						if(!game.loadingFinish) {
							game.sendUserAlertMessage('An error occurred while retrieving data. Restart game')
						}else{
							this.env.getNewToken(() => {
								this._responseManager.activateHandlers('fourHundredOneComplete');
								this.send(url, options, cb);
							});
						}
					}
					
					if(game.isGameSleep){
						game.sendLogin = sendLoginError();
						return
					}
					
					sendLoginError();
					
				}
				
				if (xhr.readyState === 4 && (xhr.status === 421 || xhr.status === 422)) {
					networkMiss = false;
					
					if(!game.loadingFinish) { game.sendUserAlertMessage('An error occurred while retrieving data. Restart game') }
					
					core.sendAppMessage(this._messengerErrorConstructor(xhr), game.env.platformId);
					this._responseManager.activateHandlers('fourHundredTwentyTwo');
				}
				
				if (xhr.readyState === 4 && xhr.status >= 500) {
					networkMiss = false;
					if(!game.loadingFinish) { game.sendUserAlertMessage('An error occurred while retrieving data. Restart game') }
					this._responseManager.activateHandlers('fiveHundred');
					core.sendAppMessage(this._messengerErrorConstructor(xhr), game.env.platformId);
				}
			};
		} else {
			
			this._responseManager.activateHandlers('internetLost');
		}
	}
	
	
	
	/**
	 * Send authentication request(only dev build)
	 * @param {Function} cb
	 * @public
	 */
	sendAuth(cb) {
		const url  = 'https://x-mobile-api.affstaging.pw/v1/auth/login-user';
		const data = JSON.stringify({
			login: this.env.accountID,
			password: this.env.password,
		});
		const type = 'POST';
		
		if (!this.sendRequest) {
			return fetch(url, {method: type}).
					then(response => response.json()).
					then(responseData => {
						if (cb) cb(responseData);
					});
		}
		
		const devHeaders = this._getAutHeaders();
		
		const xhr = new XMLHttpRequest();
		xhr.open(type, url);
		
		devHeaders.forEach(header => {
			xhr.setRequestHeader(header.name, header.value);
		});
		
		xhr.timeout = 15000;
		
		xhr.send(data);
		
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
				const xmlResponse = JSON.parse(xhr.responseText);
				this.env.token    = xmlResponse.payload.token;
				if (cb) cb();
			}
		};
	}
	
	/**
	 * @private
	 * @param  {XMLHttpRequest} xhr
	 * Send request on server
	 */
	_messengerErrorConstructor(xhr) {
		return `{"code": ${xhr.status}, "message": "${xhr.statusText}"}`;
	}
	
	/**
	 * @private
	 * Header for  authentication request(only dev build)
	 */
	_getAutHeaders() {
		return [
			{
				name: 'accept',
				value: 'application/json',
			}, {
				name: 'Content-Type',
				value: 'application/json',
			}, {
				name: 'x-partner-id',
				value: '152',
			}, {
				name: 'x-app-guid',
				value: 'A6FD97BC-2215-4B2E-8743-2E11436CFA7D',
			}, {
				name: 'x-request-client-guid',
				value: '1',
			}, {
				name: 'x-language-code',
				value: this.env.languageCode,
			},
			{
				name: 'x-whence',
				value: this.env.platformId,
			},
		];
		
	}
	
	/**
	 * @private
	 * Header for  request(only dev build)
	 */
	_getHeadersDev() {
		return [
			{
				name: 'accept',
				value: 'application/json',
			},
			{
				name: 'Content-Type',
				value: 'application/json',
			},
			{
				name: 'x-partner-id',
				value: '152',
			}, {
				name: 'x-app-guid',
				value: 'A6FD97BC-2215-4B2E-8743-2E11436CFA7D',
			}, {
				name: 'x-request-client-guid',
				value: '1',
			}, {
				name: 'x-language-code',
				value: this.env.languageCode,
			}, {
				name: 'x-authorization',
				value: this.env.token,
			}, {
				name: 'x-user-id',
				value: this.env.userID,
			},
			
			{
				name: 'x-whence',
				value: this.env.platformId,
				
			},
		
		];
	}
	
	/**
	 * @private
	 * Header for  request (only Integrate build)
	 */
	_getHeadersProd() {
		if (this.env.languageCodeParameter.value === 'uk') this.env.languageCodeParameter.value = 'ua';
		return [
			{
				name: 'accept',
				value: 'application/json',
			},
			
			{
				name: 'x-whence',
				value: 35,
			},
			{
				name: 'Content-Type',
				value: 'application/json',
			},
			 this.env.partnerId, this.env.appGuidKey, this.env.requestClientGuild, this.env.languageCodeParameter, this.env.authorizationToken, this.env.userIDParameter,
		];
	}
}
