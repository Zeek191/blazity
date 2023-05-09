import clsx from "clsx";
import Link from "next/link";
import useAuthContext from "@/base/context/auth/hook";
import type { HeaderMenuProps } from "@/components/sections/header/types";
import { useContext } from "react";
import { ProductsContext } from "@/base/context/products/provider";
import SubMenu from "@/components/elements/sub-menu/sub-menu";

export default function HeaderMenu({ className }: HeaderMenuProps) {
  const { user, signOutUser } = useAuthContext();
  const stripeProducts = useContext(ProductsContext);

  const globalLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Courses", submenus: stripeProducts },
    { label: "Dashboard", href: "/dashboard/products", onlySignedIn: true },
    { label: "Sign In", href: "/auth/sign-in", onlySignedOut: true },
    { label: "Sign Up", href: "/auth/sign-up", onlySignedOut: true },
    { label: "Sign Out", fn: signOutUser, onlySignedIn: true },
  ];

  return (
    <ul className={className}>
      {globalLinks.map(
        ({ label, href, fn, submenus, onlySignedIn, onlySignedOut }) => (
          <li
            key={label}
            className={clsx(
              "mb-5 text-black md:text-white md:mb-0 md:mx-5 relative after:duration-200 after:left-0",
              "after:w-0 after:hover:w-full after:h-[2px] after:bg-white after:bottom-0 after:absolute",
              onlySignedOut && user && "hidden",
              onlySignedIn && !user && "hidden"
            )}
          >
            {href && <Link href={href}>{label}</Link>}

            {fn && <button onClick={fn}>{label}</button>}

            {submenus && <SubMenu menus={submenus}>{label}</SubMenu>}
          </li>
        )
      )}
    </ul>
  );
}
