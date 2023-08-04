// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IProduct } from "@/contexts/CartContext";
import { stripe } from "../../lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

interface SuccessResponse {
  checkoutUrl: string | null;
}

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { products } = req.body as { products: IProduct[] };

  if (!products) {
    return res.status(400).json({
      error: "Products not found",
    });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`; //https://stripe.com/docs/payments/checkout/custom-success-page
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1,
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
