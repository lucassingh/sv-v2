import { LandingChrome } from "@/components/landing-chrome";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SocialSection } from "@/components/sections/social-section";
import { ConstruccionInfraestructuraSection } from "@/components/sections/construccion-infraestructura";
import { DonationSection } from "@/components/sections/donation";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <LandingChrome>
      <main className="min-h-screen border-0 bg-zinc-50">
        <HeroSection />
        <AboutSection />
        <SocialSection />
        <ConstruccionInfraestructuraSection />
        <DonationSection />
        <ContactSection />
        <Footer />
      </main>
    </LandingChrome>
  );
}
