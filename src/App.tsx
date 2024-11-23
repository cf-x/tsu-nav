import Search from "./components/Search.tsx";
import Map from "./components/Map.tsx";
import { useRef } from "react";

function App() {
  const mapRef = useRef(null);
  return (
    <main>
        <Search ref={mapRef} />
        <Map ref={mapRef} />
    </main>
  );
}

export default App
