import Stripe from "stripe";
import { stripe } from "@/base/services/stripe";
import { useEffect, useState } from "react";
import type { ProductsBoardProps } from "./types";
import Button from "@/components/elements/button/button";
import useAuthContext from "@/base/context/auth/hook";
import { checkout } from "@/base/services/stripe/checkout";
import { useRouter } from "next/router";
import { ROUTES } from "@/base/consts/routes";
import Spinner from "@/components/elements/spinner/spinner";

export default function ProductsBoard({ category }: ProductsBoardProps) {
  const [products, setProducts] =
    useState<(Stripe.Product & { price?: Stripe.Price })[]>();

  const { user, info } = useAuthContext();
  const router = useRouter();

  async function resolvePrice(priceID: Stripe.Product["default_price"]) {
    return await stripe.prices.retrieve(String(priceID));
  }

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

  async function onClickHandler(price: string) {
    if (user) {
      return await checkout(price, info?.stripeId);
    }

    return router.push(ROUTES.SIGN_IN);
  }

  async function fetchProducts() {
    const products = await stripe.products.search({
      query: `active:'true' AND metadata['category']:'${category}'`,
      limit: 3,
    });

    const pricesPromises = products.data.map((prod) =>
      resolvePrice(prod.default_price)
    );

    const prices = await Promise.all(pricesPromises);
    const combinedObjects = combineProductWithPrice(products.data, prices);
    setProducts(combinedObjects);
  }

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (!products) return <Spinner className="mt-8" />;

  return (
    <ul className="py-10 grid md:grid-cols-3 grid-rows-1 gap-8 w-full md:max-w-[1200px] md:px-8">
      {products.map(({ id, name, price }) => (
        <li
          key={id}
          className="border-2 rounded-lg border-white shadow-white p-6 hover:border-transparent hover:shadow-lg hover:shadow-white duration-200 text-center"
        >
          <h3 className="text-xl mb-6">{name}</h3>

          {price?.unit_amount && (
            <h4 className="text-2xl font-bold mb-6">
              {price?.unit_amount / 100}{" "}
              <span className="uppercase">{price?.currency}</span>
            </h4>
          )}

          {price?.id && (
            <Button
              className="w-full"
              onClick={() => onClickHandler(price?.id)}
            >
              Buy now!
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
