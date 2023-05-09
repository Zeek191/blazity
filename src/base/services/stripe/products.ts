import Stripe from "stripe";
import { stripe } from "@/base/services/stripe";

function combineProductWithPrice(
  products: Stripe.Product[],
  prices: Stripe.Price[]
) {
  if (!products || !prices) return [];
  return products.map((product) => {
    return {
      ...product,
      price: prices.find((price) => price.product === product.id),
    };
  });
}

async function resolvePrice(priceID: Stripe.Product["default_price"]) {
  return await stripe.prices.retrieve(String(priceID));
}

export async function fetchProductsWithPrices() {
  const products = await stripe.products.search({
    query: `active:'true'`,
  });

  const pricesPromises = products.data.map((prod) =>
    resolvePrice(prod.default_price)
  );

  const prices = await Promise.all(pricesPromises);
  const combinedObjects = combineProductWithPrice(products.data, prices);
  return combinedObjects;
}
