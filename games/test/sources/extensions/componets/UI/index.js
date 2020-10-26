import UI         from './TestUI';
import Controller from './TestUIController';
import Model      from './TestUIModel';
import View       from './TestUIView';

UI.src = {
	Model,
	View,
	Controller
};

UI.ID = 'UI';

game.component.manager.registerComponent("UI", UI);
