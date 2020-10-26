import Preloader  from "./PreloaderApi";
import Controller from "./PreloaderController";
import Model      from "./PreloaderModel";
import View       from "./PreloaderView";

Preloader.src = {
  Model,
  View,
  Controller,
};

Preloader.ID = "Preloader";

game.component.manager.registerComponent("Preloader", Preloader);
