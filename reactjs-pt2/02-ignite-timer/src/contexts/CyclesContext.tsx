import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
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
  // eslint-disable-next-line consistent-return
  }, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer: cycles-state-1.0.0');

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    }
  });

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      );
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@ignite-timer: cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

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
