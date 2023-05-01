import UserBar from "@/components/sections/user-bar/user-bar";
import MenuHorizontal from "@/components/elements/menu-horizontal/menu-horizontal";
import FullHeightContainer from "@/components/modules/full-height-container/full-height-container";
import withProtectedPath from "@/base/hoc/with-protected-path";
import { DASHBOARD_MENUS } from "@/base/consts/dashboard-menus";

function Billings() {
  return (
    <FullHeightContainer>
      <UserBar />
      <MenuHorizontal links={DASHBOARD_MENUS} />
    </FullHeightContainer>
  );
}

export default withProtectedPath(Billings);
