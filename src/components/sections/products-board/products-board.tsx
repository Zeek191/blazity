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
import clsx from "clsx";
import { fetchProductsWithPrices } from "@/base/services/stripe/products";
import useAsyncLoader from "@/base/hooks/use-async-loader";

export default function ProductsBoard({ category }: ProductsBoardProps) {
  const [products, setProducts] =
    useState<(Stripe.Product & { price?: Stripe.Price })[]>();

  const { user, info } = useAuthContext();
  const router = useRouter();
  const resultsLoaded = useAsyncLoader({
    cb: saveStripeProductsWithPrices,
    dependencies: [category],
  });

  async function onClickHandler(price: string) {
    if (user) return await checkout(price, info?.stripeId);

    return router.push(ROUTES.SIGN_IN);
  }

  async function saveStripeProductsWithPrices() {
    const stripeProducts = await fetchProductsWithPrices(category);
    setProducts(stripeProducts);
  }

  if (!products?.length && !resultsLoaded) return <Spinner className="mt-8" />;

  return (
    <ul className="py-10 grid md:grid-cols-3 grid-rows-1 gap-8 w-full md:max-w-[1200px] md:px-8">
      {products?.map(({ id, name, price, metadata }) => (
        <li
          key={id}
          className={clsx(
            "rounded-lg p-6 py-10 duration-200 text-center flex flex-col justify-stretch flex-1 shadow-lg",
            metadata?.featured === "true"
              ? "shadow-blue-600 hover:shadow-xl hover:shadow-blue-600"
              : "shadow-blue-300 hover:shadow-xl hover:shadow-blue-300"
          )}
        >
          <h3 className="text-xl mb-6">{name}</h3>

          {price?.unit_amount && (
            <h4 className="text-2xl font-bold mb-6">
              {price?.unit_amount / 100}{" "}
              <span className="uppercase">{price?.currency}</span>
            </h4>
          )}

          {metadata.description ? (
            <ul className="text-left text-sm list-disc pl-6 mb-6">
              {JSON.parse(metadata.description)?.map(
                (item: string, index: number) => (
                  <li key={name + "-" + index} className="mb-4">
                    {item}
                  </li>
                )
              )}
            </ul>
          ) : null}

          {price?.id && (
            <Button
              className={clsx(
                "w-full self-end mt-auto",
                metadata?.featured === "true" &&
                  "border-blue-600 hover:border-transparent hover:shadow-blue-600 hover:shadow-inner"
              )}
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
