import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { CountDownContainer, Separator } from './styles';

export function CountDown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

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
