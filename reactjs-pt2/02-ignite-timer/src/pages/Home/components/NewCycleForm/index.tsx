import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1, "'O ciclo precisa ser de no mínimo 5 minutos").max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

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
