import React from "react";
import Gallery from "@/components/gallery";
import CoolStuff from '@/components/coolstuff';

export default function Home() {
  const locale = 'fr'
  return (
    <div className="my-24 w-full">
      <CoolStuff locale={locale} />
      <h3 className="h2 text-center"> Livres </h3>
      {/* <Gallery /> */}
      
    </div>
  );
}
