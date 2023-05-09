import clsx from "clsx";
import styles from "./styles.module.css";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import HamburgerButton from "@/components/elements/hamburger-button/hamburger-button";
import HeaderMenu from "@/components/modules/header-menu/header-menu";
import { useRouter } from "next/router";
import { BREAKPOINTS } from "@/base/consts/media-breakpoints";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isTablet = useMediaQuery({ query: BREAKPOINTS.MD });
  const router = useRouter();

  function changeMobileMenuState() {
    return setMobileMenu(!mobileMenu);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      changeMobileMenuState();
    }
  }, [router.pathname, isTablet]);

  return (
    <header
      className={clsx(
        styles.wrapper,
        "py-8 fixed w-full z-20 duration-200",
        isScrolled && "bg-white duration-300 backdrop-blur-md bg-opacity-5"
      )}
    >
      <HeaderMenu className="hidden md:flex justify-end" />

      <div className="w-full flex justify-end pr-8 md:hidden">
        <HamburgerButton
          state={mobileMenu}
          variant={mobileMenu ? "dark" : "light"}
          changeStateHandler={changeMobileMenuState}
          className={clsx(mobileMenu && "z-30")}
        />
      </div>

      <div
        className={clsx(
          "fixed top-0 left-0 right-0 bg-white duration-300 opacity-1",
          !mobileMenu && "-translate-y-full opacity-0"
        )}
      >
        <HeaderMenu className="flex flex-col justify-center items-center h-screen" />
      </div>
    </header>
  );
}
