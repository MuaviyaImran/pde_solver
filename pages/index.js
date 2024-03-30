import HeroParticles from "@/components/HeroParticles";
import NavBar from "@/components/NavBar";
import InputForm from "@/components/InputForm";
export default function Home() {
  return (
    <div className="overflow-x-hidden ">
      <HeroParticles />
      <NavBar />
      <InputForm />
    </div>
  );
}
