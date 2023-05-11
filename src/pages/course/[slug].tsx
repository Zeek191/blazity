import type Stripe from "stripe";
import { stripe } from "@/base/services/stripe";
import FullHeightContainer from "@/components/elements/full-height-container/full-height-container";
import Hero from "@/components/sections/hero/hero";
import Button from "@/components/elements/button/button";
import useAuthContext from "@/base/context/auth/hook";
import Link from "@/components/elements/link/link";
import { ROUTES } from "@/base/consts/routes";
import { checkout } from "@/base/services/stripe/checkout";

export default function CoursePage({
  name,
  id,
  price,
  metadata,
}: Stripe.Product & { price: Stripe.Price }) {
  const { user, info } = useAuthContext();

  const { description } = metadata || {};
  const parsedDescription: string[] = description
    ? JSON.parse(description)
    : [];

  async function checkoutHandler() {
    return await checkout(price.id, info?.stripeId);
  }

  return (
    <FullHeightContainer>
      <Hero
        title={name}
        description={"Product ID: " + id}
        className="mt-10 md:mt-0"
      >
        {parsedDescription && (
          <ul className="list-disc mt-8 px-4">
            {parsedDescription.map((point, index) => (
              <li key={id + index} className="mb-2">
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          {user?.email && price?.unit_amount ? (
            <Button onClick={checkoutHandler}>
              $ {price?.unit_amount / 100} USD
            </Button>
          ) : null}

          {!user?.email && (
            <Link href={ROUTES.SIGN_IN}>Sign in and buy the course!</Link>
          )}
        </div>
      </Hero>
    </FullHeightContainer>
  );
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const products = await stripe.products.list();

  const product = products.data.find(
    (p) => p.name.toLowerCase() === slug.split("-").join(" ")
  );

  const price = product?.default_price
    ? await stripe.prices.retrieve(String(product?.default_price))
    : null;

  return {
    props: { ...product, price },
  };
}

export async function getStaticPaths() {
  const products = await stripe.products.list();

  const paths = products.data.map(({ name }) => ({
    params: {
      slug: name.toLowerCase().split(" ").join("-"),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
