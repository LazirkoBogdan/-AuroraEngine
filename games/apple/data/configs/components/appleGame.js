export default class appleGame extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for testGame
   */
  createConfig() {
    this._config.appleGame = {
      id:     "AppleGame",
      type:   "applegame",
      config: {
        name:                   "applegame",
        visible:                false,
        needMask:               false,
        parentGroup:            "DEFAULT",
        testText:               {
          on:   false,
          text: "AppleGame",
        },
        skins:                  {
          portrait:  "1.vertical/v_stp",
          landscape: "2.horizontal/h_stp",
        },
        countOfCells:           5,
        countOfLevels:          10,
        square:                 {
          name:           "square",
          enableSceneObj: false,
          animation:      {
            show: {
              name:       "show",
              loop:       false,
              onComplete: {
                name: "loop",
                loop: true,
              },
            },
            hide: {
              name: "hide",
              loop: false,
            },
          },
          landscape:      {
            x:                  -867,
            y:                  -243,
            scaleX:             2,
            scaleY:             2,
            offset:             {
              x: 190,
              y: 166,
            },
            responsivePosition: {
              position: "center",
            },
          },
          portrait:       {
            x:                  -445,
            y:                  714,
            scaleX:             2,
            scaleY:             2,
            offset:             {
              x: 167,
              y: 166,
            },
            responsivePosition: {
              position: "center",
            },
          },
        },
        red_apple:              {
          name:           "red_apple_full-half",
          enableSceneObj: false,
          skins:          {
            full:      "full",
            full_win:  "full-win",
            half:      "half",
            half_lose: "half-lose",
          },
          animation:      {
            show: {
              name:       "show",
              loop:       false,
              onComplete: {
                name: "loop",
                loop: true,
              },
            },
            hide: {
              name: "hide",
              loop: false,
            },
          },
          landscape:      {
            x:                  -867,
            y:                  -243,
            scaleX:             2,
            scaleY:             2,
            offset:             {
              x: 190,
              y: 166,
            },
            responsivePosition: {
              position: "center",
            },
          },
          portrait:       {
            x:                  -445,
            y:                  714,
            scaleX:             2,
            scaleY:             2,
            offset:             {
              x: 167,
              y: 166,
            },
            responsivePosition: {
              position: "center",
            },
          },
        },
        progress_text:          {
          name:           "progress_text",
          text_slots:     {
            portrait:  "v_stp",
            landscape: "h_stp",
          },
          dimensions:     {
            x:      -37.5,
            y:      -12.5,
            width:  75,
            height: 25,
          },
          landscape:      {
            x: 0,
            y: 0,
          },
          portrait:       {
            x: 0,
            y: 0,
          },
          debugShape:     false,
          scaleDownToFit: false,
          paramText:      {
            style: StyleText.ui.progress[this.orientationName],
            text:  "1",
          },
        },
        cash_out_btn_portrait:  {
          name:            "low_green_button",
          skins:           {
            portrait:  "1.1.ver_grn_btn",
            landscape: "2.1.hor_grn_btn",
          },
          buttons:         {
            button_main: {
              name:   "long _button",
              scales: {
                pressed:   1,
                unpressed: 1,
              },
            },
          },
          animations:      {
            show: {
              name: "show",
              loop: false,
            },
            loop: {
              name: "loop-push_btn",
              loop: false,
            },
            hide: {
              name: "hide",
              loop: false,
            },


          },
          spineAnimations: {
            hide: {
              name: "hide",
              loop: false,
            },
          },
          landscape:       {
            x:                  0,
            y:                  0,
            scaleX:             2,
            scaleY:             2,
            alpha:              0,
            responsivePosition: {
              position: "center",
            },
          },
          portrait:        {
            x:                  0,
            y:                  0,
            scaleX:             2,
            scaleY:             2,
            alpha:              1,
            responsivePosition: {
              position: "center",
            },
          },
        },
        cash_out_btn_landscape: {
          name:            "low_green_button",
          skins:           {
            portrait:  "1.1.ver_grn_btn",
            landscape: "2.1.hor_grn_btn",
            btn_left:  "3.1.hor_grn_btn-left",
          },
          buttons:         {
            button_main: {
              name:   "long _button",
              scales: {
                pressed:   1,
                unpressed: 1,
              },
            },
          },
          animations:      {
            show: {
              name: "show",
              loop: false,
            },
            loop: {
              name: "loop-push_btn",
              loop: false,
            },
            hide: {
              name: "hide",
              loop: false,
            },


          },
          spineAnimations: {
            hide:  {
              name: "hide",
              loop: false,
            },
            slide: {
              name: "loop-move_left",
              loop: false,
            },
          },
          landscape:       {
            x:                  0,
            y:                  0,
            scaleX:             2,
            scaleY:             2,
            alpha:              1,
            responsivePosition: {
              position: "center",
            },
          },
          portrait:        {
            x:                  0,
            y:                  0,
            scaleX:             2,
            scaleY:             2,
            alpha:              0,
            responsivePosition: {
              position: "center",
            },
          },
        },
        sceneObj:               [
          {
            name:           "appleContainer",
            enableSceneObj: false,
            type:           core.display.SceneObject,
            landscape:      {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
            },
            portrait:       {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
            },
            sceneObj:       [
              {
                name:            "right_panel",
                skin:            `${this.orientationSkin}0`,
                animations:      {
                  show:       {
                    name: "show",
                    loop: false,
                  },
                  loop:       {
                    name: "loop",
                    loop: true,
                  },
                  hide:       {
                    name: "hide",
                    loop: false,
                  },
                  show_step:  {
                    name:       "show-stp",
                    loop:       false,
                    onComplete: {
                      name: "loop",
                      loop: true,
                    },
                  },
                  clear_step: {
                    name: "show-stp",
                    loop: false,
                  },
                },
                spineAnimations: {
                  show: {
                    name:       "show",
                    loop:       false,
                    onComplete: {
                      name: "loop",
                      loop: true,
                    },
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                enableSceneObj:  false,
                type:            core.display.Spine,
                landscape:       {
                  x:                  0,
                  y:                  0,
                  scaleX:             2,
                  scaleY:             2,
                  responsivePosition: {
                    position: "center",
                  },
                },
                portrait:        {
                  x:                  0,
                  y:                  0,
                  scaleX:             2,
                  scaleY:             2,
                  responsivePosition: {
                    position: "center",
                  },
                },
              },
              {
                name:            "branches_right",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                spineAnimations: {
                  show: {
                    name:       "show",
                    loop:       false,
                    onComplete: {
                      name: "loop",
                      loop: true,
                    },
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                enableSceneObj:  false,
                type:            core.display.Spine,
                landscape:       {
                  x:                  0,
                  y:                  0,
                  scaleX:             2,
                  scaleY:             2,
                  alpha:              0,
                  responsivePosition: {
                    position: "center",
                  },
                },
                portrait:        {
                  x:                  0,
                  y:                  0,
                  scaleX:             2,
                  scaleY:             2,
                  alpha:              1,
                  responsivePosition: {
                    position: "center",
                  },
                },
              },
              {
                name:            "branches_right_h",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                spineAnimations: {
                  show: {
                    name:       "show",
                    loop:       false,
                    onComplete: {
                      name: "loop",
                      loop: true,
                    },
                  },
                  hide: {
                    name: "hide",
                    loop: false,
                  },
                },
                enableSceneObj:  false,
                type:            core.display.Spine,
                landscape:       {
                  x:                  0,
                  y:                  0,
                  scaleX:             2,
                  scaleY:             2,
                  alpha:              1,
                  responsivePosition: {
                    position: "center",
                  },
                },
                portrait:        {
                  x:                  0,
                  y:                  0,
                  scaleX:             2,
                  scaleY:             2,
                  alpha:              0,
                  responsivePosition: {
                    position: "center",
                  },
                },
              },
            ],
          },
        ],
      },
    };
  }

  /**
   * @getter
   * testGame parameters
   */
  get config() {
    return {
      key:   "appleGame",
      value: this._config.appleGame,
    };
  }

  get orientationName() {
    return core.getOrientation() ? "portrait" : "landscape";
  }

  get orientationSkin() {
    return core.getOrientation() ? "1.vertical/v_stp" : "2.horizontal/h_stp";
  }
}
