import Link from "next/link";
import clsx from "clsx";
import useAuthContext from "@/base/context/auth/hook";

export default function Header() {
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
    <header className="py-10">
      <ul className="flex justify-end">
        {globalLinks.map(({ label, href, fn, onlySignedIn, onlySignedOut }) => (
          <li
            key={label}
            className={clsx(
              "mx-5",
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
      <div>User: {user}</div>
    </header>
  );
}
