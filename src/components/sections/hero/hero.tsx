import { HeroProps } from "./types";
import ParticlesModule from "@/components/modules/particles-module/particles";

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center">
      {title && (
        <h1 className="text-6xl font-bold max-w-[700px] text-center mb-8">
          {title}
        </h1>
      )}

      {description && <p className="text-gray-400 text-xl">{description}</p>}

      <ParticlesModule />
    </section>
  );
}
