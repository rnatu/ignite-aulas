import { HandPalm, Play } from 'phosphor-react';
import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/Countdown';

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date,
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null,
  markCurrentCycleAsFinished: () => void,
}

export const cyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() };
      }
      return cycle;
    }));
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    // limpar os campos do form
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() };
      }
      return cycle;
    }));

    setActiveCycleId(null);
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`;
      return;
    }

    document.title = 'Ignite Timer';
  }, [minutes, seconds, activeCycle]);

  /* o watch transforma o input com o name task em um controlled input,
  monitorando qualquer mudança */
  const task = watch('task');
  const isSubmitDisabled = !task;

  return (

    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

        <cyclesContext.Provider value={useMemo(
          () => (
            {
              activeCycle, activeCycleId, markCurrentCycleAsFinished,
            }),
          [activeCycle, activeCycleId, markCurrentCycleAsFinished],
        )}
        >
          <NewCycleForm />

          <CountDown />
        </cyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton onClick={() => handleInterruptCycle()} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
