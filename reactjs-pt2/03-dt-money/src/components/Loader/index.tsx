import loaderCoin from '../../assets/loader-coin.png';
import loaderHand from '../../assets/loader-hand.png';
import { LoaderContainer } from './styles';

export function Loader() {
  return (
    <LoaderContainer>
      <div className="loader">
        <div className="loader__image">
          <div className="loader__coin">
            <img src={loaderCoin} alt="Carregando dados" />
          </div>
          <div className="loader__hand">
            <img src={loaderHand} alt="" />
          </div>
        </div>
      </div>
    </LoaderContainer>
  );
}
