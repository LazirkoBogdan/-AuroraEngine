import Loading    from './LoadingApi.';
import Controller from './LoadingController';
import Model      from './LoadingModel';
import View       from './LoadingView';

Loading.src = {
  Model,
  View,
  Controller
};

Loading.ID = 'Loading';

game.component.manager.registerComponent("Loading", Loading);
