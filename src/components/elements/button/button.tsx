import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={clsx(
        "bg-white hover:bg-transparent hover:ring hover:ring-white hover:text-white px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white text-black",
        className
      )}
    >
      {children}
    </button>
  );
}
