export default class Ui extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   * create config for Ui
   */
  createConfig() {

    const betButton = {
      initialGame: {
        status: "active",
        enable: true,
      },

      baseGame: {
        status: "active",
        enable: true,
      },

      popup: {
        enable: false,
        status: "disable",
      },

      appleGame: {
        enable: false,
        status: "disable",
      },

      stateCurrency: {
        enable: false,
        status: "disable",
      },

      betGame:   {
        status: "active",
        enable: true,

      },
      startGame: {
        enable: false,
        status: "disable",

      },
      gameOver:  {
        enable: false,
        status: "disable",

      },
    };
    this._config.ui = {
      id:     "UI",
      type:   "ui",
      config: {
        name:                "ui",
        visible:             false,
        needMask:            false,
        parentGroup:         "UI",
        animationParameters: {
          buttonAnimationSpeed: 0.3,
        },
        testText:            {
          on:   false,
          text: "UI",
        },
        sceneObj:            [
          {
            name:           "logoContainer",
            enableSceneObj: false,
            type:           core.display.SceneObject,
            landscape:      {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              alpha:  1,
            },
            portrait:       {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              alpha:  1,
            },
            sceneObj:       [
              {
                name:            "horisontalLogo",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:                  700,
                  y:                  1050,
                  scaleX:             2.5,
                  scaleY:             2.5,
                  spineCenter:        false,
                  responsivePosition: {
                    position: "top",
                  },
                },
                portrait:        {
                  x:                  960,
                  y:                  800,
                  scaleX:             2,
                  scaleY:             2,
                  spineCenter:        false,
                  responsivePosition: {
                    position: "top",
                  },
                },
              },

            ],
          },
          {
            name:           "currencyPanelContainer",
            enableSceneObj: false,
            type:           core.display.SceneObject,
            landscape:      {
              x:      960,
              y:      0,
              scaleX: 2,
              scaleY: 2,
              alpha:  1,

            },
            portrait:       {
              x:      960,
              y:      0,
              scaleX: 2,
              scaleY: 2,
              alpha:  1,

            },
            sceneObj:       [
              {
                name:            "currencyPanel",
                type:            core.display.Spine,
                skin:            "1.btn_ver",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:                  0,
                  y:                  320,
                  scaleX:             1,
                  scaleY:             1,
                  skin:               "2.btn_hor",
                  responsivePosition: {
                    position: "bottom",
                  },

                  spineCenter: false,
                },
                portrait:        {
                  x:                  0,
                  y:                  320,
                  scaleX:             1,
                  scaleY:             1,
                  skin:               "1.btn_ver",
                  spineCenter:        false,
                  responsivePosition: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
          {
            name:              "snowWhiteContainer",
            enableSceneObj:    false,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "snowWhite",
              addPart:            false,
              removeTexture:      true,
            },
            type:              core.display.SceneObject,
            landscape:         {
              x:      350,
              y:      5,
              scaleX: 0.6,
              scaleY: 0.6,
              alpha:  1,

            },
            portrait:          {
              x:      0,
              y:      -40,
              scaleX: 0.5,
              scaleY: 0.5,
              alpha:  1,
            },
            sceneObj:          [
              {
                name:            "snowWhite",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:                    0,
                  y:                    0,
                  scaleX:               0.9,
                  scaleY:               0.9,
                  spineCenter:          false,
                  afterUpdateAnimation: {
                    name: "loop",
                    loop: true,
                  },
                },
                portrait:        {
                  x:                    0,
                  y:                    0,
                  scaleX:               1,
                  scaleY:               1,
                  spineCenter:          false,
                  afterUpdateAnimation: {
                    name: "loop",
                    loop: true,
                  },
                },
              },

            ],
          },
          {
            name:              "coinsHorizontal",
            type:              core.display.Spine,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "coinHor",
              addPart:            false,
              removeTexture:      true,
            },
            animations:        {
              show: {
                name: "show",
                loop: true,
              },
            },
            landscape:         {
              x:                    10,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                1,
              spineCenter:          false,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },
            },
            portrait:          {
              x:                    0,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                0.01,
              spineCenter:          false,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },
            },
            spineAnimations:   {
              idle: {
                name: "loop",
                loop: true,
              },
            },
          },
          {
            name:       "coins",
            type:       core.display.Spine,
            animations: {
              show: {
                name: "show",
                loop: true,
              },
            },

            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "coin",
              addPart:            false,
              removeTexture:      true,
            },
            landscape:         {
              x:                    0,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                0.01,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },

            },
            portrait:          {
              x:                    10,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                1,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },

              spineCenter: false,
            },
            spineAnimations:   {
              idle: {
                name: "loop",
                loop: true,
              },
            },
          },
          {
            name:              "branchesAll",
            type:              core.display.Spine,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "branches",
              addPart:            false,
              removeTexture:      true,
            },
            animations:        {
              show: {
                name: "show",
                loop: false,
              },
            },
            spineAnimations:   {
              idle: {
                name: "loop",
                loop: true,
              },
            },
            landscape:         {
              x:                    0,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                0.01,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },

            },
            portrait:          {
              x:                    0,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                1,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },
            },
          },
          {
            name:              "branchesAllHorizontal",
            type:              core.display.Spine,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "branchesHor",
              addPart:            false,
              removeTexture:      true,
            },
            animations:        {
              show: {
                name: "show",
                loop: false,
              },
            },
            spineAnimations:   {
              idle: {
                name: "loop",
                loop: true,
              },
            },

            landscape: {
              x:                    0,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                1,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },
            },
            portrait:  {
              x:                    0,
              y:                    0,
              scaleX:               1,
              scaleY:               1,
              alpha:                0.01,
              spineCenter:          false,
              afterUpdateAnimation: {
                name: "loop",
                loop: true,
              },
            },
          },
          {
            name:              "place_0",
            enableSceneObj:    true,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_2-1",
              addPart:            false,
              sceneObj:           "text",
            },
            handler:           "onChipBet",
            states:            betButton,
            getter:            "userChip",
            chipId:            0,
            type:              logic.feature.Chip,
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1.1,
              scaleY: 1.1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_2-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -100,
                  y:      -45,
                  width:  200,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betButton,
                  text:      "1",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
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
              },
            ],

          },
          {
            name:              "place_1",
            handler:           "onChipBet",
            enableSceneObj:    true,
            getter:            "userChip",
            states:            betButton,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_2-2",
              addPart:            false,
              sceneObj:           "text",
            },
            chipId:            1,
            type:              logic.feature.Chip,
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.1,
              },

            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1.1,
              scaleY: 1.1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_2-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -100,
                  y:      -45,
                  width:  200,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betButton,
                  text:      "1",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
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
              },
            ],
          },
          {
            name:              "place_2",
            handler:           "onChipBet",
            enableSceneObj:    true,
            getter:            "userChip",
            states:            betButton,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_2-3",
              addPart:            false,
              sceneObj:           "text",
            },
            chipId:            2,
            type:              logic.feature.Chip,
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1.1,
              scaleY: 1.1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_2-3",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -100,
                  y:      -45,
                  width:  200,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betButton,
                  text:      "1",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
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
              },
            ],
          },
          {
            name:              "place_3",
            handler:           "onChipBet",
            enableSceneObj:    true,
            states:            betButton,
            getter:            "userChip",
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_2-4",
              addPart:            false,
              sceneObj:           "text",
            },
            chipId:            3,
            type:              logic.feature.Chip,
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1.1,
              scaleY: 1.1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_2-3",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -100,
                  y:      -45,
                  width:  200,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betButton,
                  text:      "1",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
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
              },
            ],
          },
          {
            name:              "place_4",
            handler:           "onChipBet",
            enableSceneObj:    true,
            states:            betButton,
            getter:            "userChip",
            chipId:            4,
            type:              logic.feature.Chip,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_2-5",
              addPart:            false,
              sceneObj:           "text",
            },
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1.1,
              scaleY: 1.1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_2-5",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -100,
                  y:      -45,
                  width:  200,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betButton,
                  text:      "1",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
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
              },
            ],
          },
          {
            name:              "place_5",
            handler:           "onChipBet",
            states:            betButton,
            enableSceneObj:    true,
            getter:            "userChip",
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_2-6",
              addPart:            false,
              sceneObj:           "text",
            },
            chipId:            5,
            type:              logic.feature.Chip,
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1.1,
              scaleY: 1.1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_2-6",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -100,
                  y:      -45,
                  width:  200,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betButton,
                  text:      "1",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
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
              },
            ],
          },
          {
            name:              "rightMainButton",
            handler:           "onRigthMainButton",
            enableSceneObj:    true,
            states:            {
              initialGame: {
                enable:    false,
                status:    "disable",
                text:      core.getTranslation("deal", "buttonText"),
                textStyle: StyleText.ui.button.makeButton,
              },

              baseGame: {
                enable:    false,
                status:    "disable",
                text:      core.getTranslation("deal", "buttonText"),
                textStyle: StyleText.ui.button.makeButton,
              },

              betGame:   {
                enable:    true,
                status:    "active",
                text:      core.getTranslation("deal", "buttonText"),
                textStyle: StyleText.ui.button.makeButton,
              },
              appleGame: {
                enable: false,
                status: "disable",
              },
              startGame: {
                enable:    false,
                status:    "disable",
                text:      core.getTranslation("deal", "buttonText"),
                textStyle: StyleText.ui.button.makeButton,
              },
              popup:     {
                enable:    false,
                status:    "disable",
                text:      core.getTranslation("deal", "buttonText"),
                textStyle: StyleText.ui.button.makeButton,
              },
              gameOver:  {
                enable:    false,
                status:    "disable",
                text:      core.getTranslation("hit", "buttonText"),
                textStyle: StyleText.ui.button.makeButton,
              },
            },
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_4-1",
              addPart:            false,
              sceneObj:           "text",
            },
            type:              core.display.Button,
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_4-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -225,
                  y:      -60,
                  width:  450,
                  height: 120,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.makeButton,
                  text:      core.getTranslation("deal", "buttonText"),
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
                text:           core.getTranslation("deal", "buttonText"),
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
              },
            ],
          },
          {
            name:              "userBalance",
            type:              core.display.Currency,
            states:            {
              initialGame:   {
                enable:       true,
                status:       "active",
                getterUpdate: false,
              },
              betGame:       {
                enable:       false,
                status:       "disable",
                getterUpdate: false,
              },
              appleGame:     {
                enable: false,
                status: "disable",
              },
              baseGame:      {
                enable:       true,
                status:       "active",
                getterUpdate: false,
              },
              recovery:      {
                enable:       false,
                status:       "disable",
                getterUpdate: false,
              },
              gameOver:      {
                enable:       false,
                status:       "disable",
                getterUpdate: false,
              },
              startGame:     {
                enable:       false,
                status:       "disable",
                getterUpdate: false,
              },
              popup:         {
                enable:       false,
                status:       "disable",
                getterUpdate: false,
              },
              stateCurrency: {
                enable: true,
                status: "active",
              },
            },
            elements:          {
              text:      {
                landscape:      {
                  x:      0,
                  y:      10,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                dimensions:     {
                  x:      -80,
                  y:      -20,
                  width:  160,
                  height: 40,
                },
                debugShape:     false,
                scaleDownToFit: true,
                hAlign:         0,
                vAlign:         -1,
                paramText:      {
                  style:     StyleText.ui.currency.unSelected,
                  text:      "100",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
              },
              textCode:  {
                landscape:      {
                  x:      0,
                  y:      -15,
                  scaleX: 1,
                  scaleY: 1,

                },
                portrait:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                dimensions:     {
                  x:      -100,
                  y:      -25,
                  width:  200,
                  height: 50,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.currency.unSelectedCode,
                  text:      "100",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
              },
              spine:     {
                name:            "flag_Element",
                animations:      {
                  show: {
                    name: "show",
                    loop: true,
                  },
                  loop: {
                    name: "loop (opened)",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 2.7,
                  scaleY: 2.4,

                },
                portrait:        {
                  x:           275,
                  y:           0,
                  scaleX:      2.7,
                  scaleY:      2.4,
                  spineCenter: false,
                },
                spineAnimations: {
                  idle: {
                    name: "loop-> (open)",
                    loop: false,
                  },
                },
              },
              mask:      {
                landscape: {
                  x:         -120,
                  y:         -20,
                  scaleX:    1,
                  scaleY:    1,
                  rectAlpha: 1,
                  color:     0x000000,
                  rect:      {
                    x:      0,
                    y:      -60,
                    width:  800,
                    height: 120,
                  },
                },
                portrait:  {
                  x:         0,
                  y:         0,
                  scaleX:    1,
                  scaleY:    1,
                  rectAlpha: 1,
                  color:     0x000000,
                  rect:      {
                    x:      -250,
                    y:      -80,
                    width:  500,
                    height: 180,
                  },
                },
              },
              container: {
                start:  {
                  x: 280,
                  y: 0,
                },
                offset: {
                  x: 280,
                  y: -12,
                },

              },
            },
            selectedElement:   {
              style:     StyleText.ui.currency.selected,
              styleCode: StyleText.ui.currency.selectedCode,
            },
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "balance",
              addPart:            false,
              sceneObj:           "text",
              removeTexture:      true,
            },
            unselectedElement: {
              style:     StyleText.ui.currency.unSelected,
              styleCode: StyleText.ui.currency.unSelectedCode,
            },
            tweenText:         {
              customUpdate: true,
              duration:     1,
              delay:        0,
            },
            getter:            "playerBalance",
            landscape:         {
              x:      75,
              y:      225,
              scaleX: 0.5,
              scaleY: 0.5,
            },
            portrait:          {
              x:      -130,
              y:      440,
              scaleX: 0.5,
              scaleY: 0.5,
            },
            sceneObj:          [
              {
                name:            "flag_currency",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: true,
                  },
                  loop: {
                    name: "loop (opened)",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      275,
                  y:      0,
                  scaleX: 2,
                  scaleY: 2,

                },
                portrait:        {
                  x:           275,
                  y:           0,
                  scaleX:      2,
                  scaleY:      2,
                  spineCenter: false,
                },
                buttons:         {
                  leftButton:  {
                    name:         "leftButton",
                    hitAreaScale: {
                      x: 5,
                      y: 5,
                    },
                  },
                  rightButton: {
                    name:         "rightButton",
                    hitAreaScale: {
                      x: 5,
                      y: 5,
                    },
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop->(open)",
                    loop: false,
                  },
                },

              },
              {
                name:           "text",
                type:           core.display.DisplayText,
                landscape:      {
                  x:          0,
                  y:          -10,
                  scaleX:     1,
                  scaleY:     1,
                  dimensions: {
                    x:      -150,
                    y:      -35,
                    width:  300,
                    height: 70,
                  },
                },
                portrait:       {
                  x:          0,
                  y:          -10,
                  scaleX:     1,
                  scaleY:     1,
                  dimensions: {
                    x:      -150,
                    y:      -30,
                    width:  300,
                    height: 60,
                  },
                },
                dimensions:     {
                  x:      -175,
                  y:      -25,
                  width:  350,
                  height: 50,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.currency.balance,
                  text:      "0",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
              },
              {
                name:      "selector",
                type:      core.display.Graphics,
                newRect:   {
                  x:      40,
                  y:      -50,
                  width:  800,
                  height: 100,
                },
                oldRect:   {
                  x:      0,
                  y:      -50,
                  width:  300,
                  height: 100,
                },
                landscape: {
                  x:         -165,
                  y:         -10,
                  rectAlpha: 0.01,
                  color:     0x000000,
                  rect:      {
                    x:      0,
                    y:      -50,
                    width:  340,
                    height: 100,
                  },
                },
              },
            ],
          },
          {
            name:              "buttonMin",
            handler:           "onMinButton",
            states:            betButton,
            type:              core.display.Button,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_1-1",
              addPart:            false,
              sceneObj:           "text",
            },
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_1-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -40,
                  y:      -50,
                  width:  80,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.fastButton,
                  text:      core.getTranslation("min", "buttonText"),
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
                landscape:      {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
            ],
          },
          {
            name:              "buttonMultiplier",
            handler:           "onButtonMultiplier",
            states:            betButton,
            type:              core.display.Button,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_1-2",
              addPart:            false,
              sceneObj:           "text",
            },
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.1,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.1,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_1-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -50,
                  y:      -50,
                  width:  100,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.fastButton,
                  text:      "X2",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
                landscape:      {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
            ],
          },
          {
            name:              "buttonMax",
            states:            betButton,
            handler:           "onMaxButton",
            type:              core.display.Button,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_1-4",
              addPart:            false,
              sceneObj:           "text",
            },
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.1,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.1,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_1-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -40,
                  y:      -50,
                  width:  80,
                  height: 100,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.fastButton,
                  text:      core.getTranslation("max", "buttonText"),
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
                landscape:      {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
            ],
          },
          {
            name:              "buttonDivider",
            handler:           "onButtonDivider",
            states:            betButton,
            type:              core.display.Button,
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_1-3",
              addPart:            false,
              sceneObj:           "text",
            },
            landscape:         {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_1-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              }, {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -45,
                  y:      -45,
                  width:  90,
                  height: 90,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.fastButton,
                  text:      "X/2",
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },
                landscape:      {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:       {
                  x:      2,
                  y:      -1,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
            ],
          },
          {
            name:              "input_sum_place",
            type:              core.display.ButtonInputText,
            states:            {
              initialGame:   {
                enable:          true,
                getterUpdate:    true,
                inputTextEnable: false,
                text:            core.getTranslation("enterBet"),
              },
              recovery:      {
                getterUpdate:    false,
                enable:          false,
                inputTextEnable: true,
              },
              baseGame:      {
                enable:          true,
                getterUpdate:    false,
                inputTextEnable: false,
                text:            core.getTranslation("enterBet"),
              },
              appleGame:     {
                enable:          false,
                getterUpdate:    false,
                inputTextEnable: true,
              },
              stateCurrency: {
                enable:          false,
                getterUpdate:    false,
                inputTextEnable: true,
              },
              betGame:       {
                getterUpdate:    false,
                inputTextEnable: false,
              },
              gameOver:      {
                enable:          false,
                getterUpdate:    false,
                inputTextEnable: true,
              },
              startGame:     {
                enable:          false,
                getterUpdate:    false,
                inputTextEnable: true,
              },
              popup:         {
                enable:          false,
                getterUpdate:    true,
                inputTextEnable: true,
              },
            },
            tweenText:         {
              customUpdate: true,
              duration:     1,
              delay:        0,
            },
            getter:            "userBet",
            handler:           "onInputBet",
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "input",
              addPart:            false,
              sceneObj:           "text",
              removeTexture:      true,
            },
            landscape:         {
              x:      -320,
              y:      225,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },

            },
            portrait:          {
              x:      0,
              y:      343,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            sceneObj:          [
              {
                name:           "text",
                type:           core.display.DisplayText,
                dimensions:     {
                  x:      -200,
                  y:      -25,
                  width:  400,
                  height: 50,
                },
                debugShape:     false,
                scaleDownToFit: true,
                paramText:      {
                  style:     StyleText.ui.button.betField,
                  text:      core.getTranslation("enterBet"),
                  landscape: {
                    x: 0,
                    y: 0,
                  },
                  portrait:  {
                    x: 0,
                    y: 0,
                  },
                },

                landscape: {
                  x:      25,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:  {
                  x:      -25,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
              {
                name:          "inputText",
                textType:      "number",
                type:          core.display.TextInput,
                style:         {
                  input: {
                    fontFamily: "Roboto-Bold",
                    fontSize:   "20px",
                    padding:    "20px",
                    width:      "240",
                    fontWeight: "400",
                    textAlign:  "center",
                    color:      "#ffc178",
                  },
                },
                shiftSceneObj: {
                  components: [
                    {
                      name:     "ui",
                      sceneObj: [
                        {
                          name:  "currencyPanelContainer",
                          shift: {
                            landscape: {
                              x: 0,
                              y: -600,

                            },
                            portrait:  {
                              x: 0,
                              y: -500,
                            },
                          },
                        },
                      ],

                    },
                  ],
                },

                landscape: {
                  x:      25,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                  center: true,
                },
                portrait:  {
                  x:      -40,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                  center: true,
                },
              },

            ],
          },
          {
            name:      "buttonHome",
            type:      core.display.Button,
            handler:   "onHomeButton",
            states:    {
              initialGame:   {
                status: "active",
                enable: true,
              },
              baseGame:      {
                status: "active",
                enable: true,
              },
              stateCurrency: {
                status: "active",
                enable: true,
              },
              betGame:       {
                status: "active",
                enable: true,
              },
              startGame:     {
                status: "active",
                enable: true,
              },
              appleGame:     {
                status: "active",
                enable: true,
              },
              popup:         {
                status: "disable",
                enable: false,
              },
              recovery:      {
                status: "active",
                enable: true,
              },
              gameOver:      {
                status: "active",
                enable: true,
              },
            },
            landscape: {
              x:                  -905,
              y:                  -473,
              scaleX:             1,
              scaleY:             1,
              pivot:              "center",
              scales:             {
                unpressed: 1,
                pressed:   1.2,
              },
              responsivePosition: {
                position: "center",
              },
            },
            portrait:  {
              x:                  -480,
              y:                  -912,
              scaleX:             1,
              scaleY:             1,
              pivot:              "center",
              scales:             {
                unpressed: 1,
                pressed:   1.2,
              },
              responsivePosition: {
                position: "center",
              },
            },
            sceneObj:  [
              {
                name:            "homeTerms",
                skin:            "1.ver",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 2,
                  scaleY: 2,
                  pivot:  "center",
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 2,
                  scaleY: 2,
                  pivot:  "center",
                },
              },
            ],
          },
          {
            name:      "buttonRule",
            type:      core.display.Button,
            handler:   "onRulesButton",
            states:    {
              initialGame: {
                status: "active",
                enable: true,
              },
              baseGame:    {
                status: "active",
                enable: true,
              },

              betGame:       {
                status: "active",
                enable: true,
              },
              appleGame:     {
                status: "disable",
                enable: false,
              },
              stateCurrency: {
                enable: true,
                status: "active",
              },
              startGame:     {
                status: "disable",
                enable: false,
              },
              popup:         {
                status: "disable",
                enable: false,
              },
              gameOver:      {
                status: "active",
                enable: true,
              },
            },
            landscape: {
              x:                  905,
              y:                  -473,
              scaleX:             1,
              scaleY:             1,
              pivot:              "center",
              scales:             {
                unpressed: 1,
                pressed:   1.1,
              },
              responsivePosition: {
                position: "center",
              },
            },
            portrait:  {
              x:                  480,
              y:                  -912,
              scaleX:             1,
              scaleY:             1,
              pivot:              "center",
              scales:             {
                unpressed: 1,
                pressed:   1.1,
              },
              responsivePosition: {
                position: "center",
              },
            },
            sceneObj:  [
              {
                name:            "homeTerms",
                skin:            "2.hor",
                type:            core.display.Spine,
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 2,
                  scaleY: 2,
                  pivot:  "center",
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 2,
                  scaleY: 2,
                  pivot:  "center",
                },
              },


            ],
          },
          {
            name:              "leftMainButton",
            type:              core.display.Button,
            handler:           "onLeftMainButton",
            includeParameters: {
              mainSpineContainer: "currencyPanelContainer",
              mainSpine:          "currencyPanel",
              addContainer:       true,
              slotName:           "btn_3-1",
              addPart:            false,
              sceneObj:           "text",
            },
            states:            {
              initialGame:   {
                status: "active",
                enable: true,
              },
              baseGame:      {
                status: "active",
                enable: true,
              },
              betGame:       {
                status: "active",
                enable: true,
              },
              stateCurrency: {
                enable: false,
                status: "disable",
              },
              appleGame:     {
                status: "disable",
                enable: false,
              },
              startGame:     {
                status: "disable",
                enable: false,
              },
              popup:         {
                status: "disable",
                enable: false,
              },
              gameOver:      {
                status: "active",
                enable: true,
              },
            },
            landscape:         {
              x:       0,
              y:       0,
              scaleX:  1,
              scaleY:  1,
              texture: "BTN_Disabled_Brown",
              scales:  {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            portrait:          {
              x:      0,
              y:      0,
              scaleX: 1,
              scaleY: 1,
              scales: {
                unpressed: 1,
                pressed:   1.2,
              },
            },
            sceneObj:          [
              {
                name:            "buttons",
                type:            core.display.Spine,
                skin:            "btn_3-1",
                animations:      {
                  show: {
                    name: "show",
                    loop: false,
                  },
                },
                spineAnimations: {
                  idle: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
                portrait:        {
                  x:      0,
                  y:      0,
                  scaleX: 1,
                  scaleY: 1,
                },
              },
            ],
          },
        ],
      },
    };
  }

  /**
   /**
   * @getter
   * Ui paramaters
   */
  get config() {
    return {
      key:   "ui",
      value: this._config.ui,
    };
  }
}
