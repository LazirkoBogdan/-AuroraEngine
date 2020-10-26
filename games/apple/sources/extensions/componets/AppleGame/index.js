import AppleGame  from "./AppleGame.js";
import Controller from "./AppleGameController.js";
import Model      from "./AppleGameModel.js";
import View       from "./AppleGameView.js";

AppleGame.src = {
  Model,
  View,
  Controller,
};

AppleGame.ID = "AppleGame";

game.component.manager.registerComponent("AppleGame", AppleGame);