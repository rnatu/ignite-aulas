import { GetStaticProps } from 'next';

import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from '../services/stripe';

import styles from "./home.module.scss";

// Tipagem da props enviada da API
interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

// essa função é executada na camada de servidor do NextJS
export const getStaticProps: GetStaticProps = async() => {

  //utiliza o ID da API informado no site do stripe
  const price = await stripe.prices.retrieve('price_1IamcXA2Gj2Ei4q9VbZibtLz')

  const product = {
    priceId: price.id,
    //O preço unitário é um number em centávos, abaixo já está formatado para dólar
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    //quanto tempo em segundos a página deverá permanecer sem ser revalidada
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
