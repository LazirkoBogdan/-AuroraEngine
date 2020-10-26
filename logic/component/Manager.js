class ComponentManager {
  createdComponents    = {};
  registeredComponents = {};

  registerComponent(id, component) {
    game.components[id]           = component;
    this.registeredComponents[id] = game.components[id];
  }

  createComponent(id, type) {
    // create empty component
    const name = id.toLowerCase();
    if (!this.registeredComponents[type]) {
      throw new Error(`There is no registered component with type: ${type}`);
    }
    if (this.createdComponents[id]) {
      console.error(`Component with id: ${id} already created!`);
      return;
    }

    const cls = game.components[type];

    const controller = cls.src.Controller || game.component.Controller;
    const model      = cls.src.Model || game.component.Model;
    const view       = cls.src.View || game.component.View;

    const componentInstance = new cls(controller, model, view);
    componentInstance.ID    = id;

    this.createdComponents[name] = componentInstance;

    return {
      name,
      component: componentInstance,
    };
  }

}

export default new ComponentManager();