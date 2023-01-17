import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createContext, useMemo, useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
// eslint-disable-next-line import/no-cycle
import { NewCycleForm } from './components/NewCycleForm';
// eslint-disable-next-line import/no-cycle
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1, "'O ciclo precisa ser de no mínimo 5 minutos").max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const cyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  const { handleSubmit, watch, reset } = newCycleForm;

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
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

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
