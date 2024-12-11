import Search from "../components/Search.tsx";
import Map from "../components/Map.tsx";
import { useRef, useState } from "react";
import { Building } from "../data/buildings.tsx";
import Info from "../components/Info.tsx";
import L from "leaflet";

function App() {
  const mapRef = useRef(null);
  const [selected, select] = useState<Building | null>(null);
  const [pinned, pin] = useState<[number, number]>();
  const [routeControl, setRouteControl] = useState<L.Routing.Control | null>(
    null
  );

  return (
    <>
      <nav className="h-16 py-2 flex justify-start w-full p-3 items-center gap-x-4">
        <a href="/">
          <img src="/tsu.svg" alt="tsu logo" className="w-12" />
        </a>
        <Search />
      </nav>
      <Map
        mref={mapRef}
        select={select}
        selected={selected}
        pin={pin}
        pinned={pinned}
        routeControl={routeControl}
        setRouteControl={setRouteControl}
      />
      <Info
        mref={mapRef}
        select={select}
        selected={selected}
        pin={pin}
        pinned={pinned}
        setRouteControl={setRouteControl}
      />
    </>
  );
}

export default App;
