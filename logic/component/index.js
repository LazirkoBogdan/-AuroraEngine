import ComponentsManager from "./Manager";

import Component           from "./api/Component";
import ComponentController from "./controller/Controller";
import ComponentView       from "./view/View";
import ComponentModel      from "./model/Model";

game.component.manager = ComponentsManager;

game.component.Api        = Component;
game.component.Controller = ComponentController;
game.component.View       = ComponentView;
game.component.Model      = ComponentModel;
