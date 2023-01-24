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

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // % Usando state
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  // % Usando reducer
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log(state);
    console.log(action);

    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle];
    }

    return state;
  }, []);

  useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = useCallback(() => {
    // % Usando state
    // setCycles((state) => state.map((cycle) => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, finishedDate: new Date() };
    //   }
    //   return cycle;
    // }));
    // % Usando reducer
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      activeCycleId,
    });

    setActiveCycleId(null);
  }, [activeCycleId]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

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
    // % Usando reducer
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });

    setActiveCycleId(id);
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
    // % Usando reducer
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    });

    setActiveCycleId(null);
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
