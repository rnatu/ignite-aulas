import { Play } from 'phosphor-react';
import {
  CountDownContainer, FormContainer, HomeContainer, Separator,
} from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">
            Vou trabalhar em
            <input id="task" type="text" />
          </label>

          <label htmlFor="minutesAmount">
            durante
            <input id="minutesAmount" type="number" />
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

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  );
}
