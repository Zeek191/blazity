import type Stripe from "stripe";
import { stripe } from "@/base/services/stripe";
import FullHeightContainer from "@/components/modules/full-height-container/full-height-container";
import Hero from "@/components/sections/hero/hero";

export default function CoursePage({ name, id }: Stripe.Product) {
  return (
    <FullHeightContainer>
      <Hero title={"Product: " + name} description={"Product ID: " + id} />
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

  return {
    props: product,
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
