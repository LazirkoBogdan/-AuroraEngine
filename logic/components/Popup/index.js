import Popup      from './PopupApi';
import Controller from './PopupController';
import Model      from './PopupModel';
import View       from './PopupView';

Popup.src = {
  Model,
  View,
  Controller
};

Popup.ID = 'Popup';

game.component.manager.registerComponent("Popup", Popup);
