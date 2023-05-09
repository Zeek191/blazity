import { PropsWithChildren } from "react";
import ParticlesModule from "../../modules/particles-module/particles";

export default function ParticlesContainer({ children }: PropsWithChildren) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 md:px-0">
      <div className="z-10 w-full">{children}</div>

      <ParticlesModule />
    </div>
  );
}
