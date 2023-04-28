import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";

const globalLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Dashboard", href: "/dashboard/products", onlySignedIn: true },
  { label: "Sign Out", href: "/api/auth/logout", onlySignedIn: true },
  { label: "Sign In", href: "/auth/sign-in", onlySignedOut: true },
  {
    label: "Sign Up",
    href: "/auth/sign-up",
    onlySignedOut: true,
  },
];

export default function Header() {
  const { user } = useUser();

  return (
    <header className="py-10">
      <ul className="flex justify-end">
        {globalLinks.map(({ label, href, onlySignedIn, onlySignedOut }) => (
          <li
            key={label}
            className={clsx(
              "mx-5",
              onlySignedOut && user && "hidden",
              onlySignedIn && !user && "hidden"
            )}
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
