export default class StyleText {
  rule          = {};
  popups        = {};
  popupGameOver = {};
  ui            = {};

  constructor() {
  }

  loadStyle() {
	  this.popupGameOver.label = {
		  title: new PIXI.TextStyle({
			  fontFamily: 'Roboto-Bold', fill: 0xFFFFFF, fontSize: 65, fontWeight: 'bold',
		  }),
		
		  description: new PIXI.TextStyle({
			  fontFamily: 'Roboto-Bold', fill: 0xFFFFFF, fontSize: 50, fontWeight: 'bold',
		  }),
	  };
    
    this.ui.progress         = {
      landscape: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#FFD29F",
        fontSize:        12,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),
      portrait:  new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#FFD29F",
        fontSize:        15,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),
    };
    this.ui.progress_mark    = {
      landscape: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#13503a",
        fontSize:        12,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),
      portrait:  new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#13503a",
        fontSize:        15,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),
    };
    this.ui.progress_mark_black    = {
      landscape: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#000",
        fontSize:        12,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),
      portrait:  new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#000",
        fontSize:        15,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),
    };
    this.ui.chip             = {
      blue: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#FFD29F",
        fontSize:        20,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),

      red: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#9d1c1c",
        fontSize:        35,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),

      green: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#13503a",
        fontSize:        35,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),

      violet: new PIXI.TextStyle({
        fontFamily:      "Roboto-Regular",
        fill:            "#770382",
        fontSize:        35,
        fontWeight:      "normal",
        letterSpacing:   0,
        strokeThickness: 1,
      }),

      yellow: new PIXI.TextStyle({
        fontFamily: "Roboto-Regular",
        fill:       "#e88d03",
        fontSize:   35,
        fontWeight: "normal",
      }),

      black: new PIXI.TextStyle({
        fontFamily: "Roboto-Regular",
        fill:       "#000000",
        fontSize:   35,
        fontWeight: "normal",
      }),
    };
    this.ui.button           = {
      main: new PIXI.TextStyle({
        dropShadow:         true,
        dropShadowAngle:    0.5,
        dropShadowBlur:     5,
        dropShadowDistance: 2,
        fontFamily:         "Roboto-Regular",
        fill:               "#e5e5e5",
        fontSize:           45,
        fontWeight:         "400",
        letterSpacing:      0,
      }),

      mainDisable: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#000000",
        fontSize:      45,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      balance: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#ffffff",
        fontSize:      50,
        fontWeight:    "400",
	      dropShadow:         true,
      }),


      code: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#ffffff",
        fontSize:      20,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      selected: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#fff400",
        fontSize:      30,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      selectedCode: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#fff400",
        fontSize:      20,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      unSelectedCode: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#ffffff",
        fontSize:      20,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      fieldButton: new PIXI.TextStyle({
        fontFamily:    "Roboto-Regular",
        fill:          "#ffffff",
        fontSize:      20,
        fontWeight:    "400",
	      dropShadow:         true,
      }),

      fastButton: new PIXI.TextStyle({
        fontFamily: "Roboto-Regular",
        fill:       "#861a00",
	      fontWeight:    "normal",
        fontSize:   20
      }),

      betButton: new PIXI.TextStyle({
        fontFamily: "Roboto-Bold",
        fill:       "#FFD29F",
        fontSize:   25,
        fontWeight: "100",
	      dropShadow:         true,
      }),

      betField: new PIXI.TextStyle({
        fontFamily: "Roboto-Bold",
        fill:       "#ffc178",
        fontSize:   20,
      }),

      rules: new PIXI.TextStyle({
        fontFamily: "Roboto-Bold",
        fill:       "#F9BB00",
        fontSize:   60,
	      dropShadow:         true,
      }),

      makeButton: new PIXI.TextStyle({
        fontFamily: "Roboto-Bold",
        fill:       "#FFD29F",
        fontSize:   20,
        fontWeight: "bold",
	      dropShadow:         true,
      }),


      fieldButtonDisable: new PIXI.TextStyle({
        fontFamily:         "Roboto-Regular",
        fill:               "#111111",
        fontSize:           35,
        fontWeight:         "400",
        letterSpacing:      0,
        dropShadow:         true,
        dropShadowAngle:    0.5,
        dropShadowBlur:     2,
        dropShadowDistance: 2,
      }),

      boxYellow: new PIXI.TextStyle({
        dropShadow:         true,
        dropShadowAngle:    0.5,
        dropShadowBlur:     2,
        dropShadowDistance: 1,
        fill:               "#fddb00",
        fontFamily:         "Roboto-Regular",
        fontSize:           30,
        strokeThickness:    0.3,
      }),
    };

    this.ui.currency = {
      balance: new PIXI.TextStyle({
        fontFamily:    "Roboto-Bold",
        fill:          "#ffffff",
        fontSize:      35,
        fontWeight:    "400",
      }),

      code: new PIXI.TextStyle({
        fontFamily:    "Roboto-Bold",
        fill:          "#ffffff",
        fontSize:      20,
        fontWeight:    "400",
        letterSpacing: 3,
      }),

      selected: new PIXI.TextStyle({
        fontFamily:    "Roboto-Bold",
        fill:          "#FFD41F",
        fontSize:      50,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      unSelected: new PIXI.TextStyle({
        fontFamily:    "Roboto-Bold",
        fill:          "#ffffff",
        fontSize:      30,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      selectedCode: new PIXI.TextStyle({
        fontFamily:    "Roboto-Bold",
        fill:          "#FFD41F",
        fontSize:      25,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

      unSelectedCode: new PIXI.TextStyle({
        fontFamily:    "Roboto-Bold",
        fill:          "#ffffff",
        fontSize:      25,
        fontWeight:    "400",
        letterSpacing: 0,
      }),

    };


    this.popupGameOver.description = {
      draw:      new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        dropShadowBlur:    9,
        fontFamily:        "Roboto-Regular",
        fill:              ["white", "#b8b2b2", "black"],
        fillGradientStops: [0, 1],
        fontSize:          60,
        fontWeight:        "400",
        letterSpacing:     -3,
        miterLimit:        1,
        strokeThickness:   1,
      }),
      bust:      new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        dropShadowBlur:    9,
        fontFamily:        "Roboto-Regular",
        fill:              ["white", "#b8b2b2", "black"],
        fillGradientStops: [0, 1],
        fontSize:          60,
        fontWeight:        "bolder",
        letterSpacing:     -3,
        miterLimit:        1,
        strokeThickness:   1,
      }),
      lose:      new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        dropShadowBlur:    9,
        fontFamily:        "Roboto-Regular",
        fill:              ["white", "#b8b2b2", "black"],
        fillGradientStops: [0, 1],
        fontSize:          60,
        fontWeight:        "bolder",
        letterSpacing:     -3,
        miterLimit:        1,
        strokeThickness:   1,
      }),
      twentyOne: new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        fontFamily:        "Roboto-Regular",
        dropShadowBlur:    9,
        fill:              ["white", "#b8b2b2", "black"],
        fillGradientStops: [0, 1],
        fontSize:          60,
        fontWeight:        "bolder",
        letterSpacing:     -3,
        miterLimit:        1,
        strokeThickness:   1,
      }),
      win:       new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        dropShadowBlur:    9,
        fontFamily:        "Roboto-Regular",
        fill:              ["white", "#b8b2b2", "black"],
        fillGradientStops: [0, 1],
        fontSize:          60,
        fontWeight:        "bolder",
        letterSpacing:     -3,
        miterLimit:        1,
        strokeThickness:   1,
      }),
    };

    this.popups.buttonText = {
      ok:  new PIXI.TextStyle({
        fontFamily:        "Roboto-Bold",
	      fill:              0xFFFFFF,
	      fontSize:          35,
	      fontWeight:        "bold",
	      dropShadow:true
      }),
      yes: new PIXI.TextStyle({
	      fontFamily:        "Roboto-Bold",
	      fill:              0xFFFFFF,
	      fontSize:          35,
	      fontWeight:        "bold",
	      dropShadow:true
      }),
      no:  new PIXI.TextStyle({
	      fontFamily:        "Roboto-Bold",
	      fill:              0xFFFFFF,
	      fontSize:          35,
	      fontWeight:        "bold",
	      dropShadow:true
      }),
    };

    this.popups.label = {
      default: new PIXI.TextStyle({
        fontFamily:        "Roboto-Bold",
        fill:              0xFFFFFF,
        fontSize:          45,
        fontWeight:        "bold",
      }),
    };

    this.popups.currency = {
      main:  new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        dropShadowBlur:    3,
        fontFamily:        "Roboto-Regular",
        fill:              ["white", "#ffab00", "white"],
        fillGradientStops: [0, 1],
        fontSize:          31,
        fontWeight:        "bolder",
        letterSpacing:     0,
        miterLimit:        1,
        strokeThickness:   0.3,
      }),
      other: new PIXI.TextStyle({
        dropShadow:        true,
        dropShadowAngle:   0.5,
        dropShadowBlur:    3,
        fontFamily:        "Roboto-Regular",
        fill:              ["white", "#b4b4b4", "black"],
        fillGradientStops: [0, 1],
        fontSize:          28,
        letterSpacing:     0,
        miterLimit:        1,
        strokeThickness:   0.3,
      }),
    };

    this.popups.description = {
      default: new PIXI.TextStyle({
	      fontFamily:        "Roboto-Bold",
	      fill:              0xFFFFFF,
	      fontSize:          30,
	      fontWeight:        "bold",
      }),
    };

    this.popups.rules = {
      header:  new PIXI.TextStyle({
        fontFamily:        "Roboto-Bold",
	      fontSize:          90,
	      fontWeight: "bold",
	      fill:       "#e2fdf9",
	      dropShadow:         true,
      }),
      landscape: new PIXI.TextStyle({
        fontFamily:        "Roboto-Bold",
        fontSize:          30,
	      fontWeight: "bold",
	      fill:       "#e2fdf9",
	      wordWrap: true,
	      wordWrapWidth: 1800,
      }),
	
	    portrait: new PIXI.TextStyle({
		    fontFamily:        "Roboto-Bold",
		    fontSize:          30,
		    fontWeight: "bold",
		    fill:       "#e2fdf9",
		    wordWrap: true,
		    wordWrapWidth: 1000,
	
	    }),
    };

    this.rule.line = {
      default: {
        fill:       "#e2fdf9",
        fontFamily: "Roboto-Regular",
        fontSize:   25,
      },
      lb:      {
        fill:       "#ffffff",
        fontFamily: "Roboto-Regular",
        fontSize:   35,
      },
      yl:      {
        fill:       "#ffd500",
        fontFamily: "Roboto-Regular",
        fontSize:   25,
      },
    };

    window.StyleText = this;
  }
}
