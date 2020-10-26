import BackgroundTop from './BackgroundTop';
import Controller    from './BackgroundTopController';
import Model         from './BackgroundTopModel';
import View          from './BackgroundTopView';

BackgroundTop.src = {
  Model,
  View,
  Controller
};

BackgroundTop.ID = 'BackgroundTop';

game.component.manager.registerComponent("BackgroundTop", BackgroundTop);
