import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { cyclesContext } from '../../../../contexts/CyclesContext';
import { CountDownContainer, Separator } from './styles';

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(cyclesContext);

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
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, activeCycleId, markCurrentCycleAsFinished]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`;
      return;
    }

    document.title = 'Ignite Timer';
  }, [minutes, seconds, activeCycle]);

  return (

    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
