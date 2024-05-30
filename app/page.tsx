"use client";

import Map from "@/components/Map";
import Search from "@/components/Search";
import { useState } from "react";

export default function Home() {
  const [map, setMap] = useState<mapboxgl.Map>();
  return (
    <main>
      <Map map={map} setMap={setMap} />
      <Search map={map} setMap={setMap} />
    </main>
  );
}
