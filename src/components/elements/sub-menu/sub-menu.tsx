import Link from "next/link";
import { SubMenuProps } from "./types";
import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export default function SubMenu({
  children,
  menus,
}: PropsWithChildren<SubMenuProps>) {
  if (!menus) return null;
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{children}</p>

      <ul className={styles.menu}>
        {menus.map(({ id, name, slug }) => (
          <li key={id} className={styles.menuItem}>
            <Link href={slug}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
