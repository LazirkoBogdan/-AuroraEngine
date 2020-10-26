/*global PIXI:true*/
/*global game:true*/
/*global core:true*/
import SceneObject from '../../../../../../core/Components/SceneObject.js';
import Card from './Card.js';
import UpdateComponentUI from '../../../../../../core/Components/UpdateComponentUI.js';

export default class CardField extends SceneObject {
	_deskContainer;
	
	_cardsInDeck = [];
	
	_scaleCard = 0;
	
	_cardsOnDealerTable = [];
	
	_cardsOnUserTable = [];
	
	_currentCard = [];
	
	_dealerOffsetX = 0;
	
	_dealerScaleCard = 0;
	
	_gameInProgress = false;
	
	constructor(config) {
		super(config);
		this._shuffler          = this.getChildByName('shuffler');
		this._shuffler.visible  = false;
		this.suitType           = this._config.suitType;
		this.cardType           = this._config.cardType;
		this.cardsValue         = this._config.cardsValue;
		this._playerCardOnField = 0;
		this._dealerCardOnField = 0;
		
		this.initContainers(config);
		this._generateCardDeck(config.deskConfig);
		this._field = this.getChildByName('field');
		this.reset();
		this.shuffler();
	}
	
	get cardWidth() {
		return this._cardsInDeck[0].width;
	}
	
	get cardHeight() {
		return this._cardsInDeck[0].height;
	}
	
	shuffler() {
		core.buttonsAvailable = false;
		setTimeout(() => {
			
		
			
			this._shuffler.visible  = true;
			this._shuffler.x        = this.shufflerOffsets.x;
			this._shuffler.y        = this.shufflerOffsets.y;
			this._shuffler.rotation = this.shufflerOffsets.rotation * (Math.PI / 180);
			
			setTimeout(() => {
				const shufflerConfig = this._shuffler.config;
				const orientation    = this.orientation ? 'portrait' : 'landscape';
				
				if (game.model.recovery) {
					this._shuffler.x        = shufflerConfig[orientation].x;
					this._shuffler.y        = shufflerConfig[orientation].y;
					this._shuffler.rotation = shufflerConfig[orientation].rotation * (Math.PI / 180);
				} else {
					const showTween = core.tween.TweenMax.to(this._shuffler, 0.2, {
						x: shufflerConfig[orientation].x,
						y: shufflerConfig[orientation].y,
						rotation: shufflerConfig[orientation].rotation * (Math.PI / 180),
						ease: core.tween.Quad.easeOut,
						delay: 0,
						onComplete: () => {
							showTween.kill();
			
						},
					});
				}
			},2000)
			
			this._shuffler.play('show', false, () => {
				core.buttonsAvailable = true;
				this._shuffler.cacheAsBitmap = true;
			});
		
		}, game.model.recovery ? 0 : 3000);
		
	}
	
	reset() {
		this._dealerHideCard    = [];
		this._playerCardOnField = 0;
		this._dealerCardOnField = 0;
		this._gameInProgress    = false;
		this.cardsToMove        = 0;
		this._currentCard       = [];
		this._cardsOnUserTable.forEach(data => {
			const cardUser = data.cardSprite;
			cardUser.reset();
			this._cardsInDeck.push(cardUser);
		});
		this._cardsOnUserTable = [];
		this._cardsOnDealerTable.forEach(data => {
			const card = data.cardSprite;
			card.reset();
			this._cardsInDeck.push(card);
		});
		this._cardsOnDealerTable = [];
		this.startPosition(this._orientation, this.configDesk);
	}
	
	startPosition(orientation, deskConfig) {
		if (this._field !== undefined && deskConfig) {
			const fieldPosition = new PIXI.Point(this._field.x, this._field.y);
			//TODO:REMOVE HARDCODE
			
			if (orientation == 'portrait') {
				this.startXCardField = fieldPosition.x - 1100 / 2 - 30;
				this.startYCardField = 590 + this.cardHeight / 2 - 30;
				
				this.startDealerXCardField = fieldPosition.x - 1100 / 2;
				this.startDealerYCardField = 450;
			} else {
				this.startXCardField       = fieldPosition.x - 900 - this.cardWidth / 2;
				this.startYCardField       = 650 / 2 - this.cardHeight / 2;
				this.startDealerXCardField = fieldPosition.x - 900 - (this.cardWidth / 2) * this._dealerScaleCard;
				this.startDealerYCardField = 550 / 2 - (this.cardWidth / 2) * this._dealerScaleCard - 120;
			}
		}
	}
	
	initContainers(config) {
		this._deskContainer = new core.display.SceneObject(config.deskConfig);
		this.addChild(this._deskContainer);
		this.sceneObj.push(this._deskContainer);
	}
	
	givePlayerCards(params) {
		this._gameInProgress = true;
		this.playerCb        = false;
		
		const dataCard = params.data;
		this.hideCard  = params.cardOpen;
		
		if (params.openDealerCard) {
			this._dealerHideCard.openCard();
		}
		
		if (Array.isArray(dataCard)) {
			dataCard.forEach((cardData, i) => {
				const cardSprite = this._cardsInDeck.pop();
				this._currentCard.push({
					data: cardData,
					user: params.user,
					cardSprite: cardSprite,
				});
			});
		} else {
			const cardSprite = this._cardsInDeck.pop();
			this._currentCard.push({
				data: dataCard,
				user: params.user,
				cardSprite: cardSprite,
			});
		}
		
		this.playerCb    = params.cb;
		this.cardsToMove = this._currentCard.length - 1;
		this._optionMove();
	}
	
	endGame(cb) {
		const callCB = this._cardsOnDealerTable.length <= this._cardsOnUserTable;
		const xMove  = this.orientation ? -1300 : -2000;
		
		this._cardsOnDealerTable.forEach((data, i) => {
			const card     = data.cardSprite;
			const hideCard = core.tween.TweenMax.to(card, 0.5, {
				x: xMove,
				alpha: 0,
				ease: core.tween.Expo.easeOut,
				delay: 0.1,
			});
			hideCard.eventCallback('onComplete', () => {
				core.call(() => {
					hideCard.kill();
				}, 50);
			});
		});
		
		this._cardsOnUserTable.forEach((data, i) => {
			const card     = data.cardSprite;
			const hideCard = core.tween.TweenMax.to(card, 0.5, {
				x: xMove,
				alpha: 0,
				ease: core.tween.Expo.easeOut,
				delay: 0.1,
			});
			
			hideCard.eventCallback('onComplete', () => {
				core.call(() => {
					hideCard.kill();
				}, 50);
			});
		});
		if (cb) cb();
		
		core.call(() => {
			
			this.reset();
		}, 1000);
	}
	
	/**
	 *@public
	 * Get Spine Data from atlas
	 */
	updateConfig(portrait, scaleRatio = 1, containerOffsets) {
		super.updateConfig(portrait, portrait, containerOffsets);
		const orientation = (this._orientation = portrait ? 'portrait' : 'landscape');
		if (this._config) {
			const configDesk      = (this.configDesk = this._config.deskConfig[orientation]);
			this.shufflerOffsets  = this._config[orientation].shufflerOffsets;
			this._scaleCard       = configDesk.scaleX;
			this._dealerOffsetX   = configDesk.dealerOffsetX;
			this._dealerOffsetY   = configDesk.dealerOffsetY;
			this._dealerScaleCard = configDesk.dealerScaleCard;
			
			this.startPosition(orientation, configDesk);
			this._orientationChange();
			
		}
	}
	
	_resetMoveCards() {
		this.cardsToMove  = 0;
		this._currentCard = [];
		// this._gameInProgress = false
	}
	
	_optionMove() {
		if (this._currentCard !== null && this.cardsToMove >= 0) {
			this._moveCard(this._currentCard[this.cardsToMove], this._optionMove.bind(this));
		}
		
		if (this.cardsToMove < 0) {
			this._resetMoveCards();
			core.call(() => {
				if (this.playerCb) this.playerCb();
			}, 300);
		}
	}
	
	_sortPositionCard(cardOnTable, user, orientation) {
		const dealerScaleCard = user ? 1 : this._dealerScaleCard;
		const startX          = user ? this.startXCardField : this.startDealerXCardField;
		const newCardWidth    = this.cardWidth * dealerScaleCard;
		const cardLength      = cardOnTable.length;
		const minCardToSort   = 2;
		let cardShift         = orientation ? [0, 0, 1, 2, 3, 0, 0] : [
			0, 0, 1, 1, 1, 0, 0,
		];
		if (cardLength > minCardToSort) {
			const cardLeftMove = (newCardWidth / 2) * cardShift[cardLength - 1];
			for (let i = 0; i < cardOnTable.length; ++i) {
				const cardWidth = newCardWidth * i;
				const param     = {
					x: startX - cardLeftMove + cardWidth,
				};
				this._sortCardsMove(cardOnTable[i].cardSprite, param);
			}
			if (user) {
				this.startXCardField = this.startXCardField - cardLeftMove;
			} else {
				this.startDealerXCardField = this.startDealerXCardField - cardLeftMove;
			}
		}
	}
	
	_sortCardsMove(cardSprite, param) {
		const tweenCard = core.tween.TweenMax.to(cardSprite, this._config.cardSortSpeed, param);
		tweenCard.eventCallback('onComplete', () => {
			tweenCard.kill();
		});
	}
	
	_moveCard(cardData, cb) {
		const cardTable       = cardData.user ? this._cardsOnUserTable : this._cardsOnDealerTable;
		const cardSprite      = cardData.cardSprite;
		const dealerScaleCard = cardData.user ? 1 : this._dealerScaleCard;
		cardSprite.visible    = true;
		cardSprite.alpha      = 1;
		
		if (!cardData.user) {
			const scaleTween = core.tween.TweenMax.to(cardSprite.scale, this._config.cardDealScaleSpeed, {
				x: dealerScaleCard,
				y: dealerScaleCard,
			});
			scaleTween.eventCallback('onComplete', () => {
				scaleTween.kill();
			});
		}
		
		const tweenParams = this._calculatePosition(cardData.user);
		
		const tweenCard      = core.tween.TweenMax.to(cardSprite, this._config.cardDealSpeed, tweenParams);
		const cardValueIndex = this.cardsValue.findIndex(index => {
			return index == cardData.data.value;
		});
		const cardTexName    = `${this.suitType[cardData.data.suit]}${this.cardType[cardValueIndex]}`;
		
		tweenCard.eventCallback('onComplete', () => {
			tweenCard.kill();
			this.cardsToMove--;
			cardTable.push(cardData);
			this._sortPositionCard(cardTable, cardData.user);
			if (this.cardsToMove < 0 && !this.hideCard) {
				cardSprite.changeSkin(cardTexName);
				this._dealerHideCard = cardSprite;
			} else {
				cardSprite.changeSkin(cardTexName);
				cardSprite.openCard();
			}
			cb();
		});
	}
	
	_orientationChange() {
		if (this._gameInProgress) {
			
			this._cardsOnDealerTable.forEach((obj, i) => {
				const card         = obj.cardSprite;
				const cardPosition = this._calculatePosition(false, true, i);
				card.x             = cardPosition.x;
				card.y             = cardPosition.y;
				this._resetMoveCards();
				
			});
			
			this._sortPositionCard(this._cardsOnDealerTable, false, true);
			
			this._cardsOnUserTable.forEach((obj, j) => {
				const card         = obj.cardSprite;
				const cardPosition = this._calculatePosition(true, true, j);
				card.x             = cardPosition.x;
				card.y             = cardPosition.y;
				this._resetMoveCards();
				
			});
			
			this._sortPositionCard(this._cardsOnUserTable, true, true);
			
		}
	}
	
	_calculatePosition(user, forceCal, i = 0) {
		// let cardOnField = user ? this._playerCardOnField :
		// this._dealerCardOnField;
		const cardWidth = user ? this.cardWidth : this.cardWidth * this._dealerScaleCard;
		let x           = 0;
		let y           = 0;
		
		if (forceCal) {
			if (user) {
				x = this.startXCardField + i * cardWidth;
				y = this.startYCardField;
			} else {
				x = this.startDealerXCardField + i * cardWidth;
				y = this.startDealerYCardField - this.cardHeight;
			}
		} else {
			if (user) {
				x = this.startXCardField + this._playerCardOnField * cardWidth;
				y = this.startYCardField;
				this._playerCardOnField++;
			} else {
				x = this.startDealerXCardField + this._dealerCardOnField * cardWidth;
				y = this.startDealerYCardField - this.cardHeight;
				this._dealerCardOnField++;
			}
		}
		
		return {
			x: x,
			y: y,
			rotation: 0 * (Math.PI / 180)
		};
	}
	
	_generateCardDeck(config) {
		config.cardConfig.texture = this._getTexture(config.cardConfig.texture);
		for (let i = 0; i < config.size; i++) {
			const cardDeck   = new Card(config.cardConfig);
			cardDeck.startX  = i * config.cardConfig.offsetCard;
			cardDeck.startY  = -(i * config.cardConfig.offsetCard);
			cardDeck.visible = false;
			cardDeck.id      = i;
			this._deskContainer.addChild(cardDeck);
			this._cardsInDeck.push(cardDeck);
			core.call(() => {
				cardDeck.reset();
			}, 1);
		}
	}
}
