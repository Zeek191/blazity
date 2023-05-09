import { PropsWithChildren } from "react";
import clsx from "clsx";

export default function FullHeightContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "flex items-center flex-col min-h-screen px-4 md:px-0 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
