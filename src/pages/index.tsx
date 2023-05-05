import FullHeightContainer from "@/components/modules/full-height-container/full-height-container";
import Hero from "@/components/sections/hero/hero";
import ProductsBoard from "@/components/sections/products-board/products-board";
import { STRIPE_PRODUCT_META_CATEGORY } from "@/components/sections/products-board/types";

export default function HomePage() {
  return (
    <FullHeightContainer>
      <Hero
        title="Discover the world of programming"
        description="Create something that will change the future - with us it's possible!"
      />
      <ProductsBoard category={STRIPE_PRODUCT_META_CATEGORY.JAVASCRIPT} />
    </FullHeightContainer>
  );
}
