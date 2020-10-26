
export default class StyleText {
  rule = {};
  popups = {};
  popupGameOver = {};
  ui = {};

  constructor() {}
  loadStyle() {
    this.popupGameOver.label = {
      draw: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 25,
        dropShadowDistance: 20,
        fill: ['#07A7F6', 'black'],
        fillGradientType: 1,
        fillGradientStops: [0, 1],
        fontFamily: 'NotoSans-Bold',
        fontSize: 200,
        fontWeight: 'bolder',
        letterSpacing: -6,
        miterLimit: 1,
        strokeThickness: 1
      }),
      bust: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 20,
        dropShadowDistance: 20,
        fill: ['#eb4600', 'black'],
        fillGradientType: 1,
        fillGradientStops: [0, 1],
        fontFamily: 'NotoSans-Bold',
        fontSize: 200,
        fontWeight: 'bolder',
        letterSpacing: -6,
        miterLimit: 1,
        strokeThickness: 1
      }),
      lose: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 20,
        dropShadowDistance: 20,
        fill: ['#c51111', 'black'],
        fillGradientType: 1,
        fillGradientStops: [0, 1],
        fontFamily: 'NotoSans-Bold',
        fontSize: 200,
        fontWeight: 'bolder',
        letterSpacing: -6,
        miterLimit: 1,
        strokeThickness: 1
      }),
      twentyOne: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 25,
        dropShadowDistance: 20,
        fill: ['#36ff00', 'black'],
        fillGradientType: 1,
        fillGradientStops: [0, 1],
        fontFamily: 'NotoSans-Bold',
        fontSize: 200,
        fontWeight: 'bolder',
        letterSpacing: -6,
        miterLimit: 1,
        strokeThickness: 1
      }),
      win: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 25,
        dropShadowDistance: 20,
        fill: ['#fd0', 'black'],
        fillGradientType: 1,
        fillGradientStops: [0, 1],
        fontFamily: 'NotoSans-Bold',
        fontSize: 200,
        fontWeight: 'bolder',
        letterSpacing: -6,
        miterLimit: 1,
        strokeThickness: 1
      })
    };
    this.ui.chip = {
      blue: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#0059bb',
        fontSize: 35,
        fontWeight: 'normal',
        letterSpacing: 0,
        strokeThickness: 1
      }),

      red: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#9d1c1c',
        fontSize: 35,
        fontWeight: 'normal',
        letterSpacing: 0,
        strokeThickness: 1
      }),

      green: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#13503a',
        fontSize: 35,
        fontWeight: 'normal',
        letterSpacing: 0,
        strokeThickness: 1
      }),

      violet: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#770382',
        fontSize: 35,
        fontWeight: 'normal',
        letterSpacing: 0,
        strokeThickness: 1
      }),

      yellow: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#e88d03',
        fontSize: 35,
        fontWeight: 'normal'
      }),

      black: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#000000',
        fontSize: 35,
        fontWeight: 'normal'
      })
    };
    this.ui.button = {
      main: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 5,
        dropShadowDistance: 2,
        fontFamily: 'NotoSans-Bold',
        fill: '#e5e5e5',
        fontSize: 45,
        fontWeight: '800',
        letterSpacing: 0
      }),

      mainDisable: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#000000',
        fontSize: 45,
        fontWeight: '800',
        letterSpacing: 0
      }),

      fieldButton: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Light',
        fill: '#ffffff',
        fontSize: 35,
        fontWeight: '400',
        letterSpacing: 0
      }),

      fieldButtonDisable: new PIXI.TextStyle({
        fontFamily: 'NotoSans-Bold',
        fill: '#111111',
        fontSize: 35,
        fontWeight: '800',
        letterSpacing: 0,
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 2,
        dropShadowDistance: 2
      }),

      boxYellow: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 2,
        dropShadowDistance: 1,
        fill: '#fddb00',
        fontFamily: 'NotoSans-Bold',
        fontSize: 30,
        strokeThickness: 0.3
      })
    };

    this.popupGameOver.description = {
      draw: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 9,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 60,
        fontWeight: '800',
        letterSpacing: -3,
        miterLimit: 1,
        strokeThickness: 1
      }),
      bust: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 9,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 60,
        fontWeight: 'bolder',
        letterSpacing: -3,
        miterLimit: 1,
        strokeThickness: 1
      }),
      lose: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 9,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 60,
        fontWeight: 'bolder',
        letterSpacing: -3,
        miterLimit: 1,
        strokeThickness: 1
      }),
      twentyOne: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        fontFamily: 'NotoSans-Bold',
        dropShadowBlur: 9,
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 60,
        fontWeight: 'bolder',
        letterSpacing: -3,
        miterLimit: 1,
        strokeThickness: 1
      }),
      win: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 9,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 60,
        fontWeight: 'bolder',
        letterSpacing: -3,
        miterLimit: 1,
        strokeThickness: 1
      })
    };

    this.popups.buttonText = {
      ok: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        fontFamily: 'NotoSans-Bold',
        dropShadowBlur: 3,
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: 0,
        miterLimit: 1,
        strokeThickness: 0.3
      }),
      yes: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        fontFamily: 'NotoSans-Bold',
        dropShadowBlur: 3,
        fill: ['white', '#c7c7c7', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0,
        miterLimit: 1,
        strokeThickness: 0.3
      }),
      no: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 3,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0,
        miterLimit: 1,
        strokeThickness: 0.3
      })
    };

    this.popups.label = {
      default: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 3,
        fontFamily: 'Roboto',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 70,
        fontWeight: 'bold',
      })
    };

    this.popups.currency = {
      main: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 3,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#ffab00', 'white'],
        fillGradientStops: [0, 1],
        fontSize: 31,
        fontWeight: 'bolder',
        letterSpacing: 0,
        miterLimit: 1,
        strokeThickness: 0.3
      }),
      other: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 3,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b4b4b4', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 28,
        letterSpacing: 0,
        miterLimit: 1,
        strokeThickness: 0.3
      })
    };

    this.popups.description = {
      default: new PIXI.TextStyle({
        dropShadow: true,
        dropShadowAngle: 0.5,
        dropShadowBlur: 3,
        fontFamily: 'NotoSans-Bold',
        fill: ['white', '#b8b2b2', 'black'],
        fillGradientStops: [0, 1],
        fontSize: 35,
        letterSpacing: 0,
        miterLimit: 1,
        strokeThickness: 0.3
      })
    };

    this.rule.line = {
      default: {
        fill: '#e2fdf9',
        fontFamily: 'NotoSans-Bold',
        fontSize: 25
      },
      lb: {
        fill: '#ffffff',
        fontFamily: 'NotoSans-Bold',
        fontSize: 35
      },
      yl: {
        fill: '#ffd500',
        fontFamily: 'NotoSans-Bold',
        fontSize: 25
      }
    };

    window.StyleText = this;
  }
}
