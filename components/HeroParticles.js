import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "@/components/particlesConfig";

function HeroParticles() {
  const particlesInit = (engine) => {
    loadFull(engine);
  };

  return (
    <div className="App">
      <Particles init={particlesInit} options={particlesOptions} />
    </div>
  );
}
export default HeroParticles;
