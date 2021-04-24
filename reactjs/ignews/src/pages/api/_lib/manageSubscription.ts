import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // Buscar o campo ref no faunaDB para o usuário que tiver match no customerId recebido e o stripe_customer_id no fauna
  // Foi criado um index no faunaDB para essa busca -> user_by_stripe_customer_id
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index("user_by_stripe_customer_id"), customerId
        )
      )
    )
  );

  // Obter dados do customer através do subscriptionId
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // Cria o objeto com o dados para serem enviados ao faunaDB
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if(createAction) {
    await fauna.query(
      // Criar os dados no FaunaDB
      q.Create(
        //seleciona a collection, e envia dentro de data para ref que será criada o objeto subscriptionData
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    await fauna.query(
      //É utilizado o replace ao invés de update neste caso, pois se posteriormente precisarmos
      //atualizar mais de algum campo de uma só vez, o replace já faz isso, substituindo
      //todos os dados

      //substitui todos valores no faunaDB
      q.Replace(
        //seleciona/encontra o campo "ref" em (resultado do match)
        q.Select(
          "ref",
          q.Get(
            q.Match(
              //faz o match entre o index e o subscriptionId
              q.Index('subscription_by_id'), subscriptionId
            )
          )
        ),
        //a partir do ref selecionado, quais dados deseja substituir por novos dados
        { data: subscriptionData }
      )
    )
  }
}
