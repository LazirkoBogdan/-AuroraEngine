import currencyToSymbolMap from 'currency-symbol-map';

/**
 * Translation Model
 * Class manage History from server
 */
export default class HistoryModel {
	_history = [];
	
	constructor() {
		this._history     = [];
		this._historyWins = [];
	}
	
	/**
	 * TODO:implemented server data
	 * setTranslation from server
	 */
	setData(data) {
		this.convertHistory(data);
	}
	
	convertHistory(data) {
		
		this._history     = [];
		this._historyWins = [];
		
		const insert = (arr, index, ...newItems) => [
			// part of the array before the specified index
			...arr.slice(0, index), // inserted items
			...newItems, // part of the array after the specified index
			...arr.slice(index),
		];
		
		data.forEach(line => {
			
			const covertLine = [];
			const winsLine   = [];
			
			const typeWin = [
				'in progress',
				core.getTranslation('lose', 'historyMenu'),
				core.getTranslation('win', 'historyMenu'),
				core.getTranslation('draw', 'historyMenu'),
			];
			
			let currency       = '';
			const codeCurrency = line.code_currency || 0;
						const sumWin = line.sum_win || 0;
			for (const prop in line) {
				
				if (line.hasOwnProperty(prop)) {
					switch (prop) {
						case 'account_id':
							break;
						
						case 'cards_dealer':
							let dealerScore = this._calculateScore(line[prop]);
							
							if (dealerScore === 22) {
								dealerScore = 21;
							}
							
							covertLine[4] = dealerScore;
							break;
						
						case 'cards_user':
							let playerScore = this._calculateScore(line[prop]);
							if (playerScore === 22) {
								playerScore = 21;
							}
							covertLine[3] = playerScore;
							winsLine[0]   = playerScore;
							break;
						
						case 'date':
							const time    = this.timeConverter(line[prop]);
							covertLine[1] = time;
							break;
						
						case 'sum_bet':
							const bet     = line[prop];
							covertLine[2] = this.formatCurrency(bet, codeCurrency);
							break;
						
						
						case 'transaction_id':
							covertLine[0] = line[prop];
							break;
						
						case 'win_status':
							//covertLine[6] = typeWin[line[prop]];
							covertLine[5] = this.generateResult(line[prop],this.formatCurrency(sumWin, codeCurrency), typeWin[line[prop]] );
							winsLine[1]   = line[prop];
						
							break;
					}
				}
			}
			this._history.push(covertLine);
			this._historyWins.push(winsLine);
		});
	}
	
	generateResult(winType, sum, result) {
		if (winType === 2) {
			return `${result}:\n${sum}`;
			
		} else {
			return result;
		}
	
	
	}
	
	
	get history() {
		return this._history;
	}
	
	get lastGame() {
		const lg          = {};
		const historyWins = this._historyWins.last;
		lg.win            = null;
		lg.playerCard     = 0;
		
		if (historyWins !== undefined) {
			lg.win        = historyWins[1];
			lg.playerCard = historyWins[0];
		}
		
		return lg;
	}
	
	timeConverter(UNIX_timestamp) {
		const date = new Date(UNIX_timestamp).toLocaleDateString('ru-RU');
		const time = new Date(UNIX_timestamp).toLocaleTimeString('ru-RU');
		
		return date + '\n' + time;
	}
	
	/**
	 *@public
	 * Get History from store
	 */
	getHistory(name) {
		if (this._history[name]) return this._history[name];
	}
	
	_calculateScore(cards) {
		let score = 0;
		cards.forEach(card => {
			score += card.value;
		});
		return score;
	}
	
	formatCurrency(value, currencyCode) {
		let currencyLogo = currencyToSymbolMap(currencyCode);
		
		if (currencyLogo === undefined) currencyLogo = '$';
		
		let nf = core.Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: currencyCode,
		});
		
		return nf.format(value).replace(currencyCode, currencyLogo);
	}
}
