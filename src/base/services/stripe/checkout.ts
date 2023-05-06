import { getStripe } from ".";

export async function checkout(price: string, userId?: string) {
  const response = await fetch("/api/checkout_sessions", {
    method: "POST",
    body: JSON.stringify({ price, userId }),
  });

  const parsedResponse = await response.json();

  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    sessionId: parsedResponse.id,
  });

  console.warn(error.message);
}
