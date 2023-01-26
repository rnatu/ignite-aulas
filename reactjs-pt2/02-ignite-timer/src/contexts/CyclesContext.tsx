import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/action';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
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
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  // % Usando reducer
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
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
    dispatch(addNewCycleAction(newCycle));

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
    dispatch(interruptCurrentCycleAction());
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
    dispatch(markCurrentCycleAsFinishedAction());
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
