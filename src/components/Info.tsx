import {
  FaBuilding,
  FaChevronDown,
  FaChevronUp,
  FaImage,
  FaRoute,
  FaX,
} from "react-icons/fa6";
import { Building, rooms } from "../utils/data";
import { MutableRefObject, useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import L from "leaflet";

export default function Info({
  selected,
  select,
  mref,
  pin,
  pinned,
  setRouteControl,
}: {
  selected: Building | null;
  select: React.Dispatch<React.SetStateAction<Building | null>>;
  mref: MutableRefObject<null>;
  pin: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
  pinned: [number, number] | undefined;
  setRouteControl: React.Dispatch<
    React.SetStateAction<L.Routing.Control | null>
  >;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [panel, setPanel] = useState<"info" | "gallery" | "search" | "route">(
    "info"
  );
  if (!selected) return null;

  return (
    <div className="z-50 absolute md:bottom-10 bottom-0 w-screen">
      <div className="flex justify-center">
        <div
          className={`bg-black ${
            open ? "md:h-64 h-64" : ""
          } md:w-[32rem] sm:w-96 w-screen  rounded-xl py-2 px-3 transition-all duration-150`}
        >
          <div className="flex justify-between gap-x-2">
            <div
              className="hover:bg-white/20 w-full cursor-pointer flex justify-center py-2"
              onClick={() => setOpen((p) => !p)}
            >
              {open ? <FaChevronDown size={16} /> : <FaChevronUp size={16} />}
            </div>
            <FaX
              size={16}
              className="cursor-pointer my-2"
              onClick={() => select(null)}
            />
          </div>
          {open && (
            <div>
              <div className="flex justify-between border-y border-white py-2">
                <div
                  className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md"
                  onClick={() => setPanel("info")}
                >
                  <FaInfoCircle size={20} className="cursor-pointer" />
                </div>
                <div
                  className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md"
                  onClick={() => setPanel("search")}
                >
                  <FaSearch
                    size={20}
                    className="cursor-pointer hover:text-white/80"
                  />
                </div>
                <div
                  className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md"
                  onClick={() => setPanel("gallery")}
                >
                  <FaImage
                    size={20}
                    className="cursor-pointer hover:text-white/80"
                  />
                </div>
                <div
                  className="flex justify-center w-full hover:bg-white/20 py-1 cursor-pointer rounded-md"
                  onClick={() => setPanel("route")}
                >
                  <FaRoute
                    size={20}
                    className="cursor-pointer hover:text-white/80"
                  />
                </div>
              </div>
              {panel === "info" ? (
                <InfoPanel building={selected} />
              ) : panel === "search" ? (
                <SearchPanel building={selected} />
              ) : panel === "gallery" ? (
                <GalleryPanel building={selected} />
              ) : (
                <RoutePanel
                  mref={mref}
                  building={selected}
                  pin={pin}
                  pinned={pinned}
                  setRouteControl={setRouteControl}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoPanel = ({ building }: { building: Building }) => {
  return (
    <div>
      <div className="my-1 mx-2 text-lg font-semibold">{building.name}</div>
      {!building.info && building.description}
      {building.info}
    </div>
  );
};

const SearchPanel = ({ building }: { building: Building }) => {
  const [input, setInput] = useState<string>("");
  return (
    <div>
      <div className="flex justify-center mt-2">
        <input
          type="text"
          placeholder="search rooms..."
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-white focus:outline-none px-2 py-1 border-b border-white"
        />
      </div>
      <div className="h-32 overflow-y-auto">
        {rooms
          .filter((room) => {
            const searchInput = input.trim().toLowerCase();
            return (
              room.building === building.id &&
              (searchInput.length === 0 ||
                room.name.toLowerCase().includes(searchInput) ||
                room.description.toLowerCase().includes(searchInput))
            );
          })
          .map((room) => {
            return (
              <div
                key={`room-${room.id}`}
                className="w-full p-2 border-b hover:bg-white/20 cursor-pointer flex justify-between"
              >
                <div>
                  {room.name} - {room.description}
                </div>
                <div className="flex">
                  <span className="hidden md:block">სართული</span> {room.floor}{" "}
                  <FaBuilding size={20} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const GalleryPanel = ({ building }: { building: Building }) => {
  return <div>{!building.images && "No images found"}</div>;
};

const RoutePanel = ({
  building,
  mref,
  pin,
  pinned,
  setRouteControl,
}: {
  building: Building;
  mref: MutableRefObject<null>;
  pin: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
  pinned: [number, number] | undefined;
  setRouteControl: React.Dispatch<
    React.SetStateAction<L.Routing.Control | null>
  >;
}) => {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-y-2">
        Find the route from:
        {pinned && (
          <div className="flex justify-between">
            <div className="cursor-pointer underline" onClick={() => {}}>
              Calculate the Route
            </div>
            <div
              className="cursor-pointer underline"
              onClick={() => {
                pin(undefined);
                setRouteControl(null);
              }}
            >
              Reset the Location
            </div>
          </div>
        )}
        <div
          className="p-1 border hover:bg-white/20 cursor-pointer rounded-md"
          onClick={() => {
            pin(building.coordinates);
            // @ts-expect-error false
            mref.current!.flyTo(building.coordinates);
          }}
        >
          {pinned ? "Reset" : "Choose on the Map"}
        </div>
        <div className="p-1 border cursor-pointer rounded-md select-none">
          Choose the building
        </div>
      </div>
    </div>
  );
};
