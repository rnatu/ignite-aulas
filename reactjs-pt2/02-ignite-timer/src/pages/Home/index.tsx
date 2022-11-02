import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles';

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

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
        <FormContainer>
          <label htmlFor="task">
            Vou trabalhar em
            <TaskInput
              id="task"
              type="text"
              placeholder="Dê um nome para o seu projeto"
              list="task-suggestions"
              {...register('task')}
            />
          </label>

          <datalist id="task-suggestions">
            {datalistOption.map((option) => (
              <option key={option.id} value={option.name} aria-label={option.name} />
            ))}
          </datalist>

          <label htmlFor="minutesAmount">
            durante
            <MinutesAmountInput
              id="minutesAmount"
              type="number"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              {...register('minutesAmount', {
                valueAsNumber: true,

              })}
            />
          </label>
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={!isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
