import Search from "../components/Search.tsx";
import Map from "../components/Map.tsx";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { FaLocationPin, FaLocationPinLock } from "react-icons/fa6";
import { useAtom } from "jotai";
import Panel from "../components/Panel/index.tsx";
import { mapRefAtom, userLocationAtom } from "../utils/atoms.ts";

function App() {
  const mapRef = useRef<L.Map | null>(null);
  const [, setMapRef] = useAtom(mapRefAtom);
  const [isLocation, setLocation] = useState<boolean>(false);
  const [, setUserLocation] = useAtom(userLocationAtom);

  useEffect(() => {
    setMapRef(mapRef);
  }, [mapRef, setMapRef]);

  const navigate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(true);
          setUserLocation({
            x: position.coords.latitude,
            y: position.coords.longitude,
          });
        },
        (error) => {
          console.error("location error:", error.message);
          if (error.code === error.PERMISSION_DENIED) {
            setLocation(false);
          }
        }
      );
    } else {
      setLocation(false);
    }
  };

  return (
    <>
      <nav className="h-16 py-2 flex justify-between w-full p-3 items-center gap-x-4">
        <div className="flex items-center gap-x-4">
          <a href="/">
            <img src="/tsu.svg" alt="tsu logo" className="w-12" />
          </a>
          <Search />
        </div>
        <div
          onClick={navigate}
          className={`flex items-center gap-x-2 cursor-pointer ${
            isLocation ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="hidden md:block select-none">ლოკაცია</span>{" "}
          {isLocation ? (
            <FaLocationPin size={20} />
          ) : (
            <FaLocationPinLock size={20} />
          )}
        </div>
      </nav>
      <Map />
      <Panel />
    </>
  );
}

export default App;
