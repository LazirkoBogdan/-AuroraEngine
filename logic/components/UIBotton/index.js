import UIBotton   from "./UIBottonApi.";
import Controller from "./UIBottonController";
import Model      from "./UIBottonModel";
import View       from "./UIBottonView";

UIBotton.src = {
  Model,
  View,
  Controller,
};

UIBotton.ID = "UIBotton";

game.component.manager.registerComponent("UIBotton", UIBotton);