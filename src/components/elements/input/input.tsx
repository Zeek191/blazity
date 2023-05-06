import { InputHTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export default function Input(props: InputProps) {
  const { label, className, type, ...rest } = props;
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const newErrors: string[] = [];
    if (type === "email" && rest.value) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(String(rest.value))) {
        newErrors.push("Invalid email address");
      }
    }
    if (type === "password" && rest.value) {
      if (String(rest.value).length < 8) {
        newErrors.push("Password must be at least 8 characters long");
      }
    }
    setErrors(newErrors);
  }, [rest.value, type]);

  return (
    <div className={clsx("flex flex-col mb-4", className)}>
      {label && (
        <label
          htmlFor={rest.id}
          className={clsx(props.disabled && "text-gray-500")}
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        type={type === "password" ? "password" : "text"}
        className={clsx(
          "bg-black ring-gray-400 ring-1 text-white px-3 py-2 rounded-lg w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white",
          props.disabled && "text-gray-500 cursor-not-allowed",
          className
        )}
      />
      {errors.length > 0 &&
        errors.map((error) => (
          <div key={error} className="text-red-500 text-sm mt-1">
            {error}
          </div>
        ))}
    </div>
  );
}
