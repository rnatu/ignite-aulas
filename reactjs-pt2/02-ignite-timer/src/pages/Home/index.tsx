import { Play } from 'phosphor-react';
import { FormEvent } from 'react';
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
  // uncontrolled

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(event.currentTarget.task.value);

    // eslint-disable-next-line no-param-reassign
    event.currentTarget.task.value = '';
  }

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
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <FormContainer>
          <label htmlFor="task">
            Vou trabalhar em
            <TaskInput
              id="task"
              type="text"
              placeholder="Dê um nome para o seu projeto"
              list="task-suggestions"
              name="task"
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

        <StartCountDownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
