import UserBar from "@/components/sections/user-bar/user-bar";
import MenuHorizontal from "@/components/elements/menu-horizontal/menu-horizontal";
import FullHeightContainer from "@/components/elements/full-height-container/full-height-container";
import withProtectedPath from "@/base/hoc/with-protected-path";
import { DASHBOARD_MENUS } from "@/base/consts/dashboard-menus";
import ProductsBoard from "@/components/sections/products-board/products-board";
import { fetchProductsWithPrices } from "@/base/services/stripe/products";
import { ProductsBoardProps } from "@/components/sections/products-board/types";

function Products({ products }: ProductsBoardProps) {
  return (
    <FullHeightContainer className="justify-start pt-32">
      <UserBar />
      <MenuHorizontal links={DASHBOARD_MENUS} />
      <ProductsBoard products={products} />
    </FullHeightContainer>
  );
}

export async function getStaticProps() {
  const products = await fetchProductsWithPrices();

  return {
    props: { products },
    revalidate: 3600,
  };
}

export default withProtectedPath<ProductsBoardProps>(Products);
