import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';

import { useEffect, useState } from 'react';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { NewCycleForm } from './NewCycleForm';
import { CountDown } from './Countdown';

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date,
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1, "'O ciclo precisa ser de no mínimo 5 minutos").max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // pegando o total de segundos da tarefa ativa
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  // pegando os segundos atuais com a redução a cada 1 segundo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  // pegando a quantidade de minutos atual
  const minutesAmount = Math.floor(currentSeconds / 60);
  // pegando a quantidade de segundos atual
  const secondsAmount = currentSeconds % 60;

  // convertendo minutos em string e adicionando um '0' no começo
  const minutes = String(minutesAmount).padStart(2, '0');
  // convertendo segundos em string e adicionando um '0' no começo
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

        if (secondsDifference >= totalSeconds) {
          setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() };
            }
            return cycle;
          }));

          setAmountSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

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

  const datalistOption = [
    {
      id: 1,
      name: 'Projeto 1',
    },
    {
      id: 2,
      name: 'Projeto 2',
    },
    {
      id: 3,
      name: 'Banana',
    },
  ];

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

        <NewCycleForm />

        <CountDown />

        {activeCycleId ? (
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
