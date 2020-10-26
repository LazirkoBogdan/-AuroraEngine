export default class TestUIView extends game.components.UI.src.View {
	constructor() {
		super();
	}
	
	init({getters, handlers}) {
		super.init({getters, handlers});
	}
	
	updateConfig(screenRatio) {
		super.updateConfig(screenRatio);
	}
	
	show(config, cb) {
		super.show(config, cb);
		this.visible  = true;
		this.endPopup = this._getChildByName('endPopup');
		this.raycast  = this.endPopup.getChildByName('raycast');
		this.raycast.play('loopAnim');
		this.start = this.getObjChildByName('endPopup', 'start');
		this.start.play('starMove');
		for (let i = 2; i <= 8; i++) {
			const start = this.getObjChildByName('endPopup', `start_${i}`);
			console.log(`start_${i}`);
			start.play('starMove');
		}
	}
	
	hide(config, cb) {
		super.hide(config, cb);
		this.visible = true;
	}
	
}
