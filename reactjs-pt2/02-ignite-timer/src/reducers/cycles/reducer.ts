import { produce } from 'immer';

// eslint-disable-next-line import/no-cycle
import { ActionTypes } from './action';

export interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date,
}

interface CyclesState {
  cycles: Cycle[],
  activeCycleId: string | null,
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // % Sem immer
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // };
      // % Com immer
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        // eslint-disable-next-line no-param-reassign
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      // % Sem immer
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() };
      //     }
      //     return cycle;
      //   }),
      //   activeCycleId: null,
      // };
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        );

        if (currentCycleIndex < 0) {
          return state;
        }

        // eslint-disable-next-line no-param-reassign
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        // eslint-disable-next-line no-param-reassign
        draft.activeCycleId = null;
      });

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          }
          return cycle;
        }),
        activeCycleId: null,
      };

    default:
      return state;
  }
}
