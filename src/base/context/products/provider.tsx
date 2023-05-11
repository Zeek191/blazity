import { fetchProductsWithPrices } from "@/base/services/stripe/products";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import type { StripeProductType } from "./types";

function addSlugToProduct(product: Omit<StripeProductType, "slug">) {
  return {
    ...product,
    slug: "/course/" + product.name.split(" ").join("-").toLowerCase(),
  };
}

export const ProductsContext = createContext<StripeProductType[]>([]);

export default function ProductsProvider({ children }: PropsWithChildren<{}>) {
  const [stripeProducts, saveStripProducts] = useState<StripeProductType[]>([]);

  async function fetchAndSaveProducts() {
    const receivedProducts = await fetchProductsWithPrices();
    saveStripProducts(receivedProducts.map(addSlugToProduct));
  }
  useEffect(() => {
    fetchAndSaveProducts();
  }, []);

  return (
    <ProductsContext.Provider value={stripeProducts}>
      {children}
    </ProductsContext.Provider>
  );
}
