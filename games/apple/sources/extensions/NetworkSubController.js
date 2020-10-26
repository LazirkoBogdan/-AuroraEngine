export default class NetworkSubController extends logic.fms.NetworkSubController {

  getTranslations(cb) {
    return new Promise((resolve, reject) => {
      const option     = {
        data: {},
        type: "GET",
      };
      const urlBalance = `${this.env.liveOpsUrl}v1/translations?site_module=games&language_code=${this.env.languageCode}`;

      this.request.send(urlBalance, option, onData => {
        game.model.libary.setData(onData.payload.apple);
        resolve("success");
        if (cb) cb();
      });
    });
  }

  _getOption(param) {
    const optionAPI = {
      bet:          {
        data: {
          account_id: this.env.accountID,
          sum:        Math.floor(param.sum * 100) / 100,
        },
        type: "POST",
      },
      makeChoice:   {
        data: {
          control_number: game.model.game.params ? game.model.game.params.controlNumber : 0,
          cell_number:    game.model.game.params ? game.model.game.params.cellNumber : 0,
        },
        type: "PUT",
      },
      completeGame: {
        data: {
          control_number: game.model.game.params ? game.model.game.params.controlNumber : 0,
        },
        type: "PUT",
      },
    };

    if (optionAPI.hasOwnProperty(param.name)) {
      return optionAPI[param.name];
    } else {
      throw new Error(`type of link for api is incorrect ${param.name}`);
    }
  }

  _getLink(name) {
    const linksAPI = {
      bet:          `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}`,
      makeChoice:   `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}`,
      completeGame: `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}/complete`,
    };

    if (linksAPI.hasOwnProperty(name)) {
      return linksAPI[name];
    } else {
      throw new Error(`type of link for api is incorrect ${name}`);
    }
  }
	
	getOtherBalance(id, cb) {
		return new Promise((resolve, reject) => {
			const option     = {
				data: {},
				type: 'GET',
			};
			const urlBalance = `${this.env.liveOpsUrl}user/balance`;
			
			this.request.send(urlBalance, option, onData => {
				const data = onData;
				
				game.model.setAllBalance(data);
				
				for (let i = 0; i < data.payload.length; i++) {
					const balance = data.payload[i];
					if (balance.id === Number.parseInt(id)) {
						game.model.user.setData(balance);
						break;
					}
				}
				
				resolve('success');
				
				if (cb) cb();
			});
		});
	}


}
