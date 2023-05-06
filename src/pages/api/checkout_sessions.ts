import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/base/services/stripe";

type CheckoutRequestBody = {
  price: string;
  userId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { price, userId } = JSON.parse(req.body) as CheckoutRequestBody;

  if (req.method === "POST" && price) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
        customer: userId,
        success_url: `${req.headers.origin}/dashboard?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
