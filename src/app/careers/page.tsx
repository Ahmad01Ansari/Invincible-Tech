import { 
  CareersHero, 
  FactoryCulture, 
  OpenRolesList, 
  HiringProtocol 
} from "@/components/sections/CareersComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join the Elite Squad at Invinsible Tech",
  description: "We are recruiting world-class architects and designers to build robust, high-performance digital assets. Explore our open protocols and join the factory.",
};

export default function CareersPage() {
  return (
    <main className="bg-obsidian min-h-screen">
      {/* 1. Engineering Brand Hero */}
      <CareersHero />

      {/* 2. Factory Ethos & Culture */}
      <FactoryCulture />

      {/* 3. Open Engineering Slots */}
      <OpenRolesList />

      {/* 4. The Recruitment Protocol */}
      <HiringProtocol />
    </main>
  );
}
