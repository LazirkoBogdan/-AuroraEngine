import TestGame  from "./TestGame.js";
import Controller from "./TestGameController.js";
import Model      from "./TestGameModel.js";
import View       from "./TestGameView.js";

TestGame.src = {
  Model,
  View,
  Controller,
};

TestGame.ID = "TestGame";

game.component.manager.registerComponent("TestGame", TestGame);