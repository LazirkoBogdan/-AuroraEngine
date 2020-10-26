/*global game:true*/
export default class NetworkSubController {
  env;
  
  request;
  
  constructor(env, request) {
    this.env     = env;
    this.request = request;
  }
  
  getUserBalance(cb) {
    return new Promise((resolve, reject) => {
      const option = {
        data: {},
        type: 'GET',
      };
      
      const urlBalance = `${this.env.liveOpsUrl}user/balance`;
      
      
      this.request.send(urlBalance, option, onData => {
        const data = onData;
        
        game.model.setAllBalance(data);
        
        for (let i = 0; i < data.payload.length; i++) {
          const balance = data.payload[i];
          
          if (balance.id === parseInt(this.env.currencyID, 10)) {
            game.model.user.setData(balance);
            break;
          }
        }
        
        resolve('success');
        if (cb) cb();
      });
    });
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
   
          debugger
          if (balance.id === id) {
            game.model.user.setData(balance);
            break;
          }
        }
        
        resolve('success');
        
        if (cb) cb();
      });
    });
  }
  
  getHistory(time, cb) {
    return new Promise((resolve, reject) => {
      const option    = {
        data: {},
        type: 'GET',
      };
      const urlLimits = `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}/history?platform_id=${this.env.platformId}&account_id=${this.env.accountID}&from=${time.from}&to=${time.to}`;
      this.request.send(urlLimits, option, onData => {
        const data = onData.payload;
        
        game.model.info.setData(data);
        
        resolve('success');
        if (cb) cb(data);
      });
    });
  }
  
  getTranslations(cb) {
    return new Promise((resolve, reject) => {
      const option     = {
        data: {},
        type: 'GET',
      };
      const urlBalance = `${this.env.liveOpsUrl}v1/translations?site_module=games&language_code=${this.env.languageCode}`;
      
      this.request.send(urlBalance, option, onData => {
        game.model.libary.setData(onData.payload.twentyOne);
        resolve('success');
        if (cb) cb();
      });
    });
  }
  
  getLimits(cb) {
    return new Promise((resolve, reject) => {
      const option    = {
        data: {},
        type: 'GET',
      };
      const urlLimits = `${this.env.liveOpsUrl}v1/games/limits?account_id=${this.env.accountID}&platform_id=${this.env.platformId}&game_id=${this.env.gameID}`;
      this.request.send(urlLimits, option, onData => {
        const data = onData.payload;
        game.model.limits.setData(data);
        resolve('success');
        if (cb) cb();
      });
    });
  }
  
  getStatus(cb) {
    return new Promise((resolve, reject) => {
      const option = {
        data: {},
        type: 'GET',
        status: true,
      };
      
      const urlStatus = `${this.env.liveOpsUrl}v1/games/${this.env.gameNameAPI}?platform_id=${this.env.platformId}`;
      
      this.request.send(urlStatus, option, onData => {
        const data = onData;
        
        if (data.payload.game) {
          game.model.recovery = true;
          game.model.setData(data);
          if (cb) cb();
        } else {
          game.model.recovery = false;
          if (cb) cb();
        }
        resolve('success');
      });
    });
  }
  
  sendRequest(param, cb) {
    const url    = this._getLink(param.name);
    const option = this._getOption(param);
    this.request.send(url, option, onData => {
      game.model.setData(onData);
      if (cb) cb();
    });
  }
  
  _getOption(param) {
    const optionAPI = {
      bet: {
        data: {
          platform_id: this.env.platformId,
          account_id: this.env.accountID,
          sum: Math.floor(param.sum * 100) / 100,
        },
        type: 'POST',
      },
      getCard: {
        data: {
          platform_id: this.env.platformId,
          game_id: this.env.gameId,
        },
        type: 'PUT',
      },
      completeGame: {
        data: {
          platform_id: this.env.platformId,
          game_id: this.env.gameId,
        },
        type: 'PUT',
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
      bet: `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}`,
      getCard: `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}`,
      completeGame: `${this.env.liveOpsUrl}games/${this.env.gameNameAPI}/complete`,
    };
    
    if (linksAPI.hasOwnProperty(name)) {
      return linksAPI[name];
    } else {
      throw new Error(`type of link for api is incorrect ${name}`);
    }
  }
}
