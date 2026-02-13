import CTA from "@/Components/LandingPage/CTA";
import Feature from "@/Components/LandingPage/Feature";
import Footer from "@/Components/LandingPage/Footer";
import Header from "@/Components/LandingPage/Header";
import HeroSection from "@/Components/LandingPage/HeroSection";
import PricingSection from "@/Components/LandingPage/PricingSection";
import ThemeSection from "@/Components/LandingPage/ThemeSection";

export default function Home() {
  return (
    <div className="font-sans text-gray-800 antialiased bg-white">
      <Header />
      <main>
        <HeroSection />
        <Feature />
        <ThemeSection />
        <PricingSection />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
