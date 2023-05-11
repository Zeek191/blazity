import type { PropsWithChildren } from "react";
import type { HeroProps } from "./types";
import ParticlesModule from "@/components/modules/particles-module/particles";
import clsx from "clsx";

export default function Hero({
  title,
  description,
  className,
  children,
}: PropsWithChildren<HeroProps>) {
  return (
    <section
      className={clsx(
        "relative h-screen w-full flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="z-10 text-center">
        {title && (
          <h1 className="text-3xl md:text-6xl font-bold max-w-[700px] text-center mb-8 mx-auto">
            {title}
          </h1>
        )}

        {description && (
          <p className="text-gray-400 text-md md:text-xl text-center">
            {description}
          </p>
        )}

        {children && <div>{children}</div>}
      </div>

      <ParticlesModule />
    </section>
  );
}
