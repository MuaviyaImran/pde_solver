import HeroParticles from "@/components/HeroParticles";
import NavBar from "@/components/NavBar";
import InputForm from "@/components/InputForm";
import Head from "next/head";

export default function Home() {
  return (
    <div className="overflow-x-hidden ">
      <Head>
        <title>PDE - Solver</title>
        <meta
          property="og:title"
          content="PDE - Solver an AI Tool"
          key="title"
        />
      </Head>
      <HeroParticles />
      <NavBar />
      <InputForm />
    </div>
  );
}
