import Stripe from "stripe";

export type StripeProductType = Stripe.Product & {
  slug: string;
  price?: Stripe.Price;
};
