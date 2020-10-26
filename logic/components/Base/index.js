import Base          from './BaseApi';
import Controller    from './BaseController';
import Model         from './BaseModel';
import View          from './BaseView';

Base.src = {
  Model,
  View,
  Controller
};

Base.ID = 'Base';

game.component.manager.registerComponent("Base", Base);
