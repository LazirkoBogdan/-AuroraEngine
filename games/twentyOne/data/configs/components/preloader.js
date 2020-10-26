export default class Preloader extends core.manager.Config {
  constructor(model, textures) {
    super(model, textures);
    this.createConfig();
  }

  /**
   * @public
   *  config for preloader
   */
  createConfig() {
    this._config.preloader = {
      id:     "Preloader",
      type:   "preloader",
      config: {
        visible:  true,
        needMask: false,
        testText: {
          on:   false,
          text: "Preloader",
        },
        sceneObj: [
          {
            name:      "preloader",
            type:      core.display.SceneObject,
            landscape: {
              x:      960,
              y:      560,
              scaleX: 2,
              scaleY: 2,
            },
            portrait:  {
              x:      960,
              y:      540,
              scaleX: 2,
              scaleY: 2,
            },
            sceneObj:  [
              {
                name:            "preloader",
                type:            core.display.Spine,
                spineAnimations: {
                  show: {
                    name: "show",
                    loop: false,
                  },
                  loop: {
                    name: "loop",
                    loop: true,
                  },
                },
                landscape:       {
                  x:           0,
                  y:           0,
                  scaleX:      1,
                  scaleY:      1,
                  spineCenter: false,
                },
                portrait:        {
                  x:           0,
                  y:           0,
                  scaleX:      1,
                  scaleY:      1,
                  spineCenter: false,
                },
              },
            ],
          },
        ],
      },
    };
  }

  get config() {
    return {
      key:   "preloader",
      value: this._config.preloader,
    };
  }
}
