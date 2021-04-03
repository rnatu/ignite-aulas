import { query as q, query } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
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

  // Salvar os dados da subscription do usuário no FaunaDB
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}
