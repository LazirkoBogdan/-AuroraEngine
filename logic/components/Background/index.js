import Background from "./BackgroundApi.";
import Controller from "./BackgroundController";
import Model      from "./BackgroundModel";
import View       from "./BackgroundView";

Background.src = {
  Model,
  View,
  Controller,
};

Background.ID = "Background";

game.component.manager.registerComponent("Background", Background);
