import { stripe } from ".";
import { StripeNewUser } from "./types";

export async function createStripeUser({
  name,
  surname,
  email,
}: StripeNewUser) {
  const user = await stripe.customers.create({
    name: name + " " + surname,
    email,
  });

  return user;
}
