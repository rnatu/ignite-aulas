import { Play } from 'phosphor-react';
import { useState } from 'react';
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
  // controlled
  const [task, setTask] = useState('');

  function resetForm() {
    setTask('');
  }

  const datalistOption = [
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
    'Banana',
  ];

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">
            Vou trabalhar em
            <TaskInput
              id="task"
              type="text"
              placeholder="Dê um nome para o seu projeto"
              list="task-suggestions"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
          </label>

          <datalist id="task-suggestions">
            {datalistOption.map((option) => (
              <option value={option} aria-label={option} />
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

        <StartCountDownButton disabled={!task} type="submit" onSubmit={() => resetForm}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
