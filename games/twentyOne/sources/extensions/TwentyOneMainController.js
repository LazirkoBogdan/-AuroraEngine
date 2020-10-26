
export default class TwentyOneMainController extends logic.fms.MainController {
	
	constructor(model, responseManager) {
		super(model, responseManager);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	onStart() {
		super.onStart()
		this.addMenu();
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	updateStateUI(state) {
		super.updateStateUI(state)
		core.needUpdateState = true;
		this.components.ui.updateStateUI(state);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	showHistory(cb) {
		const config = {
			name: 'input_sum_place',
			state: true,
		};
		this.hideSubMenu();
		this.components.ui.disableSceneInput(config);
		this.components.history.showHistory();
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	hideHistory(cb) {
		this.components.history.hideHistory(cb);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	updateUI() {
		super.updateUI()

		this.components.ui.updateUI();
		if (this.components.rules) this.components.rules.updateUI();
		if (this.components.uibotton) {
			this.components.uibotton.updateUI();
		}
		if (this.components.popup) {
			this.components.popup.updateDataCurrencyPopup();
		}
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	resetAccount() {
		let config = {
			changeLine: false,
		};
		
		this.components.popup.setLine(config);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	resetTwentyOne(cb) {
		this.model.temporaryBet            = 0;
		this.model.game.params.userScore   = '';
		this.model.game.params.dealerScore = '';
		
		this.components.twentyone.resetGame(cb);
		this.components.ui.clearBet();
		this.components.ui.reset();
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	showRule(cb) {
		const config = {
			name: 'input_sum_place',
			state: true,
		};
		
		this.components.ui.disableSceneInput(config);
		this.components.rules.showRules(cb);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	hideRules(cb) {
		this.components.rules.hideRules(cb);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	showSetting(cb) {
		const config = {
			name: 'input_sum_place',
			state: true,
		};
		this.components.ui.disableSceneInput(config);
		this.components.settings.showSetting(cb);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	hideSetting(cb) {
		this.components.settings.hideSetting(cb);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	showSubMenu(cb) {
		const config       = {};
		config.name        = 'buttonMenuOpen';
		config.closeAction = () => {
			this.swapComponent(3, 4, false);
		};
		this.components.ui.showSubMenu(config);
		this.swapInProgress = false;
		this.swapComponent(3, 4, true);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	swapComponent(child1, child2, first) {
		
		if (this.swapInProgress) return;
		
		this.swapInProgress = true;
		
		const mainContainer = game.application.mainContainer;
		
		const firstChild  = mainContainer.children[child1];
		
		const secondChild = mainContainer.children[child2];
		
		core.call(() => {
			this.swapInProgress = false;
		}, 300);
		
		if (first && firstChild.name === 'ui') {
			mainContainer.swapChildren(firstChild, secondChild);
		} else
			if (!first && firstChild.name === 'twentyone') {
				mainContainer.swapChildren(firstChild, secondChild);
			} else {
				console.error('wrong swap');
			}
		
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	hideSubMenu(cb) {
		const config = {};
		config.name  = 'buttonMenuOpen';
		this.components.ui.hideSubMenu(config, cb);

//		this.swapComponent(3, 4);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	addMenu() {
		const config    = {};
		config.name     = 'buttonMenuOpen';
		config.handlers = [
			() => this.showHistory(() => {
				this.hideSubMenu();
			}), () => this.showRule(() => {
				this.hideSubMenu();
			}), () => this.showSetting(() => {
				this.hideSubMenu();
			}),
		];
		this.components.ui.addHandlers(config);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	mainRightButtonInteractive() {
		switch (this.state) {
			case 'betGame':
				this.startRound();
				break;
			case 'selectGame':
				this.takeNewCard();
				break;
			default:
				// eslint-disable-next-line no-console
				console.log('miss state');
				break;
		}
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	startRound() {
		if (this.model.temporaryBet < this.model.minBet) {
			this.showWrongBetPopup(false);
			return;
		} else
			if (this.model.temporaryBet > this.model.maxBet) {
				this.showWrongBetPopup(true);
				return;
			}
		const paramBet        = {
			name: 'bet',
			sum: this.model.temporaryBet,
		};
		core.buttonsAvailable = false;
		game.network.sendRequest(paramBet, () => {
			core.buttonsAvailable = true;
			game.env.gameId       = this.model.game.params.gameId;
			this._changeState('startGame');
		});
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	giveUserCard(start, cb) {
		
		const config = {
			name: 'cardfield',
			user: true,
			cardOpen: true,
			
			data: start ? this.model.game.params.cardsUser : this.model.game.params.cardOpened,
			uiUpdate: () => this.updateUI(),
			cb: cb,
		};
		
		this.components.twentyone.giveUserCard(config);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	giveDealerCard(start, cb) {
		const config = {
			name: 'cardfield',
			user: false,
			cardOpen: true,
			data: start ? this.model.game.params.cardsDealer : this.model.game.params.cardsDealer.last,
			uiUpdate: () => this.updateUI(),
			cb: cb,
		};
		this.components.twentyone.giveUserCard(config);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	stayDealerCard(cb) {
		const config = {
			name: 'cardfield',
			user: false,
			cardOpen: true,
			data: this.model.game.params.cardsCompleted,
			uiUpdate: () => this.updateUI(),
			cb: cb,
		};
		
		this.components.twentyone.giveUserCard(config);
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	resultRound() {
		if (this.model.game.params.winNow) {
			this._changeState('gameOver');
			return;
		}
		
		if (this.model.game.params.userScore === 21 && this.state !== 'stand') {
			this.playerStand();
			
		} else {
			const win = this.model.game.params.winStatus;
			switch (win) {
				case 0:
					this._changeState('selectGame');
					break;
				case 1:
				case 2:
				case 3:
					this._changeState('gameOver');
					break;
			}
		}
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	takeNewCard() {
		
		const params          = {name: 'getCard'};
		core.buttonsAvailable = false;
		game.network.sendRequest(params, () => {
			core.buttonsAvailable = true;
			this._changeState('hit');
		});
		
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	mainLeftButtonInterective() {
		switch (this.state) {
			case 'betGame':
				this.clearBet();
				break;
			case 'selectGame':
				this.playerStand();
				break;
			default:
				break;
		}
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	playerStand() {
		const params          = {name: 'completeGame'};
		core.buttonsAvailable = false;
		game.network.sendRequest(params, () => {
			core.buttonsAvailable = true;
			this._changeState('stand');
		});
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	showEndGamePopup() {
		const config            = this.endGamePopupConfig();
		this.model.temporaryBet = 0;
		this.updateUI();
		this.reset();
		this.components.popup.showPopup(config, () => {
			this.resetTwentyOne(() => {
				this.reset();
			});
		});
	}
	/**
	 * @public
	 * @param  {cb} cb
	 * press
	 */
	endGamePopupConfig() {
		const playerScore           = this.model.game.params.userScore;
		const sumWin                = this.model.game.params.sumBet;
		const currencyCode          = this.model.user.userBalance.currencyCode;
		const stylePopupLabel       = StyleText.popupGameOver.label;
		const stylePopupDescription = StyleText.popupGameOver.description;
		
		const labelStyleArray = [
			stylePopupLabel.draw,
			playerScore > 21 ? stylePopupLabel.bust : stylePopupLabel.lose,
			playerScore === 21 ? stylePopupLabel.twentyOne : stylePopupLabel.win,
			stylePopupLabel.draw,
		];
		const descStyleArray  = [
			stylePopupDescription.draw,
			playerScore > 21 ? stylePopupDescription.bust : stylePopupDescription.lose,
			playerScore === 21 ? stylePopupDescription.win : stylePopupDescription.win,
			stylePopupDescription.draw,
		];
		
		const descriptions = [
			'Game is Active',
			playerScore > 21 ? core.getTranslation('description', 'popupGameOver').bust : core.getTranslation('description',
					'popupGameOver').lose,
			playerScore === 21 ? core.getTranslation('description', 'popupGameOver').twentyOne : this.formatCurrency(
					sumWin * 2) + ' ',
			`${core.getTranslation('description', 'popupGameOver').draw}`,
		];
		const texts        = [
			'Game is Active',
			playerScore > 21 ? core.getTranslation('title', 'popupGameOver').bust : core.getTranslation('title',
					'popupGameOver').lose,
			playerScore === 21 ? core.getTranslation('title', 'popupGameOver').twentyOne : this.core.getTranslation('title',
					'popupGameOver').win,
		      core.getTranslation('title', 'popupGameOver').draw,
		];
		const tex          = [
			'Game is Active',
			playerScore > 21 ? 'bg_bust_animation' : 'bg_lose_animation',
			playerScore === 21 ? 'bg_twenty_one_animation' : 'bg_win_animation',
			'bg_draw_animation',
		];
		const winStatus    = this.model.game.params.winStatus;
		
		const paramPopups        = {};
		paramPopups.name         = 'gameOver';
		paramPopups.type         = 'noButton';
		paramPopups.updateChild  = true;
		paramPopups.particlePlay = winStatus === 2;
		
		switch (this.model.game.params.winStatus) {
			case 0:
				break;
			case 1:
				this.model.lose++;
				break;
			case 2:
				this.model.wins++;
				break;
			
			case 3:
				this.model.draw++;
				break;
			
			default:
				break;
		}
		const win             = texts[winStatus];
		const texDescription  = tex[winStatus];
		const textDescription = descriptions[winStatus];
		const labelStyle      = labelStyleArray[winStatus];
		const descStyle       = descStyleArray[winStatus];
		this.model.gameCount++;
		
		paramPopups.children = [
			{
				type: 'text',
				name: 'text',
				text: win,
				style: labelStyle,
			},
			
			{
				type: 'text',
				name: 'description',
				text: textDescription,
				style: descStyle,
			}, {
				type: 'sprite',
				name: 'winLine',
				texture: game.getTexture(texDescription),
			},
		];
		
		this.updateUI();
		return paramPopups;
	}
	
}
