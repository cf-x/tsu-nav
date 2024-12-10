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
    <main>
      <Search mref={mapRef} select={select} />
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
    </main>
  );
}

export default App;
