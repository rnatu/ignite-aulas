import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter()

  async function handleSubscribe() {

    if(!session) {
      //github, pois no api/auth/[...nextauth] o provider utilizado é o github
      signIn('github');
      return;
    }

    //yarn add -D @types/next-auth@3.7.1
    //reload no vscode caso o activeSubscription esteja dando erro no typeScript
    //activeSubscription setado no /auth/[...nextauth].ts
    if(session.activeSubscription) {
      //redirecionando com o useRouter do next/router
      router.push('/posts');
      return;
    }

    // chamada para acessar a rota da API routes
    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
