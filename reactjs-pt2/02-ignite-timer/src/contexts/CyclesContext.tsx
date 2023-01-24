import {
  createContext, ReactNode, useCallback, useMemo, useReducer, useState,
} from 'react';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date,
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined;
  activeCycleId: string | null,
  amountSecondsPassed: number,
  markCurrentCycleAsFinished: () => void,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void,
}

export const cyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode,
}

interface CyclesState {
  cycles: Cycle[],
  activeCycleId: string | null,
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // % Usando state
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  // % Usando reducer
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };

      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            }
            return cycle;
          }),
          activeCycleId: null,
        };

      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            }
            return cycle;
          }),
          activeCycleId: null,
        };

      default:
        return state;
    }
  }, {
    cycles: [],
    activeCycleId: null,
  });

  useState<Cycle[]>([]);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    // % Usando state
    // setCycles((state) => [...state, newCycle]);
    // setActiveCycleId(id);
    // % Usando reducer
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    // % Usando state
    // setCycles((state) => state.map((cycle) => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptedDate: new Date() };
    //   }
    //   return cycle;
    // }));
    // setActiveCycleId(null);
    // % Usando reducer
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
    });
  }

  const markCurrentCycleAsFinished = useCallback(() => {
    // % Usando state
    // setCycles((state) => state.map((cycle) => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, finishedDate: new Date() };
    //   }
    //   return cycle;
    // }));
    // setActiveCycleId(null);
    // % Usando reducer
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      activeCycleId,
    });
  }, [activeCycleId]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  const contextValues = {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    createNewCycle,
    interruptCurrentCycle,
  };

  return (
    <cyclesContext.Provider value={useMemo(
      () => (contextValues),
      [contextValues],
    )}
    >
      {children}
    </cyclesContext.Provider>

  );
}
