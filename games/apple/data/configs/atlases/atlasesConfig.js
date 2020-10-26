export default class atlasesConfig extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
  }

  /**
   * @public
   *  config for atlasesConfig
   */

  getResources() {
    return {
      components: {
        preloader:        {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, background:    {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, backgroundtop: {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, history:       {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, loading:       {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, popup:         {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, rules:         {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, settings:      {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, appleGame:     {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, ui:            {
          resources: {
            spriteSheets: {}, spine: {},
          },
        }, uibotton:      {
          resources: {
            spriteSheets: {}, spine: {},
          },
        },
      },
    };
  }

  getAtlasConfig() {
    return {
      atlases: [
	      {
		      name: "atlas_0",
		      url:  "./assets/atlases/atlas-0.json",
	      },
		     
      ], spine: [

        {
          name: "bg", url: "./assets/spine/bg/bg.json",
        },

        {
          name: "fogParticles", url: "./assets/spine/bg/fog-particles.json",
        }, {
          name: "preloader", url: "./assets/spine/LoadingScreen/loading_screen.json",
        },
        {
          name: "right_panel", url: "./assets/spine/Apple/right_panel.json",
        }, {
          name: "branches_right", url: "./assets/spine/Apple/branches_right_pannel_ver.json",
        },
        {
          name: "branches_right_h", url: "./assets/spine/Apple/branches_right_pannel_hor.json",
        }, {
          name: "low_green_button", url: "./assets/spine/Apple/green_long _button.json",
        },
        {
          name: "red_apple_full-half", url: "./assets/spine/Apple/red_apple_full-half.json",
        }, {
          name: "square", url: "./assets/spine/Apple/square.json",
        }, {
          name: "win-lose_button", url: "./assets/spine/Apple/win-lose_button.json",
        },
        {
          name: "win-win-lose_notification", url: "./assets/spine/Apple/win-lose_notification.json",
        }, {
          name: "currencyPanel", url: "./assets/spine/MainMenu/currency_panel_ver+hor_2.json",
        },
        {
          name: "coinsHorizontal", url: "./assets/spine/MainMenu/coins_horizontal.json",
        },
        {
          name: "homeTerms", url: "./assets/spine/MainMenu/home-terms_btn2.json",
        },

        {
          name: "notification", url: "./assets/spine/MainMenu/notification.json",
        },

        {
          name: "bgMenu", url: "./assets/spine/MainMenu/bgMenu.json",
        }, {
          name: "buttonPopup", url: "./assets/spine/MainMenu/buttonPopup.json",
        },

        {
          name: "buttons", url: "./assets/spine/MainMenu/buttons.json",
        },

        {
          name: "branchesAll", url: "./assets/spine/MainMenu/branches_all_ver.json",
        },

        {
          name: "branchesAllHorizontal", url: "./assets/spine/MainMenu/branches_all_hor.json",
        }, {
          name: "coins", url: "./assets/spine/MainMenu/coins.json",
        }, {
          name: "flag_currency", url: "./assets/spine/MainMenu/flag_currency.json",
        },

        {
          name: "flag", url: "./assets/spine/MainMenu/flag.json",
        }, {
          name: "flag_Element", url: "./assets/spine/MainMenu/flag_Element.json",
        },

        {
          name: "homeButton", url: "./assets/spine/MainMenu/homeButton.json",
        },

        {
          name: "horisontalLogo", url: "./assets/spine/MainMenu/horisontal_logo.json",
        },

        {
          name: "snowWhite", url: "./assets/spine/MainMenu/snowwite.json",
        },
        {
          name: "buttonRule", url: "./assets/spine/MainMenu/buttonRule.json",
        },
      ], font: [],
    };
  }
}
