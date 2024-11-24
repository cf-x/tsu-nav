import Search from "./components/Search.tsx";
import Map from "./components/Map.tsx";
import { useRef, useState } from "react";
import { Building } from "./utils/data.tsx";
import Info from "./components/Info.tsx";

function App() {
  const mapRef = useRef(null);
  const [selected, select] = useState<Building | null>(null);
  const [pinned, pin] = useState<[number, number]>();
  return (
    <main>
      <Search mref={mapRef} select={select} />
      <Map
        mref={mapRef}
        select={select}
        selected={selected}
        pin={pin}
        pinned={pinned}
      />
      <Info
        mref={mapRef}
        select={select}
        selected={selected}
        pin={pin}
        pinned={pinned}
      />
    </main>
  );
}

export default App;
