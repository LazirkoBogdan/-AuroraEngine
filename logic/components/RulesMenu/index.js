import Rules      from "./RulesAPI";
import Controller from "./RulesController";
import Model      from "./RulesModel";
import View       from "./RulesView";

Rules.src = {
  Model,
  View,
  Controller,
};

Rules.ID = "RulesAPI";

game.component.manager.registerComponent("Rules", Rules);
