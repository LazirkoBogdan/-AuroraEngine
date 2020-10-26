export default class StateMachineSubController extends logic.fms.StateMachineSubController {
  /**
   * Main controller
   * @type {*}
   */
  mainController;

  constructor(mainController) {
    super(mainController);
  }

  /**
   * @public
   * Create states for main controller
   */
  createStateMachine() {
    const mainController = this.mainController;
    game.states          = {};
    game.states.machine  = this.stateMachine.createMachine({
      initialState:  "initial",
      initial:       {
        actions:     {
          onEnter() {
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "introGame",
            action() {
            },
          },
        },
      },
      initialGame:   {
        actions:     {
          onEnter() {
            const state = { state: "initialGame" };
            mainController.updateStateUI(state);
	          mainController.components.ui.show()
	          mainController.components.testgame.show()
	          core.buttonsAvailable = true;
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "betGame",
            action() {
            },
          },
        },
      },
      baseGame:      {
        actions:     {
          onEnter() {
            const state = { state: "baseGame" };
            mainController.updateStateUI(state);
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "betGame",
            action() {
            },
          },
        },
      },
      introGame:     {
        actions:     {
          onEnter() {
            const state = { state: "introGame" };

          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "betGame",
            action() {
            },
          },
        },
      },
      betGame:       {
        actions:     {
          onEnter() {
            const state = { state: "betGame" };
            mainController.updateStateUI(state);
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "startGame",
            action() {
            },
          },
        },
      },
      appleGame:     {
        actions:     {
          onEnter() {
            const state = { state: "appleGame" };
            mainController.updateStateUI(state);
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "startGame",
            action() {
            },
          },
        },
      },
      appleRecover:  {
        actions:     {
          onEnter() {
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "startGame",
            action() {
            },
          },
        },
      },
      startGame:     {
        actions:     {
          onEnter() {
            const state = { state: "startGame" };
            mainController.updateStateUI(state);
            mainController.hideUI(() => {
              mainController.showApple();
            });

          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "gameOver",
            action() {
            },
          },
        },
      },
      recovery:      {
        actions:     {
          onEnter() {
            const state = { state: "recovery" };
            mainController.updateStateUI(state);
            mainController.components.ui.show();
            mainController.showApple(() => {

            });

          },
          onExit() {

          },
        },
        transitions: {
          switch: {
            target: "selectGame",
            action() {
            },
          },
        },
      },
      gameOver:      {
        actions:     {
          onEnter() {
            const state = { state: "gameOver" };
            mainController.updateUI();
            mainController.updateStateUI(state);
            mainController.showEndGamePopup(() => {
              mainController.hideApple();
            });
          },
          onExit() {

          },
        },
        transitions: {
          switch: {
            target: "initialGame",
            action() {
            },
          },
        },
      },
      popup:         {
        actions:     {
          onEnter() {
            const state = { state: "popup" };
            core.bluerKeyboard();
            mainController.updateStateUI(state);
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "initialGame",
            action() {
            },
          },
        },
      },
      stateCurrency: {
        actions:     {
          onEnter() {
            const state = { state: "stateCurrency" };
            core.bluerKeyboard();
            mainController.updateStateUI(state);
          },
          onExit() {
          },
        },
        transitions: {
          switch: {
            target: "initialGame",
            action() {
            },
          },
        },
      },
    });
    game.states.state    = game.states.machine.value;

    this.mainController.state  = game.states.state;
    this.mainController.states = game.states;
  }
}