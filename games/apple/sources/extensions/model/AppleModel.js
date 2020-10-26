
export default class Model extends logic.model {
	
	constructor() {
		super();
		this.libary = new logic.submodels.TranslationModel();
	}

  setData(data) {
    const payload = data.payload;
    if (payload.game) this.game.setData(payload.game);
    if (payload.balance) this.user.setBalance(payload.balance);

  }

}