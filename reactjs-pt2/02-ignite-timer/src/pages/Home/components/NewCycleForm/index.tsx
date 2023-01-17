import { useContext } from 'react';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
// eslint-disable-next-line import/no-cycle
import { cyclesContext } from '../..';

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

export function NewCycleForm() {
  const { activeCycle } = useContext(cyclesContext);

  return (
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
          step={1}
          min={1}
          max={60}
          {...register('minutesAmount', {
            valueAsNumber: true,
          })}
        />
      </label>
      <span>minutos.</span>
    </FormContainer>
  );
}
