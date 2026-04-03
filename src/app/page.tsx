"use client"
import CTA from "@/Components/LandingPage/CTA";
import Feature from "@/Components/LandingPage/Feature";
import Footer from "@/Components/LandingPage/Footer";
import Header from "@/Components/LandingPage/Header";
import HeroSection from "@/Components/LandingPage/HeroSection";
import PricingSection from "@/Components/LandingPage/PricingSection";
import ThemeSection from "@/Components/LandingPage/ThemeSection";
import { getToken, getUserInfo } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemePage from "./theme/page";

export default function Home() {
  const token = getToken();
  const user = getUserInfo();
  const router = useRouter();
  const [detailTheme, setDetailTheme] = useState<boolean>(false);
  useEffect(() => {
    if (token && user) {
      router?.push('/admin/dashboard')
    }
  })
  return (
    <div className="font-sans text-gray-800 antialiased bg-white">
      <Header />
      <main>
        <HeroSection />
        <Feature />
        {
          detailTheme ?
            <ThemePage setDetailTheme={setDetailTheme} /> :
            <ThemeSection setDetailTheme={setDetailTheme} />
        }
        <PricingSection />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
