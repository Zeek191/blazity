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
        "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    >
      {children}
    </button>
  );
}
