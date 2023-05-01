import Link from "next/link";
import type { MenuHorizontalProps } from "./types";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function MenuHorizontal({ links }: MenuHorizontalProps) {
  const { pathname } = useRouter();
  if (!links) return null;

  return (
    <ul className="py-6 flex border-b border-b-gray-500">
      {links?.map(({ link, label }) => (
        <li
          key={link}
          className={clsx(
            "mx-4 rounded-full border-2 border-white py-2 px-8",
            pathname === link && "bg-white text-black duration-200"
          )}
        >
          <Link href={link}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}
