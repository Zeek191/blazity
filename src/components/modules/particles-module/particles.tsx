import { useCallback } from "react";
import particlesConfig from "@/base/config/particlesjs-config.json";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import type { Engine, ISourceOptions } from "tsparticles-engine";

export default function ParticlesModule() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      canvasClassName="absolute top-0 left-0"
      style={{ position: "absolute" }}
      options={
        {
          ...particlesConfig,
          fullScreen: { enable: false },
        } as ISourceOptions
      }
      init={particlesInit}
    />
  );
}
