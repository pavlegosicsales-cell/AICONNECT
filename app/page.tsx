import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import InteractiveHouse from "@/components/InteractiveHouse";
import About from "@/components/About";
import Lokali from "@/components/Lokali";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <InteractiveHouse />
        <About />
        <Lokali />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
