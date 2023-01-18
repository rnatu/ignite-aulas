import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useContext } from 'react';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
// eslint-disable-next-line import/no-cycle
import { NewCycleForm } from './components/NewCycleForm';
// eslint-disable-next-line import/no-cycle
import { CountDown } from './components/Countdown';
import { cyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1, "'O ciclo precisa ser de no mínimo 5 minutos").max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, activeCycle, interruptCurrentCycle } = useContext(cyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  const { handleSubmit, watch /* reset */ } = newCycleForm;

  /* o watch transforma o input com o name task em um controlled input,
  monitorando qualquer mudança */
  const task = watch('task');
  const isSubmitDisabled = !task;

  return (

    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={() => interruptCurrentCycle()} type="button">
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
