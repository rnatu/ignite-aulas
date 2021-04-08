import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client'
import { fauna } from "../../services/fauna";
import { query as q } from 'faunadb'
import { stripe } from '../../services/stripe';

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {

    //informações do usuário logado na aplicação
    const session = await getSession({ req });

    //buscando os dados do usuário no faunadb pela session obtida pelo navegador (next/auth)
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    //buscando a chave stripe_customer_id no faunaDB se existir, se não será undefined
    let customerId = user.data.stripe_customer_id

    //se for undefined
    if(!customerId) {
      //criando customer no stripe
      const stripeCustomer = await stripe.customers.create({
        //email é obrigatório
        email: session.user.email,
        // metadata
      })

      //criando uma nova chave em data no faunaDB com nome stripe_customer_id
      //utilizando o valor como o id gerado automaticamente no stripe obtido acima (stripeCustomer-)
      await fauna.query(
        //atualiza um campo no faunaDB
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )

      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      //id do customer criado no painel do stripe
      customer: customerId,
      payment_method_types: ['card'],
      //obrigar o usuário a preencher o endereço
      billing_address_collection: 'required',
      line_items: [
        {price: 'price_1IamcXA2Gj2Ei4q9VbZibtLz', quantity: 1},
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return res.status(200).json({sessionId : stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed')
  }
}
