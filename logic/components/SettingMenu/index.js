import Settings   from "./SettingsAPI";
import Controller from "./SettingsController";
import Model      from "./SettingsModel";
import View       from "./SettingsView";

Settings.src = {
  Model,
  View,
  Controller,
};

Settings.ID = "Settings";

game.component.manager.registerComponent("Settings", Settings);
