import TwentyOne  from "./TwentyOne.js";
import Controller from "./TwentyOneController.js";
import Model      from "./TwentyOneModel.js";
import View       from "./TwentyOneView.js";

TwentyOne.src = {
  Model,
  View,
  Controller,
};

TwentyOne.ID = "TwentyOne";

game.component.manager.registerComponent("TwentyOne", TwentyOne);