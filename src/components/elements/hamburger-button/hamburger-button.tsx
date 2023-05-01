import clsx from "clsx";
import { HamburgerButtonProps } from "./types";

export default function HamburgerButton({
  state,
  variant = "light",
  changeStateHandler,
  className,
}: HamburgerButtonProps) {
  const variantClass = variant === "light" ? "bg-white" : "bg-black";

  return (
    <button
      className={clsx("relative h-5 w-8", className)}
      onClick={changeStateHandler}
    >
      <div
        className={clsx(
          "block md:hidden w-8 h-[2px] absolute duration-200",
          state && "top-1/2 rotate-45",
          !state && "top-0",
          variantClass
        )}
      />
      <div
        className={clsx(
          "block md:hidden w-8 h-[2px] absolute duration-200",
          state && "opacity-0 h-0",
          variantClass
        )}
      />
      <div
        className={clsx(
          "block md:hidden w-8 h-[2px] absolute duration-200",
          state && "top-1/2 -rotate-45",
          !state && "top-full",
          variantClass
        )}
      />
    </button>
  );
}
