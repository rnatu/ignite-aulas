import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client'
import { stripe } from '../../services/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    //criando o cliente (customer) dentro do painel do stripe
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      //é obrigatório
      email: session.user.email,
      // metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      //id do customer criado no painel do stripe
      customer: stripeCustomer.id,
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
