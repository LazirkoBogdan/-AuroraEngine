import "../../../../core/utils";
//import "./model";
import "./componets";

import StateMachineSubController from "./SubController/StateMachineSubController";
import TestMainController       from "./TestMainController";
import NetworkSubController      from "./NetworkSubController";

logic.fms.StateMachineSubController = StateMachineSubController;
logic.fms.MainController            = TestMainController;
logic.fms.NetworkSubController      = NetworkSubController;