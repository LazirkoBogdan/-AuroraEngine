export default class HistoryView extends game.components.UI.src.View {
	constructor() {
		super();
		this._linesHistory       = [];
		this._buttonFilter       = [];
		this.filterFieldIsActive = false;
		this.boardHistoryIsOpen  = false;
		this.getDataInProgress   = false;
		this.dataPeriodFrom      = null;
		this.dataPeriodTo        = null;
	}
	
	show() {
		super.show();
		this.firstOpen  = true;
		this.visible    = false;
		this.bg         = this._getChildByName('bg');
		this.buttonBack = this._getChildByName('back');
		
		this.buttonBack.handler = () => {
			this.hideHistory();
		};
		this.filterField        = this._getChildByName('filterField');
		
		this.boardHistory = this._getChildByName('boardHistory');
		
		this.logoEmpty = this.boardHistory.getChildByName('logoEmpty');
		

		this.spineLoader         = this.boardHistory.getChildByName('chipLoader');
		this.spineLoader.reset();
		this.spineLoader.play('show', true);
		
		this.labelData = this._getChildByName('titleMenu').
				getChildByName('description');
		
		this.buttonFilter         = this._getChildByName('filter');
		this.buttonFilter.handler = () => {
			core.buttonsAvailable = false;
			this.tweenAlphaObj(this.filterField, this.filterFieldIsActive, 0.5);
			this.tweenOffsetYObj(this.boardHistory, 500, this.boardHistoryIsOpen,
					0.7);
			this.boardHistoryIsOpen  = !this.boardHistoryIsOpen;
			this.filterFieldIsActive = !this.filterFieldIsActive;
			//	}
			core.call(() => {
				core.buttonsAvailable = true;
			}, 1000);
		};
		
		this.addFieldButtonHandler();
		
		this.createPopups();

		
		
		const scrollboxOptions = this.scrollboxOptions = {
			'boxWidth': 1050,
			'boxHeight': 1000,
			'scrollbarSize': 10,
			'scrollbarBackground': 14540253,
			'scrollbarBackgroundAlpha': 1,
			'scrollbarForeground': 8947848,
			'scrollbarForegroundAlpha': 1,
			'dragScroll': true,
			'stopPropagation': true,
			'scrollbarOffsetHorizontal': 0,
			'scrollbarOffsetVertical': 0,
			'underflow': 'top-left',
			'fadeScrollbar': false,
			'fadeScrollbarTime': 1000,
			'fadeScrollboxWait': 3000,
			'fadeScrollboxEase': 'easeInOutSine',
			'passiveWheel': false,
			'clampWheel': true,
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			
			landscape: {
				boxHeight: 650,
				boxWidth: 1750,
				
				scale:1,
				x:-880,
				y:100
				
			},
			
			portrait: {
				boxHeight: 1000,
				boxWidth: 990,
				scale:1,
				x:-500,
				y:100
			},
		};
		
		const updateScroll = this.updateScroll = new ScrollBox(scrollboxOptions);
		
	
		
		this.boardHistory.addChild(this.updateScroll);
		
		this.disableSelector();
		
		this._changeVisibility(this.logoEmpty, false);
	}
	
	createPopups() {
		this.bgPopup       = this._getChildByName('bgPopup');
		this.bgPopup.alpha = 0;
		
		this.setPopup       = this._getChildByName('SetPeriodPopup');
		this.setPopup.alpha = 0;
		
		this.addHandlerSetPopup();
	}
	
	addHandlerSetPopup() {
		const noButton       = this.setPopup.getChildByName('noButton');
		const yesButton      = this.setPopup.getChildByName('yesButton');
		const calendarParams = this.createDataCalendar();
		
		const buttonFrom           = this.setPopup.getChildByName('dataOneText');
		this.dataFromText          = buttonFrom.getChildByName('text');
		this.dataFromInputCalendar = buttonFrom.getChildByName('calendarInput');
		this.dataFromInputCalendar.setMinMaxDate(calendarParams);
		
		const handlerCalFrom = this.getCalendarHandler(this.dataFromText,
				this.dataFromInputCalendar, this.dataPeriodFrom);
		this.dataFromInputCalendar.addHandlers(handlerCalFrom);
		
		const buttonTo           = this.setPopup.getChildByName('dataTwoText');
		this.dataToText          = buttonTo.getChildByName('text');
		this.dataToInputCalendar = buttonTo.getChildByName('calendarInput');
		this.dataToInputCalendar.setMinMaxDate(calendarParams);
		
		const handlerCalTo = this.getCalendarHandler(this.dataToText,
				this.dataToInputCalendar, this.dataPeriodTo);
		this.dataToInputCalendar.addHandlers(handlerCalTo);
		
		this.dataFromInputCalendar.disabled = true;
		this.dataToInputCalendar.disabled   = true;
		
		noButton.handler = () => {
			this.tweenAlpha(this.bgPopup, true, 0.3);
			this.tweenAlpha(this.setPopup, true, 0.3);
			this.dataFromInputCalendar.disabled = true;
			this.dataToInputCalendar.disabled   = true;
		};
		
		yesButton.handler = () => {
			this.tweenAlpha(this.bgPopup, true, 0.3);
			this.tweenAlpha(this.setPopup, true, 0.3);
			this.dataFromInputCalendar.disabled = true;
			this.dataToInputCalendar.disabled   = true;
			this.filterPeriod(this.dataToText.calendarData,
					this.dataFromText.calendarData);
		};
		
		buttonFrom.handler = () => {};
		
		buttonTo.handler = () => {};
	}
	
	getCalendarHandler(text, calendar, data) {
		return {
			onEnter: () => this.calendarOnEnter(text, calendar, data),
			onExit: () => this.calendarOnExit(text, calendar, data),
		};
	}
	
	calendarOnEnter(text, calendar) {
		text.visible = true;
		
	}
	
	calendarOnExit(text, calendar) {
		const dataCalendar = calendar.data;
		
		text.visible = true;
		if (dataCalendar != null) {
			text.text = dataCalendar.toLocaleDateString('ru-RU');
			
			const dataNow          = new Date();
			const dataFromCalendar = new Date(dataCalendar);
			
			dataFromCalendar.setHours(dataNow.getHours());
			dataFromCalendar.setMinutes(dataNow.getMinutes());
			
			text.calendarData = dataFromCalendar;
			calendar.text     = '';
		}
	}
	
	createDataCalendar() {
		const data = new Date();
		
		const timeShift = new Date();
		timeShift.setDate(data.getDate() - 30);
		
		const pointer = new Date();
		pointer.setDate(data.getDate() - 15);
		
		return {
			minDate: timeShift,
			pointerData: pointer,
			maxDate: data,
		};
	}
	
	addFieldButtonHandler() {
		const buttonWeek     = this.filterField.getChildByName('weekFilter');
		const buttonDataWeek = buttonWeek.getChildByName('descriptions');
		buttonDataWeek.text  = this.generateButtonData(7);
		buttonWeek.handler   = () => {
			if (this.getDataInProgress) return;
			this.filterData(7);
			this.disableSelector(0);
		};
		
		const buttonTwoWeek     = this.filterField.getChildByName('twoWeekFilter');
		const buttonDataTwoWeek = buttonTwoWeek.getChildByName('descriptions');
		buttonDataTwoWeek.text  = this.generateButtonData(14);
		
		buttonTwoWeek.handler = () => {
			if (this.getDataInProgress) return;
			this.filterData(14);
			this.disableSelector(1);
		};
		
		const buttonMonth     = this.filterField.getChildByName('filterMonth');
		const buttonDataMonth = buttonMonth.getChildByName('descriptions');
		buttonDataMonth.text  = this.generateButtonData(30);
		
		buttonMonth.handler = () => {
			if (this.getDataInProgress) return;
			this.filterData(30);
			this.disableSelector(2);
		};
		
		const buttonPeriod     = this.filterField.getChildByName('filterSet');
		const buttonDataPeriod = buttonPeriod.getChildByName('descriptions');
		buttonDataPeriod.text  = '';
		
		buttonPeriod.handler = () => {
			if (this.getDataInProgress) return;
			this.dataFromInputCalendar.disabled = false;
			this.dataToInputCalendar.disabled   = false;
			this.disableSelector(3);
			this.tweenAlpha(this.bgPopup, false, 0.3);
			this.tweenAlphaObj(this.setPopup, false, 0.3);
		};
		
		this._buttonFilter.push(buttonWeek);
		this._buttonFilter.push(buttonTwoWeek);
		this._buttonFilter.push(buttonMonth);
		this._buttonFilter.push(buttonPeriod);
	}
	
	disableSelector(except) {
		this._buttonFilter.forEach((button, i) => {
			const selector   = button.getChildByName('selector');
			selector.visible = i === except;
		});
	}
	
	generateButtonData(day) {
		const data = new Date();
		
		const labelDateNow = data.toLocaleDateString('ru-RU');
		
		const timeShift = new Date();
		timeShift.setDate(data.getDate() - day);
		
		const labelDatePeriod = timeShift.toLocaleDateString('ru-RU');
		return labelDatePeriod + ' - ' + labelDateNow;
	}
	
	filterData(day) {
		if (this.boardHistoryIsOpen) {
			this.tweenAlphaObj(this.filterField, this.filterFieldIsActive, 0.5);
			this.tweenOffsetYObj(this.boardHistory, 500, this.boardHistoryIsOpen,
					0.7);
			this.boardHistoryIsOpen  = !this.boardHistoryIsOpen;
			this.filterFieldIsActive = !this.filterFieldIsActive;
		}
		
		this.spineLoader.visible       = true;
		this.spineLoader.cacheAsBitmap = false;
		this.spineLoader.play('show', true);
		
		this.getDataInProgress = true;
		const dataNow          = new Date();
		
		const timeShift = new Date();
		timeShift.setDate(dataNow.getDate() - day);
		
		const unixDataNow = dataNow.getUnixTime();
		
		const unixOneWeekAgo = timeShift.getUnixTime();
		
		const dataTime = {
			from: unixOneWeekAgo,
			to: unixDataNow,
		};
		
		this._removeHistory();
		
		core.buttonsAvailable = false;
		
		game.network.getHistory(dataTime, data => {
			
			if (data != null) {
				
				core.call(() => {
					
					const labelDateNow    = dataNow.toLocaleDateString('ru-RU');
					const labelDatePeriod = timeShift.toLocaleDateString('ru-RU');
					this.labelData.text   = labelDatePeriod + ' - ' + labelDateNow;
					
					this.getDataInProgress = false;
					
					game.mainController.updateUI();
					
					core.call(() => {
						core.buttonsAvailable = true;
						this._generateHistory();
						this.spineLoader.visible = false;
						this.spineLoader.reset();
					}, 1000);
					
				}, 50);
			}
		});
	}
	
	filterPeriod(from, to) {
		
		let sameData = false;
		if (from === undefined) {
			from = new Date();
		}
		
		if (to === undefined) {
			to = new Date();
		}
		
		if (this.boardHistoryIsOpen) {
			
			this.tweenAlphaObj(this.filterField, this.filterFieldIsActive, 0.5);
			this.tweenOffsetYObj(this.boardHistory, 500, this.boardHistoryIsOpen,
					0.7);
			
			this.boardHistoryIsOpen  = !this.boardHistoryIsOpen;
			this.filterFieldIsActive = !this.filterFieldIsActive;
		}
		
		this.spineLoader.visible       = true;
		this.spineLoader.cacheAsBitmap = false;
		
		this.spineLoader.play('show', true);
		
		this.getDataInProgress = true;
		
		let changePlaces = false;
		
		const data = from;
		
		data.setHours(23);
		const timeShift = to;
		timeShift.setHours(0);
		const getMonthFrom = data.getMonth();
		const getDateFrom  = data.getDate();
		
		const getMonthTo = timeShift.getMonth();
		const getDateTo  = timeShift.getDate();
		
		if (getDateFrom === getDateTo && getMonthFrom === getMonthTo) {
			const oneDay = new Date(timeShift);
			
			sameData = true;
			timeShift.setDate(oneDay.getDate() - 1);
			
		} else
			if (getDateFrom < getDateTo && getMonthFrom < getMonthTo) {
				changePlaces = false;
			} else
				if (getDateFrom < getDateTo && getMonthFrom === getMonthTo) {
					
					changePlaces = true;
					
					data.setHours(0);
					
					timeShift.setHours(23);
				}
		
		const unixDataNow    = data.getUnixTime();
		const unixOneWeekAgo = timeShift.getUnixTime();
		
		const dataTime = {
			from: changePlaces ? unixDataNow : unixOneWeekAgo,
			to: changePlaces ? unixOneWeekAgo : unixDataNow,
		};
		
		const labelDateNow    = data.toLocaleDateString('ru-RU');
		const labelDatePeriod = sameData
				? data.toLocaleDateString('ru-RU')
				: timeShift.toLocaleDateString('ru-RU');
		
		this.labelData.text = labelDatePeriod + ' - ' + labelDateNow;
		
		this._removeHistory();
		
		core.buttonsAvailable = false;
		
		game.network.getHistory(dataTime, data => {
			if (data != null) {
				core.call(() => {
					this.getDataInProgress = false;
					
					core.call(() => {
						core.buttonsAvailable = true;
						this._generateHistory();
						this.spineLoader.visible = false;
						this.spineLoader.reset();
					}, 1000);
					
					game.mainController.updateUI();
				}, 50);
			}
		});
	}
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
		const orientation = this.orientation;
		this._linesHistory.forEach(lines => {
			lines.updateConfig(orientation);
		});
		
		// if (this.lineContainerConfig) {
		// 	this.lineContainer.updateConfig(screenRatio);
		// }
		const isPortrait = this.orientation ? 'portrait' : 'landscape';
		
		if(this.scrollboxOptions){
			
			this.updateScroll.boxHeight = 	 this.scrollboxOptions[isPortrait].boxHeight
			this.updateScroll.boxWidth = 	this.scrollboxOptions[isPortrait].boxWidth
			this.updateScroll.x = 	 this.scrollboxOptions[isPortrait].x
			this.updateScroll.y = 	this.scrollboxOptions[isPortrait].y
			this.updateScroll.scale.set(this.scrollboxOptions[isPortrait].scale)
			
		}
		
	}
	
	showHistory(cb) {
		this.alpha   = 0;
		this.visible = true;
		
		this.filterData(7);
		this.disableSelector(0);
		
		this.tweenHistory(true, 0.5);
		if (cb) cb();
	}
	
	hideHistory(cb) {
		this.tweenHistory(false, 0.5);
		const config = {
			name: 'input_sum_place',
			state: false,
		};
		game.mainController.components.ui.disableSceneInput(config);
	}
	
	tweenAlphaObj(obj, on, duration) {
		const tween = core.tween.TweenMax.to(obj, duration, {alpha: on ? 0 : 1});
		tween.eventCallback('onComplete', () => {
			obj.isPositionChange = !on;
			obj.visible          = on ? 0 : 1;
			tween.kill();
		});
	}
	
	tweenAlpha(obj, on, duration) {
		const tween = core.tween.TweenMax.to(obj, duration, {alpha: on ? 0 : 1});
		tween.eventCallback('onComplete', () => {
			obj.visible     = on ? 0 : 1;
			obj.interactive = !on;
			tween.kill();
		});
	}
	
	tweenOffsetYObj(obj, offsetY, on, duration) {
		const tween = core.tween.TweenMax.to(obj, duration, {
			y: on ? obj.y - offsetY : obj.y + offsetY,
		});
		tween.eventCallback('onComplete', () => {
			obj.isPositionChange = !on;
			tween.kill();
		});
	}
	
	tweenHistory(on, duration) {
		this.bg.cacheAsBitmap = false;
		const tween           = core.tween.TweenMax.to(this, duration,
				{alpha: on ? 1 : 0});
		tween.eventCallback('onComplete', () => {
			this.visible          = on;
			this.bg.interactive   = on;
			this.bg.cacheAsBitmap = true;
			tween.kill();
		});
	}
	
	_generateHistory() {
		const labelBoardStyle = new PIXI.TextStyle({
			fill: '#dedede',
			
			align: 'left',
			fontSize: 20,
			strokeThickness: 0.3,
			
			fontFamily: 'NotoSans-Bold',
			
			letterSpacing: 0,
			
		});
		const parametersTextL = [
			{
				x: 0,
				y: -50,
				width: 230,
				height: 100,
			}, {
				x: -20,
				y: -50,
				width: 230,
				height: 100,
			}, {
				x: 0,
				y: -50,
				width: 230,
				height: 100,
			}, {
				x: 0,
				y: -50,
				width: 230,
				height: 100,
			}, {
				x: 0,
				y: -50,
				width: 230,
				height: 100,
			}, {
				x: 0,
				y: -50,
				width: 230,
				height: 100,
			}, {
				x: 0,
				y: -50,
				width: 230,
				height: 100,
			},
		];
		this.historyData      = game.model.info.history;
		if (this.historyData.length > 1) {
			this.historyData.reverse();
			const parametersTextP = [
				{
					x: 0,
					y: -50,
								width: 150,
					height: 100,
				}, {
					x: 0,
					y: -50,
								width: 150,
					height: 100,
				}, {
					x: 0,
					y: -50,
							width: 150,
					height: 100,
				}, {
					x: 0,
					y: -50,
							width: 150,
					height: 100,
				}, {
					x: 0,
					y: -50,
							width: 150,
					height: 100,
				}, {
					x: -20,
					y: -50,
					width: 150,
					height: 100,
				}, {
					x: -500,
					y: -50,
					width: 150,
					height: 100,
				},
			];
			this.historyData.forEach((line, i) => {
				const textContainer = new core.display.ResizeContainer();
				line.forEach((text, j) => {
					const config   = {
						name: 'rule_' + i,
						type: core.display.DisplayText,
						dimensions: {
							x: -65,
							y: -50,
							width: 130,
							height: 100,
						},
						debugShape: false,
						 hAlign: 1,
						// vAlign: 0,
						scaleDownToFit: true,
						paramText: {
							style: labelBoardStyle,
							text: text,
							landscape: {
								x: 0,
								y: 0,
							},
							portrait: {
								x: 0,
								y: 0,
							},
						},
						landscape: {
							x: 60 + j * 305,
							y: 30 + i * 50,
							scaleX: 1,
							scaleY: 1,
							dimensions: parametersTextL[j],
						},
						portrait: {
							x: 40 + j * 160,
							y: 30 + i * 50,
							scaleX: 1,
							scaleY: 1,
							dimensions: parametersTextP[j],
						},
					};
					const lineText = new core.display.DisplayText(config);
					// lineText.cacheAsBitmap = true;
					textContainer.addChild(lineText);
					
					this._linesHistory.push(textContainer);
				});
				this.updateScroll.content.addChild(textContainer);
			//	this.lineContainer.addItem(textContainer);
			});
			this.updateConfig(1);
		} else {
			this._showHideEmptyData(true);
		}
		
	}
	
	_showHideEmptyData(show) {
		this._changeVisibility(this.logoEmpty, show);
		//this._changeVisibility(this.filterField, !show);
		//	this._changeVisibility(this.boardHistory, !show);
		this.getDataInProgress = false;
	}
	
	_removeHistory() {
		this._linesHistory.forEach((line, i) => {
			//this.lineContainer.scrollContainer.removeChild(line);
			this.updateScroll.content.removeChild(line);
		});
	//	this.lineContainer.items             = [];
	//	this.lineContainer.scrollContainer.y = 0;
		this._showHideEmptyData(false);
	}
	
	_changeVisibility(obj, visible) {
		obj.visible = visible;
	}
}
