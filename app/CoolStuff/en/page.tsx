import React from "react";
import Gallery from "@/components/gallery";
import CoolStuff from '@/components/coolstuff';

export default function Home() {
  return (
    <div className="my-24 w-full">
      <CoolStuff />
      <h3 className="h2 text-center"> Books </h3>
      {/* <Gallery /> */}
      
    </div>
  );
}