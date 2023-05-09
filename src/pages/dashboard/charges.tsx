import UserBar from "@/components/sections/user-bar/user-bar";
import MenuHorizontal from "@/components/elements/menu-horizontal/menu-horizontal";
import FullHeightContainer from "@/components/elements/full-height-container/full-height-container";
import withProtectedPath from "@/base/hoc/with-protected-path";
import { DASHBOARD_MENUS } from "@/base/consts/dashboard-menus";
import ChargesBoard from "@/components/sections/charges-board/charges-board";

function Charges() {
  return (
    <FullHeightContainer className="justify-start pt-32">
      <UserBar />
      <MenuHorizontal links={DASHBOARD_MENUS} />
      <ChargesBoard />
    </FullHeightContainer>
  );
}

export default withProtectedPath(Charges);
