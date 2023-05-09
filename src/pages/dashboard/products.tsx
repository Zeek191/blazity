import UserBar from "@/components/sections/user-bar/user-bar";
import MenuHorizontal from "@/components/elements/menu-horizontal/menu-horizontal";
import FullHeightContainer from "@/components/modules/full-height-container/full-height-container";
import withProtectedPath from "@/base/hoc/with-protected-path";
import { DASHBOARD_MENUS } from "@/base/consts/dashboard-menus";
import { STRIPE_PRODUCT_META_CATEGORY } from "@/base/services/stripe/types";
import ProductsBoard from "@/components/sections/products-board/products-board";

function Products() {
  return (
    <FullHeightContainer className="justify-start pt-32">
      <UserBar />
      <MenuHorizontal links={DASHBOARD_MENUS} />
      <ProductsBoard category={STRIPE_PRODUCT_META_CATEGORY.JAVASCRIPT} />
    </FullHeightContainer>
  );
}

export default withProtectedPath(Products);
