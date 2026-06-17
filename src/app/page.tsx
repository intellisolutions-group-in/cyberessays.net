"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import LogoWall from "@/components/home/LogoWall";
import SolutionsMap from "@/components/home/SolutionsMap";
import IndustryBento from "@/components/home/IndustryBento";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SuccessStories from "@/components/home/SuccessStories";
import TechEcosystem from "@/components/home/TechEcosystem";
import DevFramework from "@/components/home/DevFramework";
import InsightsGrid from "@/components/home/InsightsGrid";
import PremiumCTA from "@/components/home/PremiumCTA";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger dark background transition once scrolled down 25% of viewport
      if (window.scrollY > window.innerHeight * 0.25) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeroSection />
      <div className={`theme-transition-wrapper ${isDark ? "darkTheme" : ""}`}>
        <LogoWall />
        <SolutionsMap />
        <IndustryBento />
        <WhyChooseUs />
        <SuccessStories />
        <TechEcosystem />
        <DevFramework />
        <InsightsGrid />
        <PremiumCTA />
      </div>
    </>
  );
}
