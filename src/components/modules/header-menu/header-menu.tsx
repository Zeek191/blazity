import clsx from "clsx";
import Link from "next/link";
import useAuthContext from "@/base/context/auth/hook";
import type { HeaderMenuProps } from "@/components/sections/header/types";

export default function HeaderMenu({ className }: HeaderMenuProps) {
  const { user, signOutUser } = useAuthContext();

  const globalLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Dashboard", href: "/dashboard/products", onlySignedIn: true },
    { label: "Sign In", href: "/auth/sign-in", onlySignedOut: true },
    { label: "Sign Up", href: "/auth/sign-up", onlySignedOut: true },
    { label: "Sign Out", fn: signOutUser, onlySignedIn: true },
  ];

  return (
    <ul className={className}>
      {globalLinks.map(({ label, href, fn, onlySignedIn, onlySignedOut }) => (
        <li
          key={label}
          className={clsx(
            "mb-5 text-black",
            onlySignedOut && user && "hidden",
            onlySignedIn && !user && "hidden"
          )}
        >
          {href ? (
            <Link href={href}>{label}</Link>
          ) : (
            <button onClick={fn}>{label}</button>
          )}
        </li>
      ))}
    </ul>
  );
}
