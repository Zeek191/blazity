import clsx from "clsx";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import HamburgerButton from "@/components/elements/hamburger-button/hamburger-button";
import HeaderMenu from "@/components/modules/header-menu/header-menu";
import { useRouter } from "next/router";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  function changeMobileMenuState() {
    return setMobileMenu(!mobileMenu);
  }

  useEffect(() => {
    if (mobileMenu) {
      changeMobileMenuState();
    }
  }, [router.pathname]);

  return (
    <header className={clsx(styles.wrapper, "py-8 fixed w-full z-50")}>
      <HeaderMenu className="hidden md:flex justify-end" />

      <div className="w-full flex justify-end pr-8">
        <HamburgerButton
          state={mobileMenu}
          variant="light"
          changeStateHandler={changeMobileMenuState}
        />
      </div>

      <div
        className={clsx(
          "fixed top-0 left-0 right-0 bg-white duration-300 p-8 opacity-1",
          !mobileMenu && "-translate-y-full opacity-0"
        )}
      >
        <div className="relative h-screen flex justify-between items-center flex-col">
          <HamburgerButton
            state={mobileMenu}
            variant="dark"
            changeStateHandler={changeMobileMenuState}
            className=" top-0 right-0 self-end"
          />

          <HeaderMenu className="flex flex-col justify-center items-center" />

          <div />
        </div>
      </div>
    </header>
  );
}
