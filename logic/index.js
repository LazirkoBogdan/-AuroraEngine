/**
 * Create nameSpace Logic
 */

export default class Logic {
  static component = {};

  static components = {};

  static games = {};

  static fms = {};

  static feature = {};

  static model = {};
}

window.logic = Logic;

import CardField from "../games/twentyOne/sources/extensions/componets/cardfield/CardField.js";
import Card      from "../games/twentyOne/sources/extensions/componets/cardfield/Card.js";

logic.components.cardField = CardField;
logic.components.card      = Card;

// new imports

import "./game";
import "./component";
import "./components";
import "./fsm";

//

import Model     from "./model/Model";
import TranslationModel from './model/TranslationModel';
import GameModel from "./model/GameModel";
import GameItem  from "./model/GameItem";
import UserBalanceItem  from "./model/UserBalanceItem";


logic.model     = Model;
logic.submodels = {
  GameModel,
	TranslationModel,
  GameItem,
	UserBalanceItem
};

import StateMachineSubController from "./fsm/SubControllers/stateMachine/StateMachineSubController";
import NetworkSubController      from "./fsm/SubControllers/network/NetworkSubController";
import UISubController           from "./fsm/SubControllers/UISubController";
import MainController            from "./fsm/MainController";

logic.fms.StateMachineSubController = StateMachineSubController;
logic.fms.NetworkSubController      = NetworkSubController;
logic.fms.uiSubController           = UISubController;
logic.fms.MainController            = MainController;

import Chips from "./features/Chips";

logic.feature.Chip = Chips;

import DevTools from "./DevTools.js";

logic.DevTools = DevTools;
