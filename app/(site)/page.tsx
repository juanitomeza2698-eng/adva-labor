import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Page() {
  return (
    <main className="pt-16"> {/* evita que el header tape el contenido */}
      <TopBar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
