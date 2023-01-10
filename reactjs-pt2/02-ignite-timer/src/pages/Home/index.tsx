import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';

import { useEffect, useState } from 'react';
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from './styles';

// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// }
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, "'O ciclo precisa ser de no mínimo 5 minutos").max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState,
  } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  // console.log(formState.errors);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

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
    setCycles(cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() };
      }
      return cycle;
    }));

    setActiveCycleId(null);
  }

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
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`;
    }
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

  console.log(cycles);

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">
            Vou trabalhar em
            <TaskInput
              id="task"
              type="text"
              placeholder="Dê um nome para o seu projeto"
              disabled={!!activeCycle}
              list="task-suggestions"
              {...register('task')}
            />
          </label>

          <datalist id="task-suggestions">
            {datalistOption.map((option) => (
              <option
                key={option.id}
                value={option.name}
                aria-label={option.name}
              />
            ))}
          </datalist>

          <label htmlFor="minutesAmount">
            durante
            <MinutesAmountInput
              id="minutesAmount"
              type="number"
              placeholder="00"
              disabled={!!activeCycle}
              step={5}
              min={5}
              // max={60}
              {...register('minutesAmount', {
                valueAsNumber: true,
              })}
            />
          </label>
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

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
