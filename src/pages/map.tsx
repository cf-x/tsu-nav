/* eslint-disable react-refresh/only-export-components */
import Search from "../components/Search.tsx";
import Map from "../components/Map.tsx";
import { useRef, useState } from "react";
import { Building } from "../data/buildings.tsx";
import Info from "../components/Info.tsx";
import L from "leaflet";
import { FaLocationPin, FaLocationPinLock } from "react-icons/fa6";
import { atom } from "jotai";

export const selectAtom = atom<Building | null>(null);
export const pinAtom = atom<[number, number]>();
export const routeControlAtom = atom<[L.Routing.Control]>();

function App() {
  const mapRef = useRef(null);
  const [isLocation, setLocation] = useState<boolean>(false);
  const [useLocation, setUserLocation] = useState<{ x: number; y: number }>();

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
      <Map
        mref={mapRef}
        user={useLocation}
      />
      <Info
        mref={mapRef}
        user={useLocation}
      />
    </>
  );
}

export default App;
