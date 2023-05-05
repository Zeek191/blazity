import Stripe from "stripe";
import { Stripe as StripePromise, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<StripePromise | null>;

const STRIPE_OPTIONS: Stripe.StripeConfig = {
  apiVersion: "2022-11-15",
};

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  STRIPE_OPTIONS
);

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  }
  return stripePromise;
}
