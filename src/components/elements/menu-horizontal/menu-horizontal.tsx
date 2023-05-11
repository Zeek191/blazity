import Link from "next/link";
import type { MenuHorizontalProps } from "./types";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function MenuHorizontal({ links }: MenuHorizontalProps) {
  const { pathname } = useRouter();
  if (!links) return null;

  return (
    <ul className="py-6 flex flex-col md:flex-row border-b border-b-gray-500 w-full md:w-auto">
      {links?.map(({ link, label }) => (
        <li key={link}>
          <Link
            href={link}
            className={clsx(
              "block mb-4 md:mx-4 rounded-full border-2 border-white py-2 px-8 text-center md:text-left duration-300",
              pathname === link
                ? "bg-white text-black duration-200"
                : "hover:border-gray-500 hover:text-gray-500"
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
