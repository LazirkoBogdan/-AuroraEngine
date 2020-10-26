import UI         from './UIApi.';
import Controller from './UIController';
import Model      from './UIModel';
import View       from './UIView';

UI.src = {
  Model,
  View,
  Controller
};

UI.ID = 'UI';

game.component.manager.registerComponent("UI", UI);
