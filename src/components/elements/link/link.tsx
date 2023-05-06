import { LinkProps as NextLinkProps, default as NextLink } from "next/link";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type LinkProps = PropsWithChildren<
  NextLinkProps & {
    className?: string;
  }
>;

export default function Link(props: LinkProps) {
  const { children, className, ...rest } = props;

  return (
    <NextLink
      {...rest}
      className={clsx(
        "bg-white hover:bg-transparent hover:ring hover:ring-white hover:text-white px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white text-black",
        className
      )}
    >
      {children}
    </NextLink>
  );
}
