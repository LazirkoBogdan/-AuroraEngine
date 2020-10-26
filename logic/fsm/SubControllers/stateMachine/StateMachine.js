export default class StateMachine {
  constructor() {}

  createMachine(stateMachineDefinition) {
    const machine = {
      value: stateMachineDefinition.initialState,

      transition(currentState, event, target) {
        const currentStateDefinition = stateMachineDefinition[currentState];
        const destinationTransition = currentStateDefinition.transitions[event];
        if (!destinationTransition && !target) {
          return;
        }
        const destinationState = target ? target : destinationTransition.target;
        const destinationStateDefinition =
          stateMachineDefinition[destinationState];
        currentStateDefinition.actions.onExit();
        destinationStateDefinition.actions.onEnter();
        machine.value = destinationState;
        return machine.value;
      }
    };
    return machine;
  }
}
