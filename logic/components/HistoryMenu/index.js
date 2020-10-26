import History    from "./HistoryAPI";
import Controller from "./HistoryController";
import Model      from "./HistoryModel";
import View       from "./HistoryView";

History.src = {
  Model,
  View,
  Controller,
};

History.ID = "History";

game.component.manager.registerComponent("History", History);
