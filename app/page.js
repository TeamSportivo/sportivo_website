import { fetchMembers } from "@/lib/fetchMembers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Sponsors from "@/components/sections/Sponsors";
import FAQ from "@/components/sections/FAQ";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default async function Home() {
  let members = { mentor: [], core: [], working: [], volunteer: [] };
  try {
    members = await fetchMembers();
  } catch (e) {
    console.error("Failed to load members:", e);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Team members={members} />
        {/* <Gallery /> */}
        {/* <Sponsors /> */}
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
