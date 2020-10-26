import UI         from './AppleUIApi.';
import Controller from './AppleUIController';
import Model      from './AppleUIModel';
import View       from './AppleUIView';

UI.src = {
	Model,
	View,
	Controller
};

UI.ID = 'UI';

game.component.manager.registerComponent("UI", UI);
